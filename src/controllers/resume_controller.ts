import { Request, Response } from "express";
import pdf from "pdf-parse";
import { generateStructuredData } from "../services/llm_service";
import Applicant from "../models/applicant";

export const extractResumeData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "Missing PDF URL" });
      return;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.json();
      res.status(400).json({ error: errorBody.error || "Unable to fetch PDF from URL" });
      return;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/pdf")) {
      res.status(400).json({ error: "Invalid file type. Only PDFs are supported" });
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const pdfData = await pdf(pdfBuffer);
    if (!pdfData.text || pdfData.text.trim() === "") {
      res.status(500).json({ error: "No text found in PDF" });
      return;
    }

    const structuredDataString = await generateStructuredData(pdfData.text);
    if (!structuredDataString) {
      res.status(500).json({ error: "Failed to generate structured data from resume" });
      return;
    }

    let structuredData;
    try {
      structuredData = JSON.parse(structuredDataString);
      if (Array.isArray(structuredData.education)) {
        structuredData.education = structuredData.education[0];
      }
      if (Array.isArray(structuredData.experience)) {
        structuredData.experience = structuredData.experience[0];
      }
    } catch (err) {
      res.status(500).json({ error: "Structured data is not valid JSON" });
      return;
    }

    const applicant = new Applicant(structuredData);
    await applicant.save();

    res.status(200).json({ message: "Resume processed successfully", applicant });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
