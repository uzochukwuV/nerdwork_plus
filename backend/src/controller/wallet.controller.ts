import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { userWallets } from "../model/wallet";
import { debitWallet } from "../services/wallet.service";

// get wallet balance by jwt
export const getWalletBalance = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // Query wallet from DB
    const [wallet] = await db
      .select()
      .from(userWallets)
      .where(eq(userWallets.userProfileId, req.user.id))
      .limit(1);

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // ✅ Always return a plain number
    return res.json({ balance: Number(wallet.nwtBalance) });
  } catch (err) {
    console.error("Error fetching wallet balance:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// debit wallet controller
export async function debitWalletController(req, res) {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: "userId and amount are required" });
    }

    const result = await debitWallet(userId, amount);

    res.json(result);
  } catch (error: any) {
    if (error.message === "Insufficient funds") {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === "Wallet not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
