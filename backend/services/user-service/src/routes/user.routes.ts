import { Router } from "express";
import { getUserProfile, updateUserProfile, createUserProfile } from "../controller/user.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/me", authenticate, getUserProfile);
router.put("/me", authenticate, updateUserProfile);
router.post("/profile", authenticate, createUserProfile);

export default router;