import jwt from "jsonwebtoken";
import { JWT_SECRET} from "./dotenv";

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn:  "1hr" });
};