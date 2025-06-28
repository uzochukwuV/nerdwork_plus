import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { payments } from "../model/schema";
import axios from "axios";
import { sdk } from "../config/helio.config";
import { CreatePaylinkWithApiDto } from "@heliofi/common";
const HELIO_API_BASE = "https://api.dev.hel.io/v1";
// const HELIO_API_BASE = "https://api.hel.io/v1"; // For production
const HELIO_PUBLIC_KEY = process.env.HELIO_PUBLIC_KEY;
const HELIO_PRIVATE_KEY = process.env.HELIO_PRIVATE_KEY;
const WEBHOOK_REDIRECT_URL = process.env.WEBHOOK_REDIRECT_URL;






export const createPaymentLink = async (req: any, res: any) => {
    // if (!req.user) {
    //     return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    // }
    try {
        const { amount, currency, name } = req.body;

        if (!amount || !currency || !name) {
            return res.status(400).json({
                error: 'Missing required fields: amount, currency, name'
            });
        }

        const createPaylinkDto:CreatePaylinkWithApiDto = {
            name: name,
            price: amount,
            pricingCurrency: "63777da9d2f1ab96ae0ee600",
            features: {
                canChangeQuantity: true,
                requireQuantityLimits: true,
                requireEmail: true,
                canSwapTokens: true,
                enableCountdown: true
            },
            recipients: [
                {
                    walletId: "685ef2364608b2fabd47f02d",
                    currencyId: currency
                }
            ],

            redirectUrl: 'localhost',
            description: 'adasdasdasd',
            notifySenderByEmail: true,
            notifyReceiverByEmail: true,
            dynamic: true
        }
        console.log(HELIO_PRIVATE_KEY, HELIO_PUBLIC_KEY)

        const response = await axios.post(
            `${HELIO_API_BASE}/webhook/paylink/transaction?apiKey=${HELIO_PUBLIC_KEY}`,
            createPaylinkDto,
            {
                headers: {
                    'Authorization': `Bearer ${HELIO_PRIVATE_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'cache-control': 'no-cache',
                }
            }
        );

        res.json({
            success: true,
            paymentLink: response.data.paylink,
            paymentId: response.data.id,
            data: response.data
        });

    } catch (error: any) {
        console.error('Helio payment link creation error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to create payment link',
            details: error.response?.data || error.message
        });
    }
}


export const createWebhookForPayment = async (req: any, res: any) => {
    // if (!req.user) {
    //     return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    // }
    try {
        const { paymentId } = req.body;
        const events = ["CREATED"];

        const response = await axios.post(
            `${HELIO_API_BASE}/webhook/paylink/transaction?apiKey=${HELIO_PUBLIC_KEY}`,
            {
                paylinkId: paymentId,
                targetUrl:WEBHOOK_REDIRECT_URL,
                events,
            },
            {
                headers: {
                    'Authorization': `Bearer ${HELIO_PRIVATE_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'cache-control': 'no-cache',
                }
            }
        );

        if (response.status !== 200) {
            throw new Error("Unable to create Pay Link webhook");
        }

        res.json({
            success: true,
            data: response.data
        })

    } catch (error: any) {
         console.error('Helio payment webhhok :', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to create webhook',
            details: error.response?.data || error.message
        });
    }
}


export const handlePaymentWebhook = async (req: any, res: any) => {
    try {
        console.log(req.body)
        const { event, data } = req.body;
        console.log('Received webhook event:', event, 'with data:', data);
        // Here you can handle the webhook event, e.g., update payment status in your database
        // if (event === 'CREATED') {
        //     await db.insert(payments).values({
        //         userWalletId: data.walletId,
        //         amount: data.amount,
        //         currency: data.currency,
        //         nwtAmount: data.nwtAmount,
        //         exchangeRate: data.exchangeRate,
        //         paymentIntentId: data.id,
        //         blockchainTxHash: data.blockchainTxHash,
        //         status: data.status,
        //         failureReason: data.failureReason,
        //         metadata: data.metadata,
        //         processedAt: new Date(data.processedAt),
        //         createdAt: new Date(data.createdAt),
        //         updatedAt: new Date(data.updatedAt)
        //     });
        // }
    } catch (error: any) {
        console.error('Error handling payment webhook:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
}
