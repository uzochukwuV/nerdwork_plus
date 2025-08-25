import { Router } from "express";
import { authenticate } from "../middleware/common/auth";
import {
  debitWalletController,
  getWalletBalance,
} from "../controller/wallet.controller";

const router = Router();

router.get("/wallet/balance", authenticate, getWalletBalance);
router.post("/debit", authenticate, debitWalletController);

export default router;
