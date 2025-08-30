import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { userProfiles } from "../model/profile.js";
import { authUsers } from "../model/auth.js";

export const getUserProfile = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "Unauthorized",
        timestamp: new Date().toISOString()
      });
    }

    const [profile] = await db
      .select({
        id: userProfiles.id,
        firstName: userProfiles.firstName,
        lastName: userProfiles.lastName,
        displayName: userProfiles.displayName,
        bio: userProfiles.bio,
        avatarUrl: userProfiles.avatarUrl,
        dateOfBirth: userProfiles.dateOfBirth,
        country: userProfiles.country,
        timezone: userProfiles.timezone,
        language: userProfiles.language,
        preferences: userProfiles.preferences,
        createdAt: userProfiles.createdAt,
        updatedAt: userProfiles.updatedAt,
        email: authUsers.email,
        username: authUsers.username,
      })
      .from(userProfiles)
      .innerJoin(authUsers, eq(userProfiles.authUserId, authUsers.id))
      .where(eq(authUsers.id, userId));

    if (!profile) {
      return res.status(404).json({ 
        success: false,
        error: "User profile not found",
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
      message: "User profile retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get user profile error:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

export const updateUserProfile = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const {
      firstName,
      lastName,
      displayName,
      bio,
      avatarUrl,
      dateOfBirth,
      country,
      timezone,
      language,
      preferences
    } = req.body;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "Unauthorized",
        timestamp: new Date().toISOString()
      });
    }

    const [updatedProfile] = await db
      .update(userProfiles)
      .set({
        firstName,
        lastName,
        displayName,
        bio,
        avatarUrl,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        country,
        timezone,
        language,
        preferences,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.authUserId, userId))
      .returning();

    if (!updatedProfile) {
      return res.status(404).json({ 
        success: false,
        error: "User profile not found",
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedProfile,
      message: "User profile updated successfully"
    });
  } catch (error: any) {
    console.error("Update user profile error:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

export const createUserProfile = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const {
      firstName,
      lastName,
      displayName,
      bio,
      avatarUrl,
      dateOfBirth,
      country,
      timezone,
      language = 'en',
      preferences = {}
    } = req.body;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        error: "Unauthorized",
        timestamp: new Date().toISOString()
      });
    }

    if (!displayName) {
      return res.status(400).json({ 
        success: false,
        error: "Display name is required",
        timestamp: new Date().toISOString()
      });
    }

    const [newProfile] = await db
      .insert(userProfiles)
      .values({
        authUserId: userId,
        firstName,
        lastName,
        displayName,
        bio,
        avatarUrl,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        country,
        timezone,
        language,
        preferences,
      })
      .returning();

    return res.status(201).json({
      success: true,
      data: newProfile,
      message: "User profile created successfully"
    });
  } catch (error: any) {
    console.error("Create user profile error:", error);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};