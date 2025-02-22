import { Router } from "express";
import { loginUser, testProtectedRoute } from "../controllers/auth_controller";

const router = Router();

router
.post('/login',loginUser)
.get('/test',testProtectedRoute);


export default router;