import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export interface AuthRequest extends Request {
  user?: { username: string };
}

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized, no token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as unknown as JwtPayload;

    if (!decoded.username) {
       res.status(403).json({ error: "Invalid token payload" });
      return;
    }

    req.user = { username: decoded.username };
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(403).json({ error: "Invalid or expired token" });
    return;
  }
};
