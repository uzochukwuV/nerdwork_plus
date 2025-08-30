import { eq, and, ilike } from "drizzle-orm";
import { db } from "../config/db.js";
import { userProfiles } from "../model/profile.js";
import { authUsers } from "../model/auth.js";

// Become a creator
export const becomeCreator = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { creatorName, creatorBio, socialLinks } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    if (!creatorName) {
      return res.status(400).json({
        success: false,
        error: "Creator name is required",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user already has a profile
    const [existingProfile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.authUserId, userId));

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        error: "User profile not found",
        timestamp: new Date().toISOString()
      });
    }

    if (existingProfile.isCreator) {
      return res.status(400).json({
        success: false,
        error: "User is already a creator",
        timestamp: new Date().toISOString()
      });
    }

    // Update profile to creator status
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({
        isCreator: true,
        creatorName,
        creatorBio,
        socialLinks: socialLinks || {},
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.authUserId, userId))
      .returning();

    return res.status(200).json({
      success: true,
      data: {
        id: updatedProfile.id,
        isCreator: updatedProfile.isCreator,
        creatorName: updatedProfile.creatorName,
        creatorBio: updatedProfile.creatorBio,
        socialLinks: updatedProfile.socialLinks,
        creatorVerified: updatedProfile.creatorVerified,
      },
      message: "Successfully became a creator"
    });
  } catch (error: any) {
    console.error("Become creator error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Update creator profile
export const updateCreatorProfile = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { creatorName, creatorBio, socialLinks } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user is a creator
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.authUserId, userId));

    if (!profile || !profile.isCreator) {
      return res.status(403).json({
        success: false,
        error: "User is not a creator",
        timestamp: new Date().toISOString()
      });
    }

    // Update creator fields
    const updateData: any = { updatedAt: new Date() };
    if (creatorName !== undefined) updateData.creatorName = creatorName;
    if (creatorBio !== undefined) updateData.creatorBio = creatorBio;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;

    const [updatedProfile] = await db
      .update(userProfiles)
      .set(updateData)
      .where(eq(userProfiles.authUserId, userId))
      .returning();

    return res.status(200).json({
      success: true,
      data: {
        id: updatedProfile.id,
        creatorName: updatedProfile.creatorName,
        creatorBio: updatedProfile.creatorBio,
        socialLinks: updatedProfile.socialLinks,
        creatorVerified: updatedProfile.creatorVerified,
      },
      message: "Creator profile updated successfully"
    });
  } catch (error: any) {
    console.error("Update creator profile error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get creator profile (public)
export const getCreatorProfile = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const [creator] = await db
      .select({
        id: userProfiles.id,
        displayName: userProfiles.displayName,
        bio: userProfiles.bio,
        avatarUrl: userProfiles.avatarUrl,
        country: userProfiles.country,
        isCreator: userProfiles.isCreator,
        creatorName: userProfiles.creatorName,
        creatorBio: userProfiles.creatorBio,
        socialLinks: userProfiles.socialLinks,
        creatorVerified: userProfiles.creatorVerified,
        createdAt: userProfiles.createdAt,
        username: authUsers.username,
      })
      .from(userProfiles)
      .innerJoin(authUsers, eq(userProfiles.authUserId, authUsers.id))
      .where(and(
        eq(userProfiles.id, id), 
        eq(userProfiles.isCreator, true)
      ));

    if (!creator) {
      return res.status(404).json({
        success: false,
        error: "Creator not found",
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      data: creator,
      message: "Creator profile retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get creator profile error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Browse creators
export const browseCreators = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 20, search, country } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereConditions = [eq(userProfiles.isCreator, true)];
    
    if (search) {
      whereConditions.push(
        ilike(userProfiles.creatorName, `%${search}%`)
      );
    }
    
    if (country) {
      whereConditions.push(eq(userProfiles.country, country));
    }

    const creators = await db
      .select({
        id: userProfiles.id,
        displayName: userProfiles.displayName,
        avatarUrl: userProfiles.avatarUrl,
        country: userProfiles.country,
        creatorName: userProfiles.creatorName,
        creatorBio: userProfiles.creatorBio,
        creatorVerified: userProfiles.creatorVerified,
        createdAt: userProfiles.createdAt,
        username: authUsers.username,
      })
      .from(userProfiles)
      .innerJoin(authUsers, eq(userProfiles.authUserId, authUsers.id))
      .where(and(...whereConditions))
      .limit(parseInt(limit))
      .offset(offset);

    return res.status(200).json({
      success: true,
      data: {
        creators,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          hasMore: creators.length === parseInt(limit)
        }
      },
      message: "Creators retrieved successfully"
    });
  } catch (error: any) {
    console.error("Browse creators error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Check if user is creator
export const checkCreatorStatus = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    const [profile] = await db
      .select({
        isCreator: userProfiles.isCreator,
        creatorName: userProfiles.creatorName,
        creatorVerified: userProfiles.creatorVerified,
      })
      .from(userProfiles)
      .where(eq(userProfiles.authUserId, userId));

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: "User profile not found",
        timestamp: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        isCreator: profile.isCreator,
        creatorName: profile.creatorName,
        creatorVerified: profile.creatorVerified,
      },
      message: "Creator status retrieved successfully"
    });
  } catch (error: any) {
    console.error("Check creator status error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};