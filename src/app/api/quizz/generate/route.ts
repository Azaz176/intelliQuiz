import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

// Ensure the API key is stored securely
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    // Retrieve form data and the PDF document
    const body = await req.formData();
    const document = body.get("pdf");

    if (!document) {
      return NextResponse.json(
        { error: "No document uploaded" },
        { status: 400 }
      );
    }

    console.log("Document received:", document);

    // Load and parse the PDF document
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: " ",
    });

    const docs = await pdfLoader.load();
    const selectedDocuments = docs.filter(
      (doc) => doc.pageContent !== undefined
    );
    const texts = selectedDocuments.map((doc) => doc.pageContent).join(" ");

    console.log("Extracted text:", texts); // Log the extracted text

    // Ensure text is extracted
    if (!texts) {
      return NextResponse.json(
        { error: "Failed to extract text from PDF" },
        { status: 500 }
      );
    }

    // Define the prompt for the AI
    const prompt = `Given the text which is a summary of the document, generate a quiz based on the text. Return JSON only that contains a quiz object with fields: name, description, and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.\n\nText: ${texts}`;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI Key is not provided" },
        { status: 500 }
      );
    }

    // Initialize the generative AI model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Start a chat session with the AI model
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Send the prompt to the AI model and get the response
    const result = await chatSession.sendMessage(prompt);

    const generatedResponse = await result.response.text();
    console.log("Generated response:", generatedResponse); // Log the generated response

    // Return the generated quiz as a JSON response
    return NextResponse.json(
      { message: "created successfully", quiz: generatedResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
