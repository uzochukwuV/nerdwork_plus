import { Router } from "express";
import { getUserProfile, updateUserProfile, createUserProfile } from "../controller/user.js";
import { 
  becomeCreator, 
  updateCreatorProfile, 
  getCreatorProfile, 
  browseCreators, 
  checkCreatorStatus 
} from "../controller/creator.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// User profile routes
router.get("/me", authenticate, getUserProfile);
router.put("/me", authenticate, updateUserProfile);
router.post("/profile", authenticate, createUserProfile);

// Creator routes
router.post("/creator/become", authenticate, becomeCreator);
router.put("/creator/profile", authenticate, updateCreatorProfile);
router.get("/creator/status", authenticate, checkCreatorStatus);
router.get("/creator/:id", getCreatorProfile); // Public route
router.get("/creators", browseCreators); // Public route

export default router;