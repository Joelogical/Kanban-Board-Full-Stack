import { Router } from "express";
import { login } from "../controllers/auth-controller";

const router = Router();

// POST /auth/login - Login a user
router.post("/login", login);

export default router;
