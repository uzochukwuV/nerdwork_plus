import express from "express";
import { authenticate } from "../middleware/common/auth";
import { purchaseTicket } from "../controller/ticket";

const router = express.Router();

router.post("/tickets", authenticate, purchaseTicket);

export default router;
