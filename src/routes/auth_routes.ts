import { Router } from "express";
import { loginUser, testProtectedRoute } from "../controllers/auth_controller";
import { authenticateToken } from "../middleware/auth_Middleware";

const router = Router();

router
.post('/login',loginUser)
.get('/test',authenticateToken,testProtectedRoute);


export default router;