import dotenv from "dotenv"

dotenv.config({path: "./.env"});

export const MONGO_DB_URI = process.env.mongodb_connection_string!;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = (process.env.JWT_SECRET || "supersecretkey").trim();
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");
export const LLM_API_URL=process.env.LLM_API_URL;
export const LLM_API_KEY=process.env.LLM_API_KEY