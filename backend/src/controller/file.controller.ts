import { Request, Response } from "express";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || "nerdwork-comics";

// Multer configuration for memory storage (files will be uploaded to S3)
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 10 // Maximum 10 files at once
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg", 
      "image/png", 
      "image/gif", 
      "image/webp",
      "application/pdf", // For comic PDFs
      "application/zip", // For comic archives
      "application/x-zip-compressed"
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, WebP, PDF, and ZIP files are allowed."));
    }
  },
});

// Helper function to generate S3 key
const generateS3Key = (userId: string, filename: string): string => {
  const fileExtension = filename.split('.').pop();
  const uniqueId = uuidv4();
  return `comics/${userId}/${uniqueId}.${fileExtension}`;
};

// Upload single comic file to S3
export const uploadComicFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { userId, title, description, genre, author } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const s3Key = generateS3Key(userId, req.file.originalname);
    
    // Upload to S3
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      Metadata: {
        userId,
        title: title || req.file.originalname,
        description: description || "",
        genre: genre || "comic",
        author: author || "unknown",
        uploadDate: new Date().toISOString(),
      },
    };

    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    const result = await parallelUploads3.done();

    // Generate a signed URL for immediate access (valid for 1 hour)
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
    };
    
    const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), {
      expiresIn: 3600, // 1 hour
    });

    res.json({
      success: true,
      message: "Comic file uploaded successfully",
      data: {
        s3Key,
        location: result.Location,
        bucket: BUCKET_NAME,
        signedUrl,
        metadata: {
          userId,
          title: title || req.file.originalname,
          description: description || "",
          genre: genre || "comic",
          author: author || "unknown",
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          originalName: req.file.originalname,
        }
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Failed to upload comic file",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Upload multiple comic files to S3
export const uploadMultipleComicFiles = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const { userId, title, description, genre, author } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const uploadPromises = req.files.map(async (file) => {
      const s3Key = generateS3Key(userId, file.originalname);
      
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          userId,
          title: title || file.originalname,
          description: description || "",
          genre: genre || "comic",
          author: author || "unknown",
          uploadDate: new Date().toISOString(),
        },
      };

      const parallelUploads3 = new Upload({
        client: s3Client,
        params: uploadParams,
      });

      const result = await parallelUploads3.done();
      
      // Generate signed URL for each file
      const signedUrl = await getSignedUrl(
        s3Client, 
        new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }), 
        { expiresIn: 3600 }
      );

      return {
        s3Key,
        location: result.Location,
        signedUrl,
        originalName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
      };
    });

    const uploadResults = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: `${uploadResults.length} comic files uploaded successfully`,
      data: {
        files: uploadResults,
        metadata: {
          userId,
          title,
          description,
          genre,
          author,
          totalFiles: uploadResults.length,
        }
      }
    });
  } catch (error) {
    console.error("Multiple upload error:", error);
    res.status(500).json({
      error: "Failed to upload comic files",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Get comic file from S3 (generate signed URL)
export const getComicFile = async (req: Request, res: Response) => {
  try {
    const { s3Key } = req.params;
    const { expiresIn = 3600 } = req.query; // Default 1 hour

    if (!s3Key) {
      return res.status(400).json({ error: "S3 key is required" });
    }

    // Generate signed URL for the file
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
    };

    const signedUrl = await getSignedUrl(
      s3Client, 
      new GetObjectCommand(getObjectParams), 
      { expiresIn: parseInt(expiresIn as string) }
    );

    res.json({
      success: true,
      data: {
        s3Key,
        signedUrl,
        expiresIn: parseInt(expiresIn as string),
      }
    });
  } catch (error) {
    console.error("Get file error:", error);
    res.status(500).json({
      error: "Failed to get comic file",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Update comic file in S3 (replace existing file)
export const updateComicFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { s3Key } = req.params;
    const { title, description, genre, author } = req.body;

    if (!s3Key) {
      return res.status(400).json({ error: "S3 key is required" });
    }

    // Update the file in S3 (this replaces the existing file)
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      Metadata: {
        title: title || req.file.originalname,
        description: description || "",
        genre: genre || "comic",
        author: author || "unknown",
        lastUpdated: new Date().toISOString(),
      },
    };

    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    const result = await parallelUploads3.done();

    // Generate new signed URL
    const signedUrl = await getSignedUrl(
      s3Client, 
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }), 
      { expiresIn: 3600 }
    );

    res.json({
      success: true,
      message: "Comic file updated successfully",
      data: {
        s3Key,
        location: result.Location,
        signedUrl,
        metadata: {
          title: title || req.file.originalname,
          description: description || "",
          genre: genre || "comic",
          author: author || "unknown",
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          originalName: req.file.originalname,
          lastUpdated: new Date().toISOString(),
        }
      }
    });
  } catch (error) {
    console.error("Update file error:", error);
    res.status(500).json({
      error: "Failed to update comic file",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Delete comic file from S3
export const deleteComicFile = async (req: Request, res: Response) => {
  try {
    const { s3Key } = req.params;

    if (!s3Key) {
      return res.status(400).json({ error: "S3 key is required" });
    }

    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: s3Key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    res.json({
      success: true,
      message: "Comic file deleted successfully",
      data: {
        s3Key,
        deletedAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({
      error: "Failed to delete comic file",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// List user's comic files
export const listUserComicFiles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // List objects with the user's prefix
    const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
    
    const listParams = {
      Bucket: BUCKET_NAME,
      Prefix: `comics/${userId}/`,
      MaxKeys: 100, // Limit to 100 files per request
    };

    const command = new ListObjectsV2Command(listParams);
    const response = await s3Client.send(command);
    console.log(response);

    if (!response.Contents || response.Contents.length === 0) {
      return res.json({
        success: true,
        data: {
          files: [],
          count: 0,
        }
      });
    }

    // Generate signed URLs for each file
    const filesWithUrls = await Promise.all(
      response.Contents.map(async (object) => {
        const signedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({ Bucket: BUCKET_NAME, Key: object.Key }),
          { expiresIn: 3600 }
        );

        return {
          s3Key: object.Key,
          lastModified: object.LastModified,
          size: object.Size,
          signedUrl,
        };
      })
    );

    res.json({
      success: true,
      data: {
        files: filesWithUrls,
        count: filesWithUrls.length,
      }
    });
  } catch (error) {
    console.error("List files error:", error);
    res.status(500).json({
      error: "Failed to list comic files",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};