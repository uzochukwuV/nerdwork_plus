import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db";
import { authUsers, userProfiles, userWallets } from "../model/schema";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signup = async (req: any, res: any) => {
  const { email, password, fullName, username } = req.body;

  // Check if user exists
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

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(201).json({ token, user: newUser });
};
console.log(jwt?.sign)
export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  console.log(jwt?.sign)

  const [user] = await db
    .select()
    .from(authUsers)
    .where(eq(authUsers.email, email));

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(200).json({ token, user });
};




export const signup2 = async (req: any, res: any) => {
  const { email, password, fullName, username } = req.body;

  // 1. Check if user exists
  const existingUser = await db
    .select()
    .from(authUsers)
    .where(eq(authUsers.email, email));

  if (existingUser.length > 0)
    return res.status(400).json({ message: 'User already exists' });

  // 2. Create auth user
  const hashedPassword = await bcrypt.hash(password, 10);

  const [newAuthUser] = await db
    .insert(authUsers)
    .values({
      email,
      username,
      passwordHash: hashedPassword,
    })
    .returning();

  // 3. Create user profile
  const [newProfile] = await db
    .insert(userProfiles)
    .values({
      authUserId: newAuthUser.id,
      displayName: fullName || username,
      language: 'en', // default language
      preferences: {}, // empty JSON
    })
    .returning();

  // 4. Create wallet for profile
  await db.insert(userWallets).values({
    userProfileId: newProfile.id,
    nwtBalance: 0,
    nwtLockedBalance: 0,
    kycStatus: 'none',
  });

  // 5. Sign JWT token
  const token = jwt.sign({ id: newAuthUser.id, email: newAuthUser.email }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.status(201).json({
    token,
    user: {
      id: newAuthUser.id,
      email: newAuthUser.email,
      username: newAuthUser.username,
      profile: {
        id: newProfile.id,
        displayName: newProfile.displayName,
      },
    },
  });
};