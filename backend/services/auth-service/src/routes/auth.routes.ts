import { Router } from "express";
import { signup, login, getCurrentUser } from "../controller/auth.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);

export default router;