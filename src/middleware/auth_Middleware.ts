import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export interface AuthRequest extends Request {
  user?: { username: string };
}

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction):void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
     res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token!, JWT_SECRET) as unknown as JwtPayload;
        if (decoded.username) {
      req.user = { username: decoded.username };
      next();
    } else {
      res.status(403).json({ error: "Invalid token" });
    }
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
