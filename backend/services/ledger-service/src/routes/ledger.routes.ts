import { Router } from "express";
import { 
  createTransaction,
  getAccountBalance,
  getAccounts,
  getTransactionHistory,
  getTrialBalance,
  getAuditTrail
} from "../controller/ledger.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Transaction routes (require authentication)
router.post("/transactions", authenticate, createTransaction);
router.get("/transactions", authenticate, getTransactionHistory);

// Account routes
router.get("/accounts", authenticate, getAccounts);
router.get("/accounts/:accountId/balance", authenticate, getAccountBalance);

// Reporting routes
router.get("/reports/trial-balance", authenticate, getTrialBalance);
router.get("/audit-trail", authenticate, getAuditTrail);

export default router;