import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY } from "./dotenv";

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn:  parseInt(JWT_EXPIRY) });
};
