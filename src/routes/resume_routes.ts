import { Router } from "express";
import { extractResumeData } from "../controllers/resume_controller";
import { authenticateToken } from "../middleware/auth_Middleware";

const router = Router();

router.post("/extract", extractResumeData);

export default router;
