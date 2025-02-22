import {  Request, Response } from "express";
import { generateToken } from "../config/jwt";

const HARD_CODED_USER = {
  username: "naval.ravikant",
  password: "05111974",
};

interface AuthRequest extends Request {
  user?: { username: string };
}

export const loginUser = (req: Request, res: Response) :void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  if (username !== HARD_CODED_USER.username) {
    res.status(401).json({ error: "Invalid username" });
    return;
  }
  if (password !== HARD_CODED_USER.password) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = generateToken(username);

  res.status(200).json({ JWT: token });
};

export const testProtectedRoute = (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: `Hello, ${req.user?.username}! You are authorized.` });
  return;
};
