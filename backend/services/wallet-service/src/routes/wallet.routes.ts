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
import {
  connectCryptoWallet,
  purchaseNwtWithCrypto,
  handleHelioWebhook,
  checkCryptoPaymentStatus
} from "../controller/crypto-wallet.js";
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

// Crypto wallet routes
router.post("/crypto/connect", authenticate, connectCryptoWallet);
router.post("/crypto/purchase", authenticate, purchaseNwtWithCrypto);
router.get("/crypto/payment/:paymentId/status", authenticate, checkCryptoPaymentStatus);

// Webhook routes (no auth required)
router.post("/webhooks/helio", handleHelioWebhook);

export default router;