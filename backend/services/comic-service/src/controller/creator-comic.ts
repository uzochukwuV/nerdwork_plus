import { eq, and, desc, asc } from "drizzle-orm";
import { db } from "../config/db.js";
import { comics, comicPages, comicPurchases } from "../model/comic.js";
import axios from 'axios';

// Create new comic (creator only)
export const createComic = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;
    const { 
      title, 
      description, 
      author, 
      artist, 
      publisher, 
      genre, 
      price = 0, 
      isFreemium = false, 
      freePageCount = 0,
      coverFileId,
      isNFTEligible = false,
      metadata 
    } = req.body;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Validate required fields
    if (!title || !genre || !author) {
      return res.status(400).json({
        success: false,
        error: "Title, genre, and author are required",
        timestamp: new Date().toISOString()
      });
    }

    // TODO: Verify user is a creator by checking user service
    // For MVP, we'll trust the authentication

    // Get cover URL from file service if coverFileId is provided
    let coverUrl = null;
    if (coverFileId) {
      try {
        const fileServiceUrl = process.env.FILE_SERVICE_URL || 'http://file-service:3007';
        const fileResponse = await axios.get(`${fileServiceUrl}/api/files/${coverFileId}`, {
          headers: { Authorization: req.headers.authorization }
        });
        coverUrl = fileResponse.data.data.cdnUrl || fileResponse.data.data.s3Url;
      } catch (error) {
        console.error("Error fetching cover file:", error);
      }
    }

    // Create comic
    const [comic] = await db
      .insert(comics)
      .values({
        creatorId,
        title,
        description,
        author,
        artist,
        publisher,
        genre,
        coverUrl,
        coverFileId,
        price: price.toString(),
        isFreemium,
        freePageCount,
        status: 'draft',
        isNFTEligible,
        metadata: metadata || {}
      })
      .returning();

    return res.status(201).json({
      success: true,
      data: comic,
      message: "Comic created successfully"
    });
  } catch (error: any) {
    console.error("Create comic error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Update comic (creator only)
export const updateComic = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;
    const { id } = req.params;
    const { 
      title, 
      description, 
      author, 
      artist, 
      publisher, 
      genre, 
      price, 
      isFreemium, 
      freePageCount,
      coverFileId,
      status,
      isNFTEligible,
      metadata 
    } = req.body;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Check if comic exists and belongs to creator
    const [existingComic] = await db
      .select()
      .from(comics)
      .where(and(eq(comics.id, id), eq(comics.creatorId, creatorId)));

    if (!existingComic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found or not owned by creator",
        timestamp: new Date().toISOString()
      });
    }

    // Get cover URL from file service if coverFileId is provided and changed
    let coverUrl = existingComic.coverUrl;
    if (coverFileId && coverFileId !== existingComic.coverFileId) {
      try {
        const fileServiceUrl = process.env.FILE_SERVICE_URL || 'http://file-service:3007';
        const fileResponse = await axios.get(`${fileServiceUrl}/api/files/${coverFileId}`, {
          headers: { Authorization: req.headers.authorization }
        });
        coverUrl = fileResponse.data.data.cdnUrl || fileResponse.data.data.s3Url;
      } catch (error) {
        console.error("Error fetching cover file:", error);
      }
    }

    // Build update data
    const updateData: any = { updatedAt: new Date() };
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (author !== undefined) updateData.author = author;
    if (artist !== undefined) updateData.artist = artist;
    if (publisher !== undefined) updateData.publisher = publisher;
    if (genre !== undefined) updateData.genre = genre;
    if (price !== undefined) updateData.price = price.toString();
    if (isFreemium !== undefined) updateData.isFreemium = isFreemium;
    if (freePageCount !== undefined) updateData.freePageCount = freePageCount;
    if (coverFileId !== undefined) {
      updateData.coverFileId = coverFileId;
      updateData.coverUrl = coverUrl;
    }
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'published' && !existingComic.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (isNFTEligible !== undefined) updateData.isNFTEligible = isNFTEligible;
    if (metadata !== undefined) updateData.metadata = metadata;

    // Update comic
    const [updatedComic] = await db
      .update(comics)
      .set(updateData)
      .where(eq(comics.id, id))
      .returning();

    return res.status(200).json({
      success: true,
      data: updatedComic,
      message: "Comic updated successfully"
    });
  } catch (error: any) {
    console.error("Update comic error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get creator's comics
export const getCreatorComics = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;
    const { page = 1, limit = 20, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    let whereConditions = [eq(comics.creatorId, creatorId), eq(comics.isActive, true)];
    
    if (status) {
      whereConditions.push(eq(comics.status, status));
    }

    const creatorComics = await db
      .select()
      .from(comics)
      .where(and(...whereConditions))
      .orderBy(desc(comics.createdAt))
      .limit(parseInt(limit))
      .offset(offset);

    return res.status(200).json({
      success: true,
      data: {
        comics: creatorComics,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          hasMore: creatorComics.length === parseInt(limit)
        }
      },
      message: "Creator comics retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get creator comics error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Add pages to comic
export const addComicPages = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;
    const { id } = req.params;
    const { pages } = req.body; // Array of page data

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Pages array is required",
        timestamp: new Date().toISOString()
      });
    }

    // Check if comic exists and belongs to creator
    const [comic] = await db
      .select()
      .from(comics)
      .where(and(eq(comics.id, id), eq(comics.creatorId, creatorId)));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found or not owned by creator",
        timestamp: new Date().toISOString()
      });
    }

    // Process pages and get file URLs
    const processedPages = [];
    for (const page of pages) {
      let imageUrl = page.imageUrl;
      
      // If fileId is provided, get URL from file service
      if (page.fileId && !page.imageUrl) {
        try {
          const fileServiceUrl = process.env.FILE_SERVICE_URL || 'http://file-service:3007';
          const fileResponse = await axios.get(`${fileServiceUrl}/api/files/${page.fileId}`, {
            headers: { Authorization: req.headers.authorization }
          });
          imageUrl = fileResponse.data.data.cdnUrl || fileResponse.data.data.s3Url;
        } catch (error) {
          console.error("Error fetching page file:", error);
          continue; // Skip this page if file can't be retrieved
        }
      }

      if (!imageUrl) {
        continue; // Skip pages without valid image URL
      }

      processedPages.push({
        comicId: id,
        pageNumber: page.pageNumber,
        imageUrl,
        fileId: page.fileId || null,
        altText: page.altText || '',
        isPreview: page.isPreview || false,
        ipfsHash: page.ipfsHash || null,
        ipfsUrl: page.ipfsUrl || null,
      });
    }

    if (processedPages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid pages to add",
        timestamp: new Date().toISOString()
      });
    }

    // Insert pages
    const insertedPages = await db
      .insert(comicPages)
      .values(processedPages)
      .returning();

    // Update comic total pages
    const maxPageNumber = Math.max(...processedPages.map(p => p.pageNumber));
    await db
      .update(comics)
      .set({
        totalPages: maxPageNumber,
        updatedAt: new Date(),
      })
      .where(eq(comics.id, id));

    return res.status(201).json({
      success: true,
      data: insertedPages,
      message: "Comic pages added successfully"
    });
  } catch (error: any) {
    console.error("Add comic pages error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get comic pages (creator view)
export const getComicPages = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;
    const { id } = req.params;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Check if comic exists and belongs to creator
    const [comic] = await db
      .select()
      .from(comics)
      .where(and(eq(comics.id, id), eq(comics.creatorId, creatorId)));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found or not owned by creator",
        timestamp: new Date().toISOString()
      });
    }

    // Get all pages for this comic
    const pages = await db
      .select()
      .from(comicPages)
      .where(eq(comicPages.comicId, id))
      .orderBy(asc(comicPages.pageNumber));

    return res.status(200).json({
      success: true,
      data: {
        comic: {
          id: comic.id,
          title: comic.title,
          totalPages: comic.totalPages,
          status: comic.status,
        },
        pages
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

// Delete comic (creator only)
export const deleteComic = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;
    const { id } = req.params;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Check if comic exists and belongs to creator
    const [comic] = await db
      .select()
      .from(comics)
      .where(and(eq(comics.id, id), eq(comics.creatorId, creatorId)));

    if (!comic) {
      return res.status(404).json({
        success: false,
        error: "Comic not found or not owned by creator",
        timestamp: new Date().toISOString()
      });
    }

    // Check if comic has any purchases (don't allow deletion if purchased)
    const purchases = await db
      .select()
      .from(comicPurchases)
      .where(eq(comicPurchases.comicId, id))
      .limit(1);

    if (purchases.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete comic with existing purchases. Archive it instead.",
        timestamp: new Date().toISOString()
      });
    }

    // Soft delete - mark as inactive
    await db
      .update(comics)
      .set({
        isActive: false,
        status: 'archived',
        updatedAt: new Date(),
      })
      .where(eq(comics.id, id));

    return res.status(200).json({
      success: true,
      message: "Comic deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete comic error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get creator dashboard stats
export const getCreatorStats = async (req: any, res: any) => {
  try {
    const creatorId = req.userId;

    if (!creatorId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Get total comics count
    const totalComicsResult = await db
      .select()
      .from(comics)
      .where(and(eq(comics.creatorId, creatorId), eq(comics.isActive, true)));

    const totalComics = totalComicsResult.length;
    const publishedComics = totalComicsResult.filter(c => c.status === 'published').length;
    const draftComics = totalComicsResult.filter(c => c.status === 'draft').length;

    // Get total purchases across all comics
    const purchaseStats = await db
      .select()
      .from(comicPurchases)
      .innerJoin(comics, eq(comicPurchases.comicId, comics.id))
      .where(and(eq(comics.creatorId, creatorId), eq(comics.isActive, true)));

    const totalPurchases = purchaseStats.length;
    const totalRevenue = purchaseStats.reduce((sum, purchase) => 
      sum + parseFloat(purchase.comic_purchases.purchasePrice), 0
    );

    return res.status(200).json({
      success: true,
      data: {
        totalComics,
        publishedComics,
        draftComics,
        totalPurchases,
        totalRevenue: totalRevenue.toFixed(2),
      },
      message: "Creator stats retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get creator stats error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};