import { Request, Response } from "express";
import { extractTextFromPDF } from "../services/pdf_service";
import { processResumeData } from "../services/structured_data_service";
import Applicant from "../models/applicant";

export const extractResumeData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: "Missing PDF URL" });
      return;
    }

    const resumeText = await extractTextFromPDF(url);
    const applicantData = await processResumeData(resumeText);

    const applicant = new Applicant(applicantData);
    await applicant.save();

    res.status(200).json({ message: "Resume processed successfully", applicant });

  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};



export const searchResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ error: "Missing name in request body" });
      return;
    }

    const regex = new RegExp(username, "i");
    const applicants = await Applicant.find({ name: { $regex: regex } });

    if (!applicants || applicants.length === 0) {
      res.status(404).json({ error: "No matching resume found" });
      return;
    }

    res.status(200).json({ data: applicants });
  } catch (error) {
    console.error("Error searching resumes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};