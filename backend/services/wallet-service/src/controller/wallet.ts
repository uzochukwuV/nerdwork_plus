import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import { wallets, transactions, paymentMethods, nwtPricing } from "../model/wallet.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Get user wallet
export const getWallet = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
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

    return res.status(200).json({
      success: true,
      data: wallet,
      message: "Wallet retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get wallet error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get transaction history
export const getTransactionHistory = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 20, type } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    let whereConditions = [eq(transactions.userId, userId)];
    if (type) {
      whereConditions.push(eq(transactions.type, type));
    }

    const transactionList = await db
      .select()
      .from(transactions)
      .where(and(...whereConditions))
      .orderBy(desc(transactions.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    const totalCount = await db
      .select({ count: sql`count(*)` })
      .from(transactions)
      .where(and(...whereConditions));

    return res.status(200).json({
      success: true,
      data: {
        transactions: transactionList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount[0].count,
          totalPages: Math.ceil(Number(totalCount[0].count) / parseInt(limit))
        }
      },
      message: "Transaction history retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get transaction history error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get NWT pricing packages
export const getNwtPricing = async (req: any, res: any) => {
  try {
    const pricingPackages = await db
      .select()
      .from(nwtPricing)
      .where(eq(nwtPricing.isActive, true))
      .orderBy(nwtPricing.displayOrder);

    return res.status(200).json({
      success: true,
      data: pricingPackages,
      message: "NWT pricing retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get NWT pricing error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Purchase NWT tokens
export const purchaseNwtTokens = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { packageId, paymentMethodId } = req.body;

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

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(pricingPackage.usdPrice) * 100), // Convert to cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      metadata: {
        userId,
        packageId,
        nwtAmount: pricingPackage.nwtAmount,
        type: 'nwt_purchase'
      },
    });

    // Create pending transaction
    const [transaction] = await db
      .insert(transactions)
      .values({
        userId,
        walletId: wallet.id,
        type: 'purchase',
        amount: pricingPackage.nwtAmount,
        description: `Purchased ${pricingPackage.nwtAmount} NWT tokens (${pricingPackage.packageName})`,
        status: 'pending',
        paymentMethod: 'stripe',
        externalTransactionId: paymentIntent.id,
        metadata: {
          packageId,
          usdPrice: pricingPackage.usdPrice,
          bonusPercentage: pricingPackage.bonusPercentage
        }
      })
      .returning();

    if (paymentIntent.status === 'succeeded') {
      // Update wallet balance
      const newBalance = (parseFloat(wallet.nwtBalance) + parseFloat(pricingPackage.nwtAmount)).toFixed(8);
      const newTotalEarned = (parseFloat(wallet.totalEarned) + parseFloat(pricingPackage.nwtAmount)).toFixed(8);

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
        })
        .where(eq(transactions.id, transaction.id));
    }

    return res.status(200).json({
      success: true,
      data: {
        transaction,
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          clientSecret: paymentIntent.client_secret,
        }
      },
      message: paymentIntent.status === 'succeeded' 
        ? "NWT tokens purchased successfully" 
        : "Payment processing"
    });
  } catch (error: any) {
    console.error("Purchase NWT tokens error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Spend NWT tokens
export const spendNwtTokens = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { amount, description, referenceId, referenceType } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    const spendAmount = parseFloat(amount);
    if (spendAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid amount",
        timestamp: new Date().toISOString()
      });
    }

    // Get wallet
    const [wallet] = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId));

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: "Wallet not found",
        timestamp: new Date().toISOString()
      });
    }

    const currentBalance = parseFloat(wallet.nwtBalance);
    if (currentBalance < spendAmount) {
      return res.status(400).json({
        success: false,
        error: "Insufficient NWT balance",
        timestamp: new Date().toISOString()
      });
    }

    // Start transaction
    const newBalance = (currentBalance - spendAmount).toFixed(8);
    const newTotalSpent = (parseFloat(wallet.totalSpent) + spendAmount).toFixed(8);

    // Update wallet balance
    await db
      .update(wallets)
      .set({
        nwtBalance: newBalance,
        totalSpent: newTotalSpent,
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id));

    // Create spend transaction
    const [transaction] = await db
      .insert(transactions)
      .values({
        userId,
        walletId: wallet.id,
        type: 'spend',
        amount: spendAmount.toFixed(8),
        description,
        referenceId,
        referenceType,
        status: 'completed',
      })
      .returning();

    return res.status(200).json({
      success: true,
      data: {
        transaction,
        newBalance,
        spentAmount: spendAmount
      },
      message: "NWT tokens spent successfully"
    });
  } catch (error: any) {
    console.error("Spend NWT tokens error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Add payment method
export const addPaymentMethod = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { paymentMethodId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Retrieve payment method from Stripe
    const stripePaymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    if (!stripePaymentMethod) {
      return res.status(400).json({
        success: false,
        error: "Invalid payment method",
        timestamp: new Date().toISOString()
      });
    }

    // Create or get Stripe customer
    let customer;
    const existingCustomer = await stripe.customers.search({
      query: `metadata['userId']:'${userId}'`,
    });

    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create({
        metadata: { userId }
      });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Save payment method to database
    const [savedPaymentMethod] = await db
      .insert(paymentMethods)
      .values({
        userId,
        type: stripePaymentMethod.type,
        provider: 'stripe',
        externalId: paymentMethodId,
        last4: stripePaymentMethod.card?.last4 || null,
        brand: stripePaymentMethod.card?.brand || null,
        expiryMonth: stripePaymentMethod.card?.exp_month || null,
        expiryYear: stripePaymentMethod.card?.exp_year || null,
        metadata: {
          customerId: customer.id
        }
      })
      .returning();

    return res.status(200).json({
      success: true,
      data: savedPaymentMethod,
      message: "Payment method added successfully"
    });
  } catch (error: any) {
    console.error("Add payment method error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get payment methods
export const getPaymentMethods = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    const methods = await db
      .select()
      .from(paymentMethods)
      .where(and(eq(paymentMethods.userId, userId), eq(paymentMethods.isActive, true)));

    return res.status(200).json({
      success: true,
      data: methods,
      message: "Payment methods retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get payment methods error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};