import { Router } from "express";
import { extractResumeData, searchResume } from "../controllers/resume_controller";
import { authenticateToken } from "../middleware/auth_Middleware";

const router = Router();

router
.post("/extract",authenticateToken, extractResumeData)
.post("/search-resume",authenticateToken, searchResume);

export default router;
