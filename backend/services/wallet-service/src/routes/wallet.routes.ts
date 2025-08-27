import { Router } from "express";
import { 
  getWallet, 
  getTransactionHistory, 
  getNwtPricing,
  purchaseNwtTokens,
  spendNwtTokens,
  addPaymentMethod,
  getPaymentMethods
} from "../controller/wallet.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Wallet routes (all require authentication)
router.get("/", authenticate, getWallet);
router.get("/transactions", authenticate, getTransactionHistory);
router.get("/pricing", getNwtPricing); // Public route for pricing
router.post("/purchase", authenticate, purchaseNwtTokens);
router.post("/spend", authenticate, spendNwtTokens);

// Payment method routes
router.get("/payment-methods", authenticate, getPaymentMethods);
router.post("/payment-methods", authenticate, addPaymentMethod);

export default router;