import { LLM_API_URL, LLM_API_KEY } from "../config/dotenv";

export const generateStructuredData = async (resumeText: string): Promise<string> => {
  const prompt = `Extract structured data from the following resume. 
If there are multiple education or experience entries, select only the most recent one.
Output only the following JSON format (do not include any extra text):

{
  "name": "<Candidate Name>",
  "email": "<email@example.com>",
  "education": {
    "degree": "<Degree Name>",
    "branch": "<Branch Name>",
    "institution": "<Institution Name>",
    "year": "<Graduation Year>"
  },
  "experience": {
    "job_title": "<Job Title>",
    "company": "<Company Name>",
    "start_date": "<YYYY-MM>",
    "end_date": "<YYYY-MM>"
  },
  "skills": ["<skill1>", "<skill2>", "<skill3>"],
  "summary": "<Short summary about the candidate>"
}

Resume:
${resumeText}
`;

  try {
    const response = await fetch(`${LLM_API_URL}?key=${LLM_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Gemini API Error: ${JSON.stringify(errorResponse)}`);
    }

    const data = await response.json();
    console.log("Full Gemini API response:", JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates.length) {
      throw new Error("Gemini API returned no candidates");
    }
    const candidateContent = data.candidates[0]?.content;
    if (!candidateContent || !candidateContent.parts || !candidateContent.parts.length) {
      throw new Error("Gemini API candidate output is missing");
    }
    const candidateOutput = candidateContent.parts[0].text;
    if (!candidateOutput) {
      throw new Error("Gemini API candidate output text is missing");
    }
    return candidateOutput;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process resume data");
  }
};
