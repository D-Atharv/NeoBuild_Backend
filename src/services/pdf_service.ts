import pdf from "pdf-parse";

export const extractTextFromPDF = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch PDF from URL.");
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/pdf")) {
    throw new Error("Invalid file type. Only PDFs are supported.");
  }

  const arrayBuffer = await response.arrayBuffer();
  const pdfData = await pdf(Buffer.from(arrayBuffer));

  if (!pdfData.text?.trim()) {
    throw new Error("No text found in the uploaded PDF.");
  }

  return pdfData.text;
};
