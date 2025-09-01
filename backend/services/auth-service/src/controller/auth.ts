import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import { authUsers } from "../model/auth.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: any, res: any) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email));

    if (existingUser.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(authUsers)
      .values({
        email,
        username,
        passwordHash: hashedPassword,
      })
      .returning();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({ 
      success: true,
      data: { token, user: { id: newUser.id, email: newUser.email, username: newUser.username } },
      message: "User created successfully"
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email));

    if (!user) return res.status(404).json({ 
      success: false,
      error: "User not found",
      timestamp: new Date().toISOString()
    });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ 
      success: false,
      error: "Invalid credentials",
      timestamp: new Date().toISOString()
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ 
      success: true,
      data: { token, user: { id: user.id, email: user.email, username: user.username } },
      message: "Login successful"
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

export const getCurrentUser = async (req: any, res: any) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "Unauthorized",
        timestamp: new Date().toISOString()
      });
    }

    const [user] = await db
      .select({
        id: authUsers.id,
        username: authUsers.username,
        email: authUsers.email,
        createdAt: authUsers.createdAt,
      })
      .from(authUsers)
      .where(eq(authUsers.id, userId));

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found",
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully"
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ 
      success: false,
      error: "Server error",
      timestamp: new Date().toISOString()
    });
  }
};