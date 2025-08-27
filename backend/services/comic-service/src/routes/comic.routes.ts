import { Router } from "express";
import { 
  getComics, 
  getComic, 
  getComicPages, 
  updateReadingProgress, 
  getReadingHistory,
  addComicReview 
} from "../controller/comic.js";
import { authenticate, optionalAuth } from "../middleware/auth.js";

const router = Router();

// Public routes (no auth required)
router.get("/", getComics);
router.get("/:id", optionalAuth, getComic);

// Protected routes (auth required)
router.get("/:id/pages", optionalAuth, getComicPages);
router.post("/:id/progress", authenticate, updateReadingProgress);
router.get("/user/history", authenticate, getReadingHistory);
router.post("/:id/review", authenticate, addComicReview);

export default router;