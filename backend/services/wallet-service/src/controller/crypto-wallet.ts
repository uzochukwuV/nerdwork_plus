import { eq, and } from "drizzle-orm";
import { db } from "../config/db.js";
import { wallets, transactions, nwtPricing } from "../model/wallet.js";
import HelioService, { type CreatePaymentLinkRequest } from '../services/helio.service.js';

// Initialize Helio service
const helioService = new HelioService({
  apiKey: process.env.HELIO_API_KEY || '',
  baseUrl: process.env.HELIO_BASE_URL || 'https://api.hel.io',
  cluster: process.env.HELIO_CLUSTER as 'devnet' | 'mainnet' || 'devnet',
});

// Connect crypto wallet
export const connectCryptoWallet = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { walletAddress, walletType, signature } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    if (!walletAddress || !walletType) {
      return res.status(400).json({
        success: false,
        error: "Wallet address and type are required",
        timestamp: new Date().toISOString()
      });
    }

    // TODO: Verify wallet signature here for security
    // For MVP, we'll trust the frontend verification

    // Get or create wallet
    let [wallet] = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId));

    if (!wallet) {
      [wallet] = await db
        .insert(wallets)
        .values({ userId })
        .returning();
    }

    // Update wallet with crypto wallet info
    [wallet] = await db
      .update(wallets)
      .set({
        connectedWalletAddress: walletAddress,
        walletType,
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id))
      .returning();

    return res.status(200).json({
      success: true,
      data: {
        walletId: wallet.id,
        connectedWalletAddress: wallet.connectedWalletAddress,
        walletType: wallet.walletType,
      },
      message: "Crypto wallet connected successfully"
    });
  } catch (error: any) {
    console.error("Connect crypto wallet error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Purchase NWT tokens with crypto via Helio
export const purchaseNwtWithCrypto = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { packageId, currency = 'USDC', redirectUrl } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Get pricing package
    const [pricingPackage] = await db
      .select()
      .from(nwtPricing)
      .where(and(eq(nwtPricing.id, packageId), eq(nwtPricing.isActive, true)));

    if (!pricingPackage) {
      return res.status(404).json({
        success: false,
        error: "Pricing package not found",
        timestamp: new Date().toISOString()
      });
    }

    // Get or create wallet
    let [wallet] = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId));

    if (!wallet) {
      [wallet] = await db
        .insert(wallets)
        .values({ userId })
        .returning();
    }

    // Create pending transaction
    const [transaction] = await db
      .insert(transactions)
      .values({
        userId,
        walletId: wallet.id,
        type: 'purchase',
        amount: pricingPackage.nwtAmount,
        description: `Purchase ${pricingPackage.nwtAmount} NWT tokens (${pricingPackage.packageName}) with ${currency}`,
        status: 'pending',
        paymentMethod: 'helio_crypto',
        metadata: {
          packageId,
          currency,
          usdPrice: pricingPackage.usdPrice,
          bonusPercentage: pricingPackage.bonusPercentage,
          paymentProvider: 'helio'
        }
      })
      .returning();

    // Create Helio payment link
    const paymentLinkRequest: CreatePaymentLinkRequest = {
      productName: `${pricingPackage.packageName} NWT Package`,
      productDescription: `${pricingPackage.nwtAmount} NWT tokens for Nerdwork+ platform`,
      price: parseFloat(pricingPackage.usdPrice),
      currency: currency as 'USDC' | 'SOL',
      receiverWallet: process.env.HELIO_RECEIVER_WALLET || '',
      redirectUrl,
      metadata: {
        transactionId: transaction.id,
        userId,
        packageId,
        nwtAmount: pricingPackage.nwtAmount,
      }
    };

    const helioPayment = await helioService.createPaymentLink(paymentLinkRequest);

    // Update transaction with Helio payment ID
    await db
      .update(transactions)
      .set({
        externalTransactionId: helioPayment.id,
        updatedAt: new Date(),
      })
      .where(eq(transactions.id, transaction.id));

    return res.status(200).json({
      success: true,
      data: {
        transaction,
        paymentLink: {
          url: helioPayment.url,
          qrCode: helioPayment.qrCode,
          id: helioPayment.id,
          status: helioPayment.status,
        }
      },
      message: "Crypto payment link created successfully"
    });
  } catch (error: any) {
    console.error("Purchase NWT with crypto error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Handle Helio webhook for payment confirmation
export const handleHelioWebhook = async (req: any, res: any) => {
  try {
    const webhookSignature = req.headers['helio-signature'];
    const webhookPayload = req.body;

    // Process webhook
    const paymentStatus = await helioService.processWebhook(webhookPayload, webhookSignature);

    if (paymentStatus.status === 'completed') {
      // Find the transaction by external transaction ID
      const [transaction] = await db
        .select()
        .from(transactions)
        .where(eq(transactions.externalTransactionId, paymentStatus.id));

      if (transaction && transaction.status === 'pending') {
        // Get wallet and update balance
        const [wallet] = await db
          .select()
          .from(wallets)
          .where(eq(wallets.id, transaction.walletId));

        if (wallet) {
          const newBalance = (parseFloat(wallet.nwtBalance) + parseFloat(transaction.amount)).toFixed(8);
          const newTotalEarned = (parseFloat(wallet.totalEarned) + parseFloat(transaction.amount)).toFixed(8);

          // Update wallet balance
          await db
            .update(wallets)
            .set({
              nwtBalance: newBalance,
              totalEarned: newTotalEarned,
              updatedAt: new Date(),
            })
            .where(eq(wallets.id, wallet.id));

          // Update transaction status
          await db
            .update(transactions)
            .set({
              status: 'completed',
              updatedAt: new Date(),
              metadata: {
                ...transaction.metadata as any,
                transactionHash: paymentStatus.transactionHash,
                paidAt: paymentStatus.paidAt,
                confirmedAmount: paymentStatus.amount,
                confirmedCurrency: paymentStatus.currency,
              }
            })
            .where(eq(transactions.id, transaction.id));
        }
      }
    } else if (paymentStatus.status === 'failed' || paymentStatus.status === 'cancelled') {
      // Update transaction status to failed/cancelled
      await db
        .update(transactions)
        .set({
          status: paymentStatus.status,
          updatedAt: new Date(),
        })
        .where(eq(transactions.externalTransactionId, paymentStatus.id));
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully"
    });
  } catch (error: any) {
    console.error("Handle Helio webhook error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Check crypto payment status
export const checkCryptoPaymentStatus = async (req: any, res: any) => {
  try {
    const { paymentId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Check payment status with Helio
    const paymentStatus = await helioService.checkPaymentStatus(paymentId);

    // Find associated transaction
    const [transaction] = await db
      .select()
      .from(transactions)
      .where(and(
        eq(transactions.externalTransactionId, paymentId),
        eq(transactions.userId, userId)
      ));

    return res.status(200).json({
      success: true,
      data: {
        paymentStatus,
        transaction
      },
      message: "Payment status retrieved successfully"
    });
  } catch (error: any) {
    console.error("Check crypto payment status error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};