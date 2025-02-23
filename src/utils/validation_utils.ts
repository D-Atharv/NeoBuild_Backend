import { defaultApplicantData } from "./default_data";

export const sanitizeApplicantData = (data: any) => {
  const sanitizedData = { ...defaultApplicantData, ...data };

  if (Array.isArray(sanitizedData.education)) {
    sanitizedData.education = sanitizedData.education[0] || defaultApplicantData.education;
  }

  if (Array.isArray(sanitizedData.experience)) {
    sanitizedData.experience = sanitizedData.experience[0] || defaultApplicantData.experience;
  }

  ["name", "email", "summary"].forEach((field) => {
    if (!sanitizedData[field] || sanitizedData[field].trim() === "") {
      sanitizedData[field] = defaultApplicantData[field as keyof typeof defaultApplicantData];
    }
  });

  return sanitizedData;
};
