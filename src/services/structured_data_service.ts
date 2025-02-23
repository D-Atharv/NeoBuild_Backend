import { generateStructuredData } from "./llm_service";
import { sanitizeApplicantData } from "../utils/validation_utils";

export const processResumeData = async (resumeText: string) => {
  const structuredDataString = await generateStructuredData(resumeText);

  if (!structuredDataString) {
    throw new Error("Failed to generate structured data.");
  }

  let parsedData;
  try {
    parsedData = JSON.parse(structuredDataString);
  } catch (err: any) {
    throw new Error(`Structured data is not valid JSON: ${err.message}`);
  }

  return sanitizeApplicantData(parsedData);
};
