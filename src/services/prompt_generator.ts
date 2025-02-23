export const createExtractionPrompt = (resumeText: string): string => {
    const instructions = `
  Extract structured data from the following resume:
  - If any field is missing, use "Not provided".
  - If there are multiple education or experience entries, select only the most recent one.
  - Ensure all fields are included in the JSON, even if data is missing.
    `;
  
    const outputFormat = `
  Output JSON format:
  {
    "name": "<Candidate Name or 'Not provided'>",
    "email": "<email@example.com or 'Not provided'>",
    "education": {
      "degree": "<Degree Name or 'Not provided'>",
      "branch": "<Branch Name or 'Not provided'>",
      "institution": "<Institution Name or 'Not provided'>",
      "year": "<Graduation Year or 'Not provided'>"
    },
    "experience": {
      "job_title": "<Job Title or 'Not provided'>",
      "company": "<Company Name or 'Not provided'>",
      "start_date": "<YYYY-MM or 'Not provided'>",
      "end_date": "<YYYY-MM or 'Not provided'>"
    },
    "skills": ["<skill1>", "<skill2>", "<skill3>"],
    "summary": "<Short summary or 'No summary provided' if missing>"
  }
  `;
  
    return `${instructions}\n${outputFormat}\nResume:\n${resumeText}`;
  };
  