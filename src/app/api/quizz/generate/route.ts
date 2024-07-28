import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const document = body.get("pdf");

  if (!document) {
    return NextResponse.json(
      { error: "No document uploaded" },
      { status: 400 }
    );
  }

  try {
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: " ",
    });

    const docs = await pdfLoader.load();
    const selectedDocuments = docs.filter(
      (doc) => doc.pageContent !== undefined
    );
    const texts = selectedDocuments.map((doc) => doc.pageContent).join(" ");

    const prompt = `Given the text which is a summary of the document, generate a quiz based on the text. Return JSON only that contains a quiz object with fields: name, description, and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.`;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API Key is not provided" },
        { status: 500 }
      );
    }

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
    });

    const message = new HumanMessage({
      content: prompt + "\n" + texts,
    });

    const result = await model.invoke([message]);
    const response = result.choices[0].message.content; // Assuming the model returns choices with messages

    return NextResponse.json(
      { quiz: JSON.parse(response) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    if (error.response && error.response.status === 429) {
      return NextResponse.json(
        { message: "Quota exceeded. Please check your OpenAI plan and billing details." },
        { status: 429 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
