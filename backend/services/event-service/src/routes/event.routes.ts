import { Router } from "express";
import { 
  getEvents, 
  getEvent, 
  bookTickets, 
  getUserBookings,
  getEventCategories,
  addEventReview 
} from "../controller/event.js";
import { authenticate, optionalAuth } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", getEvents);
router.get("/categories", getEventCategories);
router.get("/:id", optionalAuth, getEvent);

// Protected routes (auth required)
router.post("/:id/book", authenticate, bookTickets);
router.get("/user/bookings", authenticate, getUserBookings);
router.post("/:id/review", authenticate, addEventReview);

export default router;