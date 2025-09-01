import { Router } from "express";
import { 
  getComics, 
  getComic, 
  getComicPages, 
  updateReadingProgress, 
  getReadingHistory,
  addComicReview 
} from "../controller/comic.js";
import {
  createComic,
  updateComic,
  getCreatorComics,
  addComicPages,
  getComicPages as getCreatorComicPages,
  deleteComic,
  getCreatorStats
} from "../controller/creator-comic.js";
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

// Creator routes (auth required)
router.post("/creator", authenticate, createComic);
router.get("/creator/my-comics", authenticate, getCreatorComics);
router.get("/creator/stats", authenticate, getCreatorStats);
router.put("/creator/:id", authenticate, updateComic);
router.delete("/creator/:id", authenticate, deleteComic);
router.post("/creator/:id/pages", authenticate, addComicPages);
router.get("/creator/:id/pages", authenticate, getCreatorComicPages);

export default router;