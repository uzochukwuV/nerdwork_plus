import { eq, desc, asc, ilike, and, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import { comics, comicPages, readingProgress, comicPurchases, comicReviews } from "../model/comic.js";

// Get all comics with pagination and filtering
export const getComics = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 20, genre, author, search, sortBy = 'createdAt' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereConditions = [eq(comics.isActive, true)];
    
    if (genre) {
      whereConditions.push(ilike(comics.genre, `%${genre}%`));
    }
    
    if (author) {
      whereConditions.push(ilike(comics.author, `%${author}%`));
    }
    
    if (search) {
      whereConditions.push(
        sql`(${comics.title} ILIKE ${`%${search}%`} OR ${comics.description} ILIKE ${`%${search}%`})`
      );
    }

    const orderBy = sortBy === 'title' ? asc(comics.title) : desc(comics.createdAt);

    const comicsList = await db
      .select({
        id: comics.id,
        title: comics.title,
        description: comics.description,
        author: comics.author,
        artist: comics.artist,
        publisher: comics.publisher,
        genre: comics.genre,
        coverUrl: comics.coverUrl,
        totalPages: comics.totalPages,
        price: comics.price,
        isFreemium: comics.isFreemium,
        freePageCount: comics.freePageCount,
        publishedAt: comics.publishedAt,
        createdAt: comics.createdAt,
      })
      .from(comics)
      .where(and(...whereConditions))
      .orderBy(orderBy)
      .limit(parseInt(limit))
      .offset(offset);

    const totalCount = await db
      .select({ count: sql`count(*)` })
      .from(comics)
      .where(and(...whereConditions));

    return res.status(200).json({
      success: true,
      data: {
        comics: comicsList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount[0].count,
          totalPages: Math.ceil(Number(totalCount[0].count) / parseInt(limit))
        }
      },
      message: "Comics retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get comics error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get specific comic details
export const getComic = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const [comic] = await db
      .select()
      .from(comics)
      .where(and(eq(comics.id, id), eq(comics.isActive, true)));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user has purchased this comic
    let hasPurchased = false;
    if (userId) {
      const purchase = await db
        .select()
        .from(comicPurchases)
        .where(and(eq(comicPurchases.userId, userId), eq(comicPurchases.comicId, id)));
      hasPurchased = purchase.length > 0;
    }

    // Get user's reading progress
    let progress = null;
    if (userId) {
      const [userProgress] = await db
        .select()
        .from(readingProgress)
        .where(and(eq(readingProgress.userId, userId), eq(readingProgress.comicId, id)));
      progress = userProgress || null;
    }

    return res.status(200).json({
      success: true,
      data: {
        comic,
        hasPurchased,
        progress
      },
      message: "Comic retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get comic error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get comic pages (with access control)
export const getComicPages = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Get comic details
    const [comic] = await db
      .select()
      .from(comics)
      .where(and(eq(comics.id, id), eq(comics.isActive, true)));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user has purchased this comic or if it's freemium
    let hasPurchased = false;
    if (userId) {
      const purchase = await db
        .select()
        .from(comicPurchases)
        .where(and(eq(comicPurchases.userId, userId), eq(comicPurchases.comicId, id)));
      hasPurchased = purchase.length > 0;
    }

    let pages;
    if (hasPurchased || comic.isFreemium) {
      // Return all pages for purchased comics or free comics
      pages = await db
        .select()
        .from(comicPages)
        .where(eq(comicPages.comicId, id))
        .orderBy(asc(comicPages.pageNumber));
    } else {
      // Return only preview pages for non-purchased comics
      pages = await db
        .select()
        .from(comicPages)
        .where(and(
          eq(comicPages.comicId, id),
          eq(comicPages.isPreview, true)
        ))
        .orderBy(asc(comicPages.pageNumber))
        .limit(comic.freePageCount);
    }

    return res.status(200).json({
      success: true,
      data: {
        pages,
        totalPages: comic.totalPages,
        accessLevel: hasPurchased ? 'full' : (comic.isFreemium ? 'free' : 'preview')
      },
      message: "Comic pages retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get comic pages error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Update reading progress
export const updateReadingProgress = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { currentPage } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    const [comic] = await db
      .select()
      .from(comics)
      .where(eq(comics.id, id));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found",
        timestamp: new Date().toISOString()
      });
    }

    // Check if progress entry exists
    const [existingProgress] = await db
      .select()
      .from(readingProgress)
      .where(and(eq(readingProgress.userId, userId), eq(readingProgress.comicId, id)));

    const isCompleted = currentPage >= comic.totalPages;
    const progressData = {
      userId,
      comicId: id,
      currentPage,
      totalPages: comic.totalPages,
      completedAt: isCompleted ? new Date() : null,
      lastReadAt: new Date(),
      updatedAt: new Date(),
    };

    let updatedProgress;
    if (existingProgress) {
      [updatedProgress] = await db
        .update(readingProgress)
        .set({
          currentPage,
          completedAt: isCompleted ? new Date() : null,
          lastReadAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(readingProgress.id, existingProgress.id))
        .returning();
    } else {
      [updatedProgress] = await db
        .insert(readingProgress)
        .values(progressData)
        .returning();
    }

    return res.status(200).json({
      success: true,
      data: updatedProgress,
      message: "Reading progress updated successfully"
    });
  } catch (error: any) {
    console.error("Update reading progress error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get user's reading history
export const getReadingHistory = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    const history = await db
      .select({
        id: readingProgress.id,
        currentPage: readingProgress.currentPage,
        totalPages: readingProgress.totalPages,
        completedAt: readingProgress.completedAt,
        lastReadAt: readingProgress.lastReadAt,
        comic: {
          id: comics.id,
          title: comics.title,
          author: comics.author,
          coverUrl: comics.coverUrl,
        }
      })
      .from(readingProgress)
      .innerJoin(comics, eq(readingProgress.comicId, comics.id))
      .where(eq(readingProgress.userId, userId))
      .orderBy(desc(readingProgress.lastReadAt));

    return res.status(200).json({
      success: true,
      data: history,
      message: "Reading history retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get reading history error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Add comic review
export const addComicReview = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5",
        timestamp: new Date().toISOString()
      });
    }

    // Check if comic exists
    const [comic] = await db
      .select()
      .from(comics)
      .where(eq(comics.id, id));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user already reviewed this comic
    const [existingReview] = await db
      .select()
      .from(comicReviews)
      .where(and(eq(comicReviews.userId, userId), eq(comicReviews.comicId, id)));

    let reviewResult;
    if (existingReview) {
      [reviewResult] = await db
        .update(comicReviews)
        .set({
          rating,
          review,
          updatedAt: new Date(),
        })
        .where(eq(comicReviews.id, existingReview.id))
        .returning();
    } else {
      [reviewResult] = await db
        .insert(comicReviews)
        .values({
          userId,
          comicId: id,
          rating,
          review,
        })
        .returning();
    }

    return res.status(200).json({
      success: true,
      data: reviewResult,
      message: existingReview ? "Review updated successfully" : "Review added successfully"
    });
  } catch (error: any) {
    console.error("Add comic review error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};