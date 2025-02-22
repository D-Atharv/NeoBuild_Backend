import dotenv from "dotenv"

dotenv.config({path: "../.env"});

export const MONGO_DB_URI = process.env.mongodb_connection_string!;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");