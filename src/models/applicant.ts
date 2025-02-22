import mongoose, { Schema, Document } from "mongoose";

interface IEducation {
  degree: string;
  branch: string;
  institution: string;
  year: number;
}

interface IExperience {
  job_title: string;
  company: string;
  start_date: string;
  end_date: string;
}

interface IApplicant extends Document {
  name: string;
  email: string;
  education: IEducation;
  experience: IExperience;
  skills: string[];
  summary: string;
}

const ApplicantSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true },

  email: { 
    type: String, 
    required: true },

  education: {
    degree: String,
    branch: String,
    institution: String,
    year: Number,
  },
  
  experience: {
    job_title: String,
    company: String,
    start_date: String,
    end_date: String,
  },
  skills: [String],
  summary: { type: String, required: true },
});

export default mongoose.model<IApplicant>("Applicant", ApplicantSchema);
