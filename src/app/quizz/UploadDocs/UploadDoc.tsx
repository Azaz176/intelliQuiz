"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadDoc = () => {
  const [document, setDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError]= useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!document){
      setError("Please upload the document first")
      return 
    }
    setIsLoading(true);
   
    const formData= new FormData();
    formData.append("pdf", document as Blob)
    try {
      const res= await fetch("/api/quizz/generate", {
        method:"POST",
        body:formData
      })
      if(res.status===200){
        console.log("quiz generated successfully")
      }
    } catch (error) {
      console.log('error while generating', error)
    }
    // Add your submission logic here
    setIsLoading(false); 
  };

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <label
          htmlFor="document"
          className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative"
        >
          <div className="absolute inset-0 m-auto flex justify-center items-center">
            {document ? document.name : "Drag and drop a file"}
          </div>
          <input
            type="file"
            id="document"
            aria-label="Upload document"
            className="relative block w-full h-full z-50 opacity-0"
            onChange={(e) => setDocument(e.target.files?.[0] || null)}
          />
        </label>
        {error? <p className="text-red-500">{error}</p>:null}
        <Button size="lg" className="mt-2" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Generate Quiz"}
        </Button>
      </form>
    </div>
  );
};

export default UploadDoc;
