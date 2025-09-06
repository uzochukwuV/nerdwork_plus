import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
// AWS S3 Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const BUCKET_NAME = process.env.S3_BUCKET_NAME || "nerdwork-comics";
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || "dgumbu3t6hn53.cloudfront.net";
const CLOUDFRONT_URL = `https://${CLOUDFRONT_DOMAIN}`;
// Helper function to convert S3 key to CloudFront URL
const getCloudFrontUrl = (s3Key) => {
    return `${CLOUDFRONT_URL}/${s3Key}`;
};
// Helper function to generate cache-busting CloudFront URL
const getCloudFrontUrlWithCacheBusting = (s3Key) => {
    const timestamp = Date.now();
    return `${CLOUDFRONT_URL}/${s3Key}?v=${timestamp}`;
};
// Multer configuration for memory storage (files will be uploaded to S3)
const storage = multer.memoryStorage();
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for comics
        files: 20, // Maximum 20 files at once
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "application/pdf", // For comic PDFs
            "application/zip", // For comic archives
            "application/x-zip-compressed",
            "application/x-rar-compressed", // RAR archives
            "application/vnd.comicbook+zip", // CBZ format
            "application/vnd.comicbook-rar", // CBR format
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only images, PDFs, and comic archives (ZIP, RAR, CBZ, CBR) are allowed."));
        }
    },
});
// Helper function to generate S3 key with proper structure
const generateS3Key = (userId, filename, comicId) => {
    const fileExtension = filename.split(".").pop()?.toLowerCase();
    const uniqueId = uuidv4();
    const timestamp = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    if (comicId) {
        return `comics/${userId}/${comicId}/${timestamp}-${uniqueId}.${fileExtension}`;
    }
    return `comics/${userId}/${timestamp}-${uniqueId}.${fileExtension}`;
};
// Upload single comic file to S3
export const uploadComicFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const { userId, title, description, genre, author, comicId, isPublic = false, } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const s3Key = generateS3Key(userId, req.file.originalname, comicId);
        // Upload to S3
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: s3Key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            CacheControl: "public, max-age=31536000", // 1 year cache for comics
            Metadata: {
                userId,
                title: title || req.file.originalname,
                description: description || "",
                genre: genre || "comic",
                author: author || "unknown",
                comicId: comicId || "",
                isPublic: isPublic.toString(),
                uploadDate: new Date().toISOString(),
                originalFileName: req.file.originalname,
            },
        };
        // Set public read if file is public
        if (isPublic === "true" || isPublic === true) {
            uploadParams["ACL"] = "public-read";
        }
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: uploadParams,
        });
        const result = await parallelUploads3.done();
        // Generate CloudFront URL (primary access method)
        const cloudFrontUrl = getCloudFrontUrl(s3Key);
        // Generate signed URL as fallback (for private files)
        let signedUrl = null;
        if (isPublic !== "true" && isPublic !== true) {
            signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }), { expiresIn: 3600 });
        }
        res.json({
            success: true,
            message: "Comic file uploaded successfully",
            data: {
                s3Key,
                s3Location: result.Location,
                cloudFrontUrl, // Primary URL for serving content
                signedUrl, // Fallback for private content
                bucket: BUCKET_NAME,
                isPublic: isPublic === "true" || isPublic === true,
                metadata: {
                    userId,
                    comicId: comicId || null,
                    title: title || req.file.originalname,
                    description: description || "",
                    genre: genre || "comic",
                    author: author || "unknown",
                    fileSize: req.file.size,
                    mimeType: req.file.mimetype,
                    originalName: req.file.originalname,
                    uploadDate: new Date().toISOString(),
                },
            },
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            error: "Failed to upload comic file",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// Upload multiple comic files to S3
export const uploadMultipleComicFiles = async (req, res) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const { userId, title, description, genre, author, comicId, isPublic = false, } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const uploadPromises = req.files.map(async (file, index) => {
            const s3Key = generateS3Key(userId, file.originalname, comicId);
            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: s3Key,
                Body: file.buffer,
                ContentType: file.mimetype,
                CacheControl: "public, max-age=31536000",
                Metadata: {
                    userId,
                    title: title || `${file.originalname} (${index + 1})`,
                    description: description || "",
                    genre: genre || "comic",
                    author: author || "unknown",
                    comicId: comicId || "",
                    isPublic: isPublic.toString(),
                    uploadDate: new Date().toISOString(),
                    originalFileName: file.originalname,
                    fileIndex: (index + 1).toString(),
                },
            };
            if (isPublic === "true" || isPublic === true) {
                uploadParams["ACL"] = "public-read";
            }
            const parallelUploads3 = new Upload({
                client: s3Client,
                params: uploadParams,
            });
            const result = await parallelUploads3.done();
            // Generate CloudFront URL
            const cloudFrontUrl = getCloudFrontUrl(s3Key);
            // Generate signed URL for private files
            let signedUrl = null;
            if (isPublic !== "true" && isPublic !== true) {
                signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }), { expiresIn: 3600 });
            }
            return {
                s3Key,
                s3Location: result.Location,
                cloudFrontUrl,
                signedUrl,
                originalName: file.originalname,
                fileSize: file.size,
                mimeType: file.mimetype,
                fileIndex: index + 1,
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
                    comicId: comicId || null,
                    title,
                    description,
                    genre,
                    author,
                    totalFiles: uploadResults.length,
                    isPublic: isPublic === "true" || isPublic === true,
                    uploadDate: new Date().toISOString(),
                },
            },
        });
    }
    catch (error) {
        console.error("Multiple upload error:", error);
        res.status(500).json({
            error: "Failed to upload comic files",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// Get comic file URL (CloudFront preferred, signed URL as fallback)
export const getComicFile = async (req, res) => {
    try {
        const { s3Key } = req.params;
        const { signed = "false" } = req.query;
        if (!s3Key) {
            return res.status(400).json({ error: "S3 key is required" });
        }
        // Check if file exists in S3
        try {
            await s3Client.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }));
        }
        catch (error) {
            return res.status(404).json({ error: "File not found" });
        }
        // Always provide CloudFront URL for better performance
        const cloudFrontUrl = getCloudFrontUrl(s3Key);
        let signedUrl = null;
        // Generate signed URL if requested or for private files
        if (signed === "true") {
            const expiresIn = parseInt(req.query.expiresIn) || 3600;
            signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }), { expiresIn });
        }
        res.json({
            success: true,
            data: {
                s3Key,
                cloudFrontUrl, // Primary URL - fastest delivery
                signedUrl, // Fallback URL with access control
                cdnDomain: CLOUDFRONT_DOMAIN,
                recommendation: "Use cloudFrontUrl for public content, signedUrl for private content",
            },
        });
    }
    catch (error) {
        console.error("Get file error:", error);
        res.status(500).json({
            error: "Failed to get comic file",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// Update comic file in S3
export const updateComicFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const { s3Key } = req.params;
        const { title, description, genre, author, isPublic } = req.body;
        if (!s3Key) {
            return res.status(400).json({ error: "S3 key is required" });
        }
        // Check if file exists
        try {
            await s3Client.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }));
        }
        catch (error) {
            return res.status(404).json({ error: "Original file not found" });
        }
        // Update the file in S3 (replaces existing file)
        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: s3Key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            CacheControl: "public, max-age=31536000",
            Metadata: {
                title: title || req.file.originalname,
                description: description || "",
                genre: genre || "comic",
                author: author || "unknown",
                isPublic: isPublic?.toString() || "false",
                lastUpdated: new Date().toISOString(),
                originalFileName: req.file.originalname,
            },
        };
        if (isPublic === "true" || isPublic === true) {
            uploadParams["ACL"] = "public-read";
        }
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: uploadParams,
        });
        const result = await parallelUploads3.done();
        // Generate cache-busting CloudFront URL for updated content
        const cloudFrontUrl = getCloudFrontUrlWithCacheBusting(s3Key);
        // Generate new signed URL
        const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }), { expiresIn: 3600 });
        res.json({
            success: true,
            message: "Comic file updated successfully",
            data: {
                s3Key,
                s3Location: result.Location,
                cloudFrontUrl, // Cache-busting URL for immediate access
                signedUrl,
                isPublic: isPublic === "true" || isPublic === true,
                metadata: {
                    title: title || req.file.originalname,
                    description: description || "",
                    genre: genre || "comic",
                    author: author || "unknown",
                    fileSize: req.file.size,
                    mimeType: req.file.mimetype,
                    originalName: req.file.originalname,
                    lastUpdated: new Date().toISOString(),
                },
                note: "CloudFront cache may take 5-15 minutes to update globally",
            },
        });
    }
    catch (error) {
        console.error("Update file error:", error);
        res.status(500).json({
            error: "Failed to update comic file",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// Delete comic file from S3
export const deleteComicFile = async (req, res) => {
    try {
        const { s3Key } = req.params;
        if (!s3Key) {
            return res.status(400).json({ error: "S3 key is required" });
        }
        // Check if file exists before deletion
        try {
            await s3Client.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }));
        }
        catch (error) {
            return res.status(404).json({ error: "File not found" });
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
                note: "CloudFront cache will expire naturally (may take 24 hours for complete removal)",
            },
        });
    }
    catch (error) {
        console.error("Delete file error:", error);
        res.status(500).json({
            error: "Failed to delete comic file",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// List user's comic files with CloudFront URLs
export const listUserComicFiles = async (req, res) => {
    try {
        const { userId } = req.params;
        const { comicId, limit = "100" } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        // Build prefix based on parameters
        let prefix = `comics/${userId}/`;
        if (comicId) {
            prefix += `${comicId}/`;
        }
        const listParams = {
            Bucket: BUCKET_NAME,
            Prefix: prefix,
            MaxKeys: Math.min(parseInt(limit), 1000), // Cap at 1000
        };
        const command = new ListObjectsV2Command(listParams);
        const response = await s3Client.send(command);
        if (!response.Contents || response.Contents.length === 0) {
            return res.json({
                success: true,
                data: {
                    files: [],
                    count: 0,
                    userId,
                    comicId: comicId || null,
                },
            });
        }
        // Generate CloudFront URLs and signed URLs for each file
        const filesWithUrls = await Promise.all(response.Contents.map(async (object) => {
            if (!object.Key)
                return null;
            const cloudFrontUrl = getCloudFrontUrl(object.Key);
            // Get metadata to determine if public
            let isPublic = false;
            try {
                const headResult = await s3Client.send(new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: object.Key,
                }));
                isPublic = headResult.Metadata?.isPublic === "true";
            }
            catch (error) {
                console.warn(`Could not get metadata for ${object.Key}`);
            }
            // Generate signed URL for private files
            let signedUrl = null;
            if (!isPublic) {
                try {
                    signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: BUCKET_NAME, Key: object.Key }), { expiresIn: 3600 });
                }
                catch (error) {
                    console.warn(`Could not generate signed URL for ${object.Key}`);
                }
            }
            return {
                s3Key: object.Key,
                cloudFrontUrl,
                signedUrl,
                lastModified: object.LastModified,
                size: object.Size,
                isPublic,
                fileName: object.Key.split("/").pop(), // Extract filename
            };
        }));
        // Filter out any null entries
        const validFiles = filesWithUrls.filter((file) => file !== null);
        res.json({
            success: true,
            data: {
                files: validFiles,
                count: validFiles.length,
                userId,
                comicId: comicId || null,
                cdnDomain: CLOUDFRONT_DOMAIN,
                note: "Use cloudFrontUrl for public files, signedUrl for private files",
            },
        });
    }
    catch (error) {
        console.error("List files error:", error);
        res.status(500).json({
            error: "Failed to list comic files",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
// Get file metadata and URLs
export const getComicFileInfo = async (req, res) => {
    try {
        const { s3Key } = req.params;
        if (!s3Key) {
            return res.status(400).json({ error: "S3 key is required" });
        }
        // Get file metadata
        const headCommand = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: s3Key,
        });
        const headResult = await s3Client.send(headCommand);
        const isPublic = headResult.Metadata?.isPublic === "true";
        const cloudFrontUrl = getCloudFrontUrl(s3Key);
        let signedUrl = null;
        if (!isPublic) {
            signedUrl = await getSignedUrl(s3Client, headCommand, {
                expiresIn: 3600,
            });
        }
        res.json({
            success: true,
            data: {
                s3Key,
                cloudFrontUrl,
                signedUrl,
                isPublic,
                metadata: {
                    contentType: headResult.ContentType,
                    contentLength: headResult.ContentLength,
                    lastModified: headResult.LastModified,
                    cacheControl: headResult.CacheControl,
                    ...headResult.Metadata,
                },
                cdnDomain: CLOUDFRONT_DOMAIN,
            },
        });
    }
    catch (error) {
        console.error("Get file info error:", error);
        if (error instanceof Error && error.name === "NoSuchKey") {
            return res.status(404).json({ error: "File not found" });
        }
        res.status(500).json({
            error: "Failed to get file info",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const uploadToS3 = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded",
            });
        }
        const file = req.file;
        const fileExtension = path.extname(file.originalname);
        const key = `media/${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}${fileExtension}`;
        // Upload without ACL
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await s3Client.send(command);
        // Build CloudFront or fallback S3 URL
        const publicUrl = process.env.CLOUDFRONT_DOMAIN
            ? `${process.env.CLOUDFRONT_DOMAIN}/${key}`
            : `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        return res.status(200).json({
            success: true,
            url: publicUrl,
            message: "File uploaded successfully",
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsb0JBQW9CLEdBQ3JCLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFFLEVBQUUsSUFBSSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRXhCLHVCQUF1QjtBQUN2QixNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksV0FBVztJQUM3QyxXQUFXLEVBQUU7UUFDWCxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBa0I7UUFDM0MsZUFBZSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXNCO0tBQ3BEO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksaUJBQWlCLENBQUM7QUFDcEUsTUFBTSxpQkFBaUIsR0FDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSw4QkFBOEIsQ0FBQztBQUNsRSxNQUFNLGNBQWMsR0FBRyxXQUFXLGlCQUFpQixFQUFFLENBQUM7QUFFdEQsc0RBQXNEO0FBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQVUsRUFBRTtJQUNqRCxPQUFPLEdBQUcsY0FBYyxJQUFJLEtBQUssRUFBRSxDQUFDO0FB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TUFBTTtZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdCLHNDQUFzQztRQUN0QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQjtZQUM3QyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLEdBQUcsRUFBRTtZQUMzQyxDQUFDLENBQUMsV0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRTlGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxFQUFFLElBQUk7WUFDYixHQUFHLEVBQUUsU0FBUztZQUNkLE9BQU8sRUFBRSw0QkFBNEI7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQge1xyXG4gIFMzQ2xpZW50LFxyXG4gIFB1dE9iamVjdENvbW1hbmQsXHJcbiAgR2V0T2JqZWN0Q29tbWFuZCxcclxuICBEZWxldGVPYmplY3RDb21tYW5kLFxyXG4gIExpc3RPYmplY3RzVjJDb21tYW5kLFxyXG59IGZyb20gXCJAYXdzLXNkay9jbGllbnQtczNcIjtcclxuaW1wb3J0IHsgZ2V0U2lnbmVkVXJsIH0gZnJvbSBcIkBhd3Mtc2RrL3MzLXJlcXVlc3QtcHJlc2lnbmVyXCI7XHJcbmltcG9ydCB7IFVwbG9hZCB9IGZyb20gXCJAYXdzLXNkay9saWItc3RvcmFnZVwiO1xyXG5pbXBvcnQgbXVsdGVyIGZyb20gXCJtdWx0ZXJcIjtcclxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIEFXUyBTMyBDb25maWd1cmF0aW9uXHJcbmNvbnN0IHMzQ2xpZW50ID0gbmV3IFMzQ2xpZW50KHtcclxuICByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04gfHwgXCJ1cy1lYXN0LTFcIixcclxuICBjcmVkZW50aWFsczoge1xyXG4gICAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lEISxcclxuICAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZISxcclxuICB9LFxyXG59KTtcclxuXHJcbmNvbnN0IEJVQ0tFVF9OQU1FID0gcHJvY2Vzcy5lbnYuUzNfQlVDS0VUX05BTUUgfHwgXCJuZXJkd29yay1jb21pY3NcIjtcclxuY29uc3QgQ0xPVURGUk9OVF9ET01BSU4gPVxyXG4gIHByb2Nlc3MuZW52LkNMT1VERlJPTlRfRE9NQUlOIHx8IFwiZGd1bWJ1M3Q2aG41My5jbG91ZGZyb250Lm5ldFwiO1xyXG5jb25zdCBDTE9VREZST05UX1VSTCA9IGBodHRwczovLyR7Q0xPVURGUk9OVF9ET01BSU59YDtcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IFMzIGtleSB0byBDbG91ZEZyb250IFVSTFxyXG5jb25zdCBnZXRDbG91ZEZyb250VXJsID0gKHMzS2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtDTE9VREZST05UX1VSTH0vJHtzM0tleX1gO1xyXG59O1xyXG5cclxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNhY2hlLWJ1c3RpbmcgQ2xvdWRGcm9udCBVUkxcclxuY29uc3QgZ2V0Q2xvdWRGcm9udFVybFdpdGhDYWNoZUJ1c3RpbmcgPSAoczNLZXk6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICByZXR1cm4gYCR7Q0xPVURGUk9OVF9VUkx9LyR7czNLZXl9P3Y9JHt0aW1lc3RhbXB9YDtcclxufTtcclxuXHJcbi8vIE11bHRlciBjb25maWd1cmF0aW9uIGZvciBtZW1vcnkgc3RvcmFnZSAoZmlsZXMgd2lsbCBiZSB1cGxvYWRlZCB0byBTMylcclxuY29uc3Qgc3RvcmFnZSA9IG11bHRlci5tZW1vcnlTdG9yYWdlKCk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBsb2FkID0gbXVsdGVyKHtcclxuICBzdG9yYWdlOiBzdG9yYWdlLFxyXG4gIGxpbWl0czoge1xyXG4gICAgZmlsZVNpemU6IDEwMCAqIDEwMjQgKiAxMDI0LCAvLyAxMDBNQiBsaW1pdCBmb3IgY29taWNzXHJcbiAgICBmaWxlczogMjAsIC8vIE1heGltdW0gMjAgZmlsZXMgYXQgb25jZVxyXG4gIH0sXHJcbiAgZmlsZUZpbHRlcjogKHJlcSwgZmlsZSwgY2IpID0+IHtcclxuICAgIGNvbnN0IGFsbG93ZWRUeXBlcyA9IFtcclxuICAgICAgXCJpbWFnZS9qcGVnXCIsXHJcbiAgICAgIFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgIFwiaW1hZ2UvZ2lmXCIsXHJcbiAgICAgIFwiaW1hZ2Uvd2VicFwiLFxyXG4gICAgICBcImltYWdlL3N2Zyt4bWxcIixcclxuICAgICAgXCJhcHBsaWNhdGlvbi9wZGZcIiwgLy8gRm9yIGNvbWljIFBERnNcclxuICAgICAgXCJhcHBsaWNhdGlvbi96aXBcIiwgLy8gRm9yIGNvbWljIGFyY2hpdmVzXHJcbiAgICAgIFwiYXBwbGljYXRpb24veC16aXAtY29tcHJlc3NlZFwiLFxyXG4gICAgICBcImFwcGxpY2F0aW9uL3gtcmFyLWNvbXByZXNzZWRcIiwgLy8gUkFSIGFyY2hpdmVzXHJcbiAgICAgIFwiYXBwbGljYXRpb24vdm5kLmNvbWljYm9vayt6aXBcIiwgLy8gQ0JaIGZvcm1hdFxyXG4gICAgICBcImFwcGxpY2F0aW9uL3ZuZC5jb21pY2Jvb2stcmFyXCIsIC8vIENCUiBmb3JtYXRcclxuICAgIF07XHJcblxyXG4gICAgaWYgKGFsbG93ZWRUeXBlcy5pbmNsdWRlcyhmaWxlLm1pbWV0eXBlKSkge1xyXG4gICAgICBjYihudWxsLCB0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNiKFxyXG4gICAgICAgIG5ldyBFcnJvcihcclxuICAgICAgICAgIFwiSW52YWxpZCBmaWxlIHR5cGUuIE9ubHkgaW1hZ2VzLCBQREZzLCBhbmQgY29taWMgYXJjaGl2ZXMgKFpJUCwgUkFSLCBDQlosIENCUikgYXJlIGFsbG93ZWQuXCJcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgUzMga2V5IHdpdGggcHJvcGVyIHN0cnVjdHVyZVxyXG5jb25zdCBnZW5lcmF0ZVMzS2V5ID0gKFxyXG4gIHVzZXJJZDogc3RyaW5nLFxyXG4gIGZpbGVuYW1lOiBzdHJpbmcsXHJcbiAgY29taWNJZD86IHN0cmluZ1xyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGZpbGVFeHRlbnNpb24gPSBmaWxlbmFtZS5zcGxpdChcIi5cIikucG9wKCk/LnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgdW5pcXVlSWQgPSB1dWlkdjQoKTtcclxuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdOyAvLyBZWVlZLU1NLUREXHJcblxyXG4gIGlmIChjb21pY0lkKSB7XHJcbiAgICByZXR1cm4gYGNvbWljcy8ke3VzZXJJZH0vJHtjb21pY0lkfS8ke3RpbWVzdGFtcH0tJHt1bmlxdWVJZH0uJHtmaWxlRXh0ZW5zaW9ufWA7XHJcbiAgfVxyXG4gIHJldHVybiBgY29taWNzLyR7dXNlcklkfS8ke3RpbWVzdGFtcH0tJHt1bmlxdWVJZH0uJHtmaWxlRXh0ZW5zaW9ufWA7XHJcbn07XHJcblxyXG4vLyBVcGxvYWQgc2luZ2xlIGNvbWljIGZpbGUgdG8gUzNcclxuZXhwb3J0IGNvbnN0IHVwbG9hZENvbWljRmlsZSA9IGFzeW5jIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICB0cnkge1xyXG4gICAgaWYgKCFyZXEuZmlsZSkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJObyBmaWxlIHVwbG9hZGVkXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICB1c2VySWQsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgZ2VucmUsXHJcbiAgICAgIGF1dGhvcixcclxuICAgICAgY29taWNJZCxcclxuICAgICAgaXNQdWJsaWMgPSBmYWxzZSxcclxuICAgIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICBpZiAoIXVzZXJJZCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJVc2VyIElEIGlzIHJlcXVpcmVkXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgczNLZXkgPSBnZW5lcmF0ZVMzS2V5KHVzZXJJZCwgcmVxLmZpbGUub3JpZ2luYWxuYW1lLCBjb21pY0lkKTtcclxuXHJcbiAgICAvLyBVcGxvYWQgdG8gUzNcclxuICAgIGNvbnN0IHVwbG9hZFBhcmFtcyA9IHtcclxuICAgICAgQnVja2V0OiBCVUNLRVRfTkFNRSxcclxuICAgICAgS2V5OiBzM0tleSxcclxuICAgICAgQm9keTogcmVxLmZpbGUuYnVmZmVyLFxyXG4gICAgICBDb250ZW50VHlwZTogcmVxLmZpbGUubWltZXR5cGUsXHJcbiAgICAgIENhY2hlQ29udHJvbDogXCJwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDBcIiwgLy8gMSB5ZWFyIGNhY2hlIGZvciBjb21pY3NcclxuICAgICAgTWV0YWRhdGE6IHtcclxuICAgICAgICB1c2VySWQsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlIHx8IHJlcS5maWxlLm9yaWdpbmFsbmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJcIixcclxuICAgICAgICBnZW5yZTogZ2VucmUgfHwgXCJjb21pY1wiLFxyXG4gICAgICAgIGF1dGhvcjogYXV0aG9yIHx8IFwidW5rbm93blwiLFxyXG4gICAgICAgIGNvbWljSWQ6IGNvbWljSWQgfHwgXCJcIixcclxuICAgICAgICBpc1B1YmxpYzogaXNQdWJsaWMudG9TdHJpbmcoKSxcclxuICAgICAgICB1cGxvYWREYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlTmFtZTogcmVxLmZpbGUub3JpZ2luYWxuYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBTZXQgcHVibGljIHJlYWQgaWYgZmlsZSBpcyBwdWJsaWNcclxuICAgIGlmIChpc1B1YmxpYyA9PT0gXCJ0cnVlXCIgfHwgaXNQdWJsaWMgPT09IHRydWUpIHtcclxuICAgICAgdXBsb2FkUGFyYW1zW1wiQUNMXCJdID0gXCJwdWJsaWMtcmVhZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFsbGVsVXBsb2FkczMgPSBuZXcgVXBsb2FkKHtcclxuICAgICAgY2xpZW50OiBzM0NsaWVudCxcclxuICAgICAgcGFyYW1zOiB1cGxvYWRQYXJhbXMsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwYXJhbGxlbFVwbG9hZHMzLmRvbmUoKTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBDbG91ZEZyb250IFVSTCAocHJpbWFyeSBhY2Nlc3MgbWV0aG9kKVxyXG4gICAgY29uc3QgY2xvdWRGcm9udFVybCA9IGdldENsb3VkRnJvbnRVcmwoczNLZXkpO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIHNpZ25lZCBVUkwgYXMgZmFsbGJhY2sgKGZvciBwcml2YXRlIGZpbGVzKVxyXG4gICAgbGV0IHNpZ25lZFVybCA9IG51bGw7XHJcbiAgICBpZiAoaXNQdWJsaWMgIT09IFwidHJ1ZVwiICYmIGlzUHVibGljICE9PSB0cnVlKSB7XHJcbiAgICAgIHNpZ25lZFVybCA9IGF3YWl0IGdldFNpZ25lZFVybChcclxuICAgICAgICBzM0NsaWVudCxcclxuICAgICAgICBuZXcgR2V0T2JqZWN0Q29tbWFuZCh7IEJ1Y2tldDogQlVDS0VUX05BTUUsIEtleTogczNLZXkgfSksXHJcbiAgICAgICAgeyBleHBpcmVzSW46IDM2MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogXCJDb21pYyBmaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgczNLZXksXHJcbiAgICAgICAgczNMb2NhdGlvbjogcmVzdWx0LkxvY2F0aW9uLFxyXG4gICAgICAgIGNsb3VkRnJvbnRVcmwsIC8vIFByaW1hcnkgVVJMIGZvciBzZXJ2aW5nIGNvbnRlbnRcclxuICAgICAgICBzaWduZWRVcmwsIC8vIEZhbGxiYWNrIGZvciBwcml2YXRlIGNvbnRlbnRcclxuICAgICAgICBidWNrZXQ6IEJVQ0tFVF9OQU1FLFxyXG4gICAgICAgIGlzUHVibGljOiBpc1B1YmxpYyA9PT0gXCJ0cnVlXCIgfHwgaXNQdWJsaWMgPT09IHRydWUsXHJcbiAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgIGNvbWljSWQ6IGNvbWljSWQgfHwgbnVsbCxcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZSB8fCByZXEuZmlsZS5vcmlnaW5hbG5hbWUsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJcIixcclxuICAgICAgICAgIGdlbnJlOiBnZW5yZSB8fCBcImNvbWljXCIsXHJcbiAgICAgICAgICBhdXRob3I6IGF1dGhvciB8fCBcInVua25vd25cIixcclxuICAgICAgICAgIGZpbGVTaXplOiByZXEuZmlsZS5zaXplLFxyXG4gICAgICAgICAgbWltZVR5cGU6IHJlcS5maWxlLm1pbWV0eXBlLFxyXG4gICAgICAgICAgb3JpZ2luYWxOYW1lOiByZXEuZmlsZS5vcmlnaW5hbG5hbWUsXHJcbiAgICAgICAgICB1cGxvYWREYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiVXBsb2FkIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIGVycm9yOiBcIkZhaWxlZCB0byB1cGxvYWQgY29taWMgZmlsZVwiLFxyXG4gICAgICBkZXRhaWxzOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiVW5rbm93biBlcnJvclwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gVXBsb2FkIG11bHRpcGxlIGNvbWljIGZpbGVzIHRvIFMzXHJcbmV4cG9ydCBjb25zdCB1cGxvYWRNdWx0aXBsZUNvbWljRmlsZXMgPSBhc3luYyAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICghcmVxLmZpbGVzIHx8ICFBcnJheS5pc0FycmF5KHJlcS5maWxlcykgfHwgcmVxLmZpbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJObyBmaWxlcyB1cGxvYWRlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgdXNlcklkLFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGdlbnJlLFxyXG4gICAgICBhdXRob3IsXHJcbiAgICAgIGNvbWljSWQsXHJcbiAgICAgIGlzUHVibGljID0gZmFsc2UsXHJcbiAgICB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiVXNlciBJRCBpcyByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwbG9hZFByb21pc2VzID0gcmVxLmZpbGVzLm1hcChhc3luYyAoZmlsZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgczNLZXkgPSBnZW5lcmF0ZVMzS2V5KHVzZXJJZCwgZmlsZS5vcmlnaW5hbG5hbWUsIGNvbWljSWQpO1xyXG5cclxuICAgICAgY29uc3QgdXBsb2FkUGFyYW1zID0ge1xyXG4gICAgICAgIEJ1Y2tldDogQlVDS0VUX05BTUUsXHJcbiAgICAgICAgS2V5OiBzM0tleSxcclxuICAgICAgICBCb2R5OiBmaWxlLmJ1ZmZlcixcclxuICAgICAgICBDb250ZW50VHlwZTogZmlsZS5taW1ldHlwZSxcclxuICAgICAgICBDYWNoZUNvbnRyb2w6IFwicHVibGljLCBtYXgtYWdlPTMxNTM2MDAwXCIsXHJcbiAgICAgICAgTWV0YWRhdGE6IHtcclxuICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZSB8fCBgJHtmaWxlLm9yaWdpbmFsbmFtZX0gKCR7aW5kZXggKyAxfSlgLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IFwiXCIsXHJcbiAgICAgICAgICBnZW5yZTogZ2VucmUgfHwgXCJjb21pY1wiLFxyXG4gICAgICAgICAgYXV0aG9yOiBhdXRob3IgfHwgXCJ1bmtub3duXCIsXHJcbiAgICAgICAgICBjb21pY0lkOiBjb21pY0lkIHx8IFwiXCIsXHJcbiAgICAgICAgICBpc1B1YmxpYzogaXNQdWJsaWMudG9TdHJpbmcoKSxcclxuICAgICAgICAgIHVwbG9hZERhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgIG9yaWdpbmFsRmlsZU5hbWU6IGZpbGUub3JpZ2luYWxuYW1lLFxyXG4gICAgICAgICAgZmlsZUluZGV4OiAoaW5kZXggKyAxKS50b1N0cmluZygpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoaXNQdWJsaWMgPT09IFwidHJ1ZVwiIHx8IGlzUHVibGljID09PSB0cnVlKSB7XHJcbiAgICAgICAgdXBsb2FkUGFyYW1zW1wiQUNMXCJdID0gXCJwdWJsaWMtcmVhZFwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXJhbGxlbFVwbG9hZHMzID0gbmV3IFVwbG9hZCh7XHJcbiAgICAgICAgY2xpZW50OiBzM0NsaWVudCxcclxuICAgICAgICBwYXJhbXM6IHVwbG9hZFBhcmFtcyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwYXJhbGxlbFVwbG9hZHMzLmRvbmUoKTtcclxuXHJcbiAgICAgIC8vIEdlbmVyYXRlIENsb3VkRnJvbnQgVVJMXHJcbiAgICAgIGNvbnN0IGNsb3VkRnJvbnRVcmwgPSBnZXRDbG91ZEZyb250VXJsKHMzS2V5KTtcclxuXHJcbiAgICAgIC8vIEdlbmVyYXRlIHNpZ25lZCBVUkwgZm9yIHByaXZhdGUgZmlsZXNcclxuICAgICAgbGV0IHNpZ25lZFVybCA9IG51bGw7XHJcbiAgICAgIGlmIChpc1B1YmxpYyAhPT0gXCJ0cnVlXCIgJiYgaXNQdWJsaWMgIT09IHRydWUpIHtcclxuICAgICAgICBzaWduZWRVcmwgPSBhd2FpdCBnZXRTaWduZWRVcmwoXHJcbiAgICAgICAgICBzM0NsaWVudCxcclxuICAgICAgICAgIG5ldyBHZXRPYmplY3RDb21tYW5kKHsgQnVja2V0OiBCVUNLRVRfTkFNRSwgS2V5OiBzM0tleSB9KSxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAzNjAwIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHMzS2V5LFxyXG4gICAgICAgIHMzTG9jYXRpb246IHJlc3VsdC5Mb2NhdGlvbixcclxuICAgICAgICBjbG91ZEZyb250VXJsLFxyXG4gICAgICAgIHNpZ25lZFVybCxcclxuICAgICAgICBvcmlnaW5hbE5hbWU6IGZpbGUub3JpZ2luYWxuYW1lLFxyXG4gICAgICAgIGZpbGVTaXplOiBmaWxlLnNpemUsXHJcbiAgICAgICAgbWltZVR5cGU6IGZpbGUubWltZXR5cGUsXHJcbiAgICAgICAgZmlsZUluZGV4OiBpbmRleCArIDEsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB1cGxvYWRSZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwodXBsb2FkUHJvbWlzZXMpO1xyXG5cclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogYCR7dXBsb2FkUmVzdWx0cy5sZW5ndGh9IGNvbWljIGZpbGVzIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseWAsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBmaWxlczogdXBsb2FkUmVzdWx0cyxcclxuICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgdXNlcklkLFxyXG4gICAgICAgICAgY29taWNJZDogY29taWNJZCB8fCBudWxsLFxyXG4gICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICAgIGdlbnJlLFxyXG4gICAgICAgICAgYXV0aG9yLFxyXG4gICAgICAgICAgdG90YWxGaWxlczogdXBsb2FkUmVzdWx0cy5sZW5ndGgsXHJcbiAgICAgICAgICBpc1B1YmxpYzogaXNQdWJsaWMgPT09IFwidHJ1ZVwiIHx8IGlzUHVibGljID09PSB0cnVlLFxyXG4gICAgICAgICAgdXBsb2FkRGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIk11bHRpcGxlIHVwbG9hZCBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBlcnJvcjogXCJGYWlsZWQgdG8gdXBsb2FkIGNvbWljIGZpbGVzXCIsXHJcbiAgICAgIGRldGFpbHM6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIGVycm9yXCIsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgY29taWMgZmlsZSBVUkwgKENsb3VkRnJvbnQgcHJlZmVycmVkLCBzaWduZWQgVVJMIGFzIGZhbGxiYWNrKVxyXG5leHBvcnQgY29uc3QgZ2V0Q29taWNGaWxlID0gYXN5bmMgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHMzS2V5IH0gPSByZXEucGFyYW1zO1xyXG4gICAgY29uc3QgeyBzaWduZWQgPSBcImZhbHNlXCIgfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgICBpZiAoIXMzS2V5KSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlMzIGtleSBpcyByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGZpbGUgZXhpc3RzIGluIFMzXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBzM0NsaWVudC5zZW5kKFxyXG4gICAgICAgIG5ldyBHZXRPYmplY3RDb21tYW5kKHsgQnVja2V0OiBCVUNLRVRfTkFNRSwgS2V5OiBzM0tleSB9KVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiRmlsZSBub3QgZm91bmRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBbHdheXMgcHJvdmlkZSBDbG91ZEZyb250IFVSTCBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXHJcbiAgICBjb25zdCBjbG91ZEZyb250VXJsID0gZ2V0Q2xvdWRGcm9udFVybChzM0tleSk7XHJcblxyXG4gICAgbGV0IHNpZ25lZFVybCA9IG51bGw7XHJcblxyXG4gICAgLy8gR2VuZXJhdGUgc2lnbmVkIFVSTCBpZiByZXF1ZXN0ZWQgb3IgZm9yIHByaXZhdGUgZmlsZXNcclxuICAgIGlmIChzaWduZWQgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgIGNvbnN0IGV4cGlyZXNJbiA9IHBhcnNlSW50KHJlcS5xdWVyeS5leHBpcmVzSW4gYXMgc3RyaW5nKSB8fCAzNjAwO1xyXG4gICAgICBzaWduZWRVcmwgPSBhd2FpdCBnZXRTaWduZWRVcmwoXHJcbiAgICAgICAgczNDbGllbnQsXHJcbiAgICAgICAgbmV3IEdldE9iamVjdENvbW1hbmQoeyBCdWNrZXQ6IEJVQ0tFVF9OQU1FLCBLZXk6IHMzS2V5IH0pLFxyXG4gICAgICAgIHsgZXhwaXJlc0luIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzM0tleSxcclxuICAgICAgICBjbG91ZEZyb250VXJsLCAvLyBQcmltYXJ5IFVSTCAtIGZhc3Rlc3QgZGVsaXZlcnlcclxuICAgICAgICBzaWduZWRVcmwsIC8vIEZhbGxiYWNrIFVSTCB3aXRoIGFjY2VzcyBjb250cm9sXHJcbiAgICAgICAgY2RuRG9tYWluOiBDTE9VREZST05UX0RPTUFJTixcclxuICAgICAgICByZWNvbW1lbmRhdGlvbjpcclxuICAgICAgICAgIFwiVXNlIGNsb3VkRnJvbnRVcmwgZm9yIHB1YmxpYyBjb250ZW50LCBzaWduZWRVcmwgZm9yIHByaXZhdGUgY29udGVudFwiLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJHZXQgZmlsZSBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBlcnJvcjogXCJGYWlsZWQgdG8gZ2V0IGNvbWljIGZpbGVcIixcclxuICAgICAgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIixcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFVwZGF0ZSBjb21pYyBmaWxlIGluIFMzXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVDb21pY0ZpbGUgPSBhc3luYyAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICghcmVxLmZpbGUpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiTm8gZmlsZSB1cGxvYWRlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgczNLZXkgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZ2VucmUsIGF1dGhvciwgaXNQdWJsaWMgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIGlmICghczNLZXkpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiUzMga2V5IGlzIHJlcXVpcmVkXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgZmlsZSBleGlzdHNcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHMzQ2xpZW50LnNlbmQoXHJcbiAgICAgICAgbmV3IEdldE9iamVjdENvbW1hbmQoeyBCdWNrZXQ6IEJVQ0tFVF9OQU1FLCBLZXk6IHMzS2V5IH0pXHJcbiAgICAgICk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogXCJPcmlnaW5hbCBmaWxlIG5vdCBmb3VuZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSB0aGUgZmlsZSBpbiBTMyAocmVwbGFjZXMgZXhpc3RpbmcgZmlsZSlcclxuICAgIGNvbnN0IHVwbG9hZFBhcmFtcyA9IHtcclxuICAgICAgQnVja2V0OiBCVUNLRVRfTkFNRSxcclxuICAgICAgS2V5OiBzM0tleSxcclxuICAgICAgQm9keTogcmVxLmZpbGUuYnVmZmVyLFxyXG4gICAgICBDb250ZW50VHlwZTogcmVxLmZpbGUubWltZXR5cGUsXHJcbiAgICAgIENhY2hlQ29udHJvbDogXCJwdWJsaWMsIG1heC1hZ2U9MzE1MzYwMDBcIixcclxuICAgICAgTWV0YWRhdGE6IHtcclxuICAgICAgICB0aXRsZTogdGl0bGUgfHwgcmVxLmZpbGUub3JpZ2luYWxuYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBcIlwiLFxyXG4gICAgICAgIGdlbnJlOiBnZW5yZSB8fCBcImNvbWljXCIsXHJcbiAgICAgICAgYXV0aG9yOiBhdXRob3IgfHwgXCJ1bmtub3duXCIsXHJcbiAgICAgICAgaXNQdWJsaWM6IGlzUHVibGljPy50b1N0cmluZygpIHx8IFwiZmFsc2VcIixcclxuICAgICAgICBsYXN0VXBkYXRlZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZU5hbWU6IHJlcS5maWxlLm9yaWdpbmFsbmFtZSxcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGlzUHVibGljID09PSBcInRydWVcIiB8fCBpc1B1YmxpYyA9PT0gdHJ1ZSkge1xyXG4gICAgICB1cGxvYWRQYXJhbXNbXCJBQ0xcIl0gPSBcInB1YmxpYy1yZWFkXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYWxsZWxVcGxvYWRzMyA9IG5ldyBVcGxvYWQoe1xyXG4gICAgICBjbGllbnQ6IHMzQ2xpZW50LFxyXG4gICAgICBwYXJhbXM6IHVwbG9hZFBhcmFtcyxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhcmFsbGVsVXBsb2FkczMuZG9uZSgpO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIGNhY2hlLWJ1c3RpbmcgQ2xvdWRGcm9udCBVUkwgZm9yIHVwZGF0ZWQgY29udGVudFxyXG4gICAgY29uc3QgY2xvdWRGcm9udFVybCA9IGdldENsb3VkRnJvbnRVcmxXaXRoQ2FjaGVCdXN0aW5nKHMzS2V5KTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBuZXcgc2lnbmVkIFVSTFxyXG4gICAgY29uc3Qgc2lnbmVkVXJsID0gYXdhaXQgZ2V0U2lnbmVkVXJsKFxyXG4gICAgICBzM0NsaWVudCxcclxuICAgICAgbmV3IEdldE9iamVjdENvbW1hbmQoeyBCdWNrZXQ6IEJVQ0tFVF9OQU1FLCBLZXk6IHMzS2V5IH0pLFxyXG4gICAgICB7IGV4cGlyZXNJbjogMzYwMCB9XHJcbiAgICApO1xyXG5cclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogXCJDb21pYyBmaWxlIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzM0tleSxcclxuICAgICAgICBzM0xvY2F0aW9uOiByZXN1bHQuTG9jYXRpb24sXHJcbiAgICAgICAgY2xvdWRGcm9udFVybCwgLy8gQ2FjaGUtYnVzdGluZyBVUkwgZm9yIGltbWVkaWF0ZSBhY2Nlc3NcclxuICAgICAgICBzaWduZWRVcmwsXHJcbiAgICAgICAgaXNQdWJsaWM6IGlzUHVibGljID09PSBcInRydWVcIiB8fCBpc1B1YmxpYyA9PT0gdHJ1ZSxcclxuICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlIHx8IHJlcS5maWxlLm9yaWdpbmFsbmFtZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBcIlwiLFxyXG4gICAgICAgICAgZ2VucmU6IGdlbnJlIHx8IFwiY29taWNcIixcclxuICAgICAgICAgIGF1dGhvcjogYXV0aG9yIHx8IFwidW5rbm93blwiLFxyXG4gICAgICAgICAgZmlsZVNpemU6IHJlcS5maWxlLnNpemUsXHJcbiAgICAgICAgICBtaW1lVHlwZTogcmVxLmZpbGUubWltZXR5cGUsXHJcbiAgICAgICAgICBvcmlnaW5hbE5hbWU6IHJlcS5maWxlLm9yaWdpbmFsbmFtZSxcclxuICAgICAgICAgIGxhc3RVcGRhdGVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBub3RlOiBcIkNsb3VkRnJvbnQgY2FjaGUgbWF5IHRha2UgNS0xNSBtaW51dGVzIHRvIHVwZGF0ZSBnbG9iYWxseVwiLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJVcGRhdGUgZmlsZSBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBlcnJvcjogXCJGYWlsZWQgdG8gdXBkYXRlIGNvbWljIGZpbGVcIixcclxuICAgICAgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIixcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIERlbGV0ZSBjb21pYyBmaWxlIGZyb20gUzNcclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNvbWljRmlsZSA9IGFzeW5jIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBzM0tleSB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICBpZiAoIXMzS2V5KSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIlMzIGtleSBpcyByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGZpbGUgZXhpc3RzIGJlZm9yZSBkZWxldGlvblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgczNDbGllbnQuc2VuZChcclxuICAgICAgICBuZXcgR2V0T2JqZWN0Q29tbWFuZCh7IEJ1Y2tldDogQlVDS0VUX05BTUUsIEtleTogczNLZXkgfSlcclxuICAgICAgKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIkZpbGUgbm90IGZvdW5kXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsZXRlUGFyYW1zID0ge1xyXG4gICAgICBCdWNrZXQ6IEJVQ0tFVF9OQU1FLFxyXG4gICAgICBLZXk6IHMzS2V5LFxyXG4gICAgfTtcclxuXHJcbiAgICBhd2FpdCBzM0NsaWVudC5zZW5kKG5ldyBEZWxldGVPYmplY3RDb21tYW5kKGRlbGV0ZVBhcmFtcykpO1xyXG5cclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgbWVzc2FnZTogXCJDb21pYyBmaWxlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBzM0tleSxcclxuICAgICAgICBkZWxldGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICBub3RlOiBcIkNsb3VkRnJvbnQgY2FjaGUgd2lsbCBleHBpcmUgbmF0dXJhbGx5IChtYXkgdGFrZSAyNCBob3VycyBmb3IgY29tcGxldGUgcmVtb3ZhbClcIixcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRGVsZXRlIGZpbGUgZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGRlbGV0ZSBjb21pYyBmaWxlXCIsXHJcbiAgICAgIGRldGFpbHM6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIGVycm9yXCIsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBMaXN0IHVzZXIncyBjb21pYyBmaWxlcyB3aXRoIENsb3VkRnJvbnQgVVJMc1xyXG5leHBvcnQgY29uc3QgbGlzdFVzZXJDb21pY0ZpbGVzID0gYXN5bmMgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGNvbnN0IHsgY29taWNJZCwgbGltaXQgPSBcIjEwMFwiIH0gPSByZXEucXVlcnk7XHJcblxyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiVXNlciBJRCBpcyByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJ1aWxkIHByZWZpeCBiYXNlZCBvbiBwYXJhbWV0ZXJzXHJcbiAgICBsZXQgcHJlZml4ID0gYGNvbWljcy8ke3VzZXJJZH0vYDtcclxuICAgIGlmIChjb21pY0lkKSB7XHJcbiAgICAgIHByZWZpeCArPSBgJHtjb21pY0lkfS9gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxpc3RQYXJhbXMgPSB7XHJcbiAgICAgIEJ1Y2tldDogQlVDS0VUX05BTUUsXHJcbiAgICAgIFByZWZpeDogcHJlZml4LFxyXG4gICAgICBNYXhLZXlzOiBNYXRoLm1pbihwYXJzZUludChsaW1pdCBhcyBzdHJpbmcpLCAxMDAwKSwgLy8gQ2FwIGF0IDEwMDBcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY29tbWFuZCA9IG5ldyBMaXN0T2JqZWN0c1YyQ29tbWFuZChsaXN0UGFyYW1zKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgczNDbGllbnQuc2VuZChjb21tYW5kKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlLkNvbnRlbnRzIHx8IHJlc3BvbnNlLkNvbnRlbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gcmVzLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgZmlsZXM6IFtdLFxyXG4gICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgICB1c2VySWQsXHJcbiAgICAgICAgICBjb21pY0lkOiBjb21pY0lkIHx8IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2VuZXJhdGUgQ2xvdWRGcm9udCBVUkxzIGFuZCBzaWduZWQgVVJMcyBmb3IgZWFjaCBmaWxlXHJcbiAgICBjb25zdCBmaWxlc1dpdGhVcmxzID0gYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICAgIHJlc3BvbnNlLkNvbnRlbnRzLm1hcChhc3luYyAob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCFvYmplY3QuS2V5KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvdWRGcm9udFVybCA9IGdldENsb3VkRnJvbnRVcmwob2JqZWN0LktleSk7XHJcblxyXG4gICAgICAgIC8vIEdldCBtZXRhZGF0YSB0byBkZXRlcm1pbmUgaWYgcHVibGljXHJcbiAgICAgICAgbGV0IGlzUHVibGljID0gZmFsc2U7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGhlYWRSZXN1bHQgPSBhd2FpdCBzM0NsaWVudC5zZW5kKFxyXG4gICAgICAgICAgICBuZXcgR2V0T2JqZWN0Q29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgQnVja2V0OiBCVUNLRVRfTkFNRSxcclxuICAgICAgICAgICAgICBLZXk6IG9iamVjdC5LZXksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaXNQdWJsaWMgPSBoZWFkUmVzdWx0Lk1ldGFkYXRhPy5pc1B1YmxpYyA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGdldCBtZXRhZGF0YSBmb3IgJHtvYmplY3QuS2V5fWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgc2lnbmVkIFVSTCBmb3IgcHJpdmF0ZSBmaWxlc1xyXG4gICAgICAgIGxldCBzaWduZWRVcmwgPSBudWxsO1xyXG4gICAgICAgIGlmICghaXNQdWJsaWMpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNpZ25lZFVybCA9IGF3YWl0IGdldFNpZ25lZFVybChcclxuICAgICAgICAgICAgICBzM0NsaWVudCxcclxuICAgICAgICAgICAgICBuZXcgR2V0T2JqZWN0Q29tbWFuZCh7IEJ1Y2tldDogQlVDS0VUX05BTUUsIEtleTogb2JqZWN0LktleSB9KSxcclxuICAgICAgICAgICAgICB7IGV4cGlyZXNJbjogMzYwMCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBnZW5lcmF0ZSBzaWduZWQgVVJMIGZvciAke29iamVjdC5LZXl9YCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgczNLZXk6IG9iamVjdC5LZXksXHJcbiAgICAgICAgICBjbG91ZEZyb250VXJsLFxyXG4gICAgICAgICAgc2lnbmVkVXJsLFxyXG4gICAgICAgICAgbGFzdE1vZGlmaWVkOiBvYmplY3QuTGFzdE1vZGlmaWVkLFxyXG4gICAgICAgICAgc2l6ZTogb2JqZWN0LlNpemUsXHJcbiAgICAgICAgICBpc1B1YmxpYyxcclxuICAgICAgICAgIGZpbGVOYW1lOiBvYmplY3QuS2V5LnNwbGl0KFwiL1wiKS5wb3AoKSwgLy8gRXh0cmFjdCBmaWxlbmFtZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEZpbHRlciBvdXQgYW55IG51bGwgZW50cmllc1xyXG4gICAgY29uc3QgdmFsaWRGaWxlcyA9IGZpbGVzV2l0aFVybHMuZmlsdGVyKChmaWxlKSA9PiBmaWxlICE9PSBudWxsKTtcclxuXHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBmaWxlczogdmFsaWRGaWxlcyxcclxuICAgICAgICBjb3VudDogdmFsaWRGaWxlcy5sZW5ndGgsXHJcbiAgICAgICAgdXNlcklkLFxyXG4gICAgICAgIGNvbWljSWQ6IGNvbWljSWQgfHwgbnVsbCxcclxuICAgICAgICBjZG5Eb21haW46IENMT1VERlJPTlRfRE9NQUlOLFxyXG4gICAgICAgIG5vdGU6IFwiVXNlIGNsb3VkRnJvbnRVcmwgZm9yIHB1YmxpYyBmaWxlcywgc2lnbmVkVXJsIGZvciBwcml2YXRlIGZpbGVzXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkxpc3QgZmlsZXMgZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGxpc3QgY29taWMgZmlsZXNcIixcclxuICAgICAgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIixcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEdldCBmaWxlIG1ldGFkYXRhIGFuZCBVUkxzXHJcbmV4cG9ydCBjb25zdCBnZXRDb21pY0ZpbGVJbmZvID0gYXN5bmMgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHMzS2V5IH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgIGlmICghczNLZXkpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiUzMga2V5IGlzIHJlcXVpcmVkXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGZpbGUgbWV0YWRhdGFcclxuICAgIGNvbnN0IGhlYWRDb21tYW5kID0gbmV3IEdldE9iamVjdENvbW1hbmQoe1xyXG4gICAgICBCdWNrZXQ6IEJVQ0tFVF9OQU1FLFxyXG4gICAgICBLZXk6IHMzS2V5LFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBoZWFkUmVzdWx0ID0gYXdhaXQgczNDbGllbnQuc2VuZChoZWFkQ29tbWFuZCk7XHJcblxyXG4gICAgY29uc3QgaXNQdWJsaWMgPSBoZWFkUmVzdWx0Lk1ldGFkYXRhPy5pc1B1YmxpYyA9PT0gXCJ0cnVlXCI7XHJcbiAgICBjb25zdCBjbG91ZEZyb250VXJsID0gZ2V0Q2xvdWRGcm9udFVybChzM0tleSk7XHJcblxyXG4gICAgbGV0IHNpZ25lZFVybCA9IG51bGw7XHJcbiAgICBpZiAoIWlzUHVibGljKSB7XHJcbiAgICAgIHNpZ25lZFVybCA9IGF3YWl0IGdldFNpZ25lZFVybChzM0NsaWVudCwgaGVhZENvbW1hbmQsIHtcclxuICAgICAgICBleHBpcmVzSW46IDM2MDAsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHMzS2V5LFxyXG4gICAgICAgIGNsb3VkRnJvbnRVcmwsXHJcbiAgICAgICAgc2lnbmVkVXJsLFxyXG4gICAgICAgIGlzUHVibGljLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICBjb250ZW50VHlwZTogaGVhZFJlc3VsdC5Db250ZW50VHlwZSxcclxuICAgICAgICAgIGNvbnRlbnRMZW5ndGg6IGhlYWRSZXN1bHQuQ29udGVudExlbmd0aCxcclxuICAgICAgICAgIGxhc3RNb2RpZmllZDogaGVhZFJlc3VsdC5MYXN0TW9kaWZpZWQsXHJcbiAgICAgICAgICBjYWNoZUNvbnRyb2w6IGhlYWRSZXN1bHQuQ2FjaGVDb250cm9sLFxyXG4gICAgICAgICAgLi4uaGVhZFJlc3VsdC5NZXRhZGF0YSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNkbkRvbWFpbjogQ0xPVURGUk9OVF9ET01BSU4sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkdldCBmaWxlIGluZm8gZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm5hbWUgPT09IFwiTm9TdWNoS2V5XCIpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiRmlsZSBub3QgZm91bmRcIiB9KTtcclxuICAgIH1cclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBmaWxlIGluZm9cIixcclxuICAgICAgZGV0YWlsczogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIixcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGxvYWRUb1MzID0gYXN5bmMgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoIXJlcS5maWxlKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6IFwiTm8gZmlsZSB1cGxvYWRlZFwiLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaWxlID0gcmVxLmZpbGU7XHJcbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKGZpbGUub3JpZ2luYWxuYW1lKTtcclxuICAgIGNvbnN0IGtleSA9IGBtZWRpYS8ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKVxyXG4gICAgICAudG9TdHJpbmcoMzYpXHJcbiAgICAgIC5zdWJzdHJpbmcoNyl9JHtmaWxlRXh0ZW5zaW9ufWA7XHJcblxyXG4gICAgLy8gVXBsb2FkIHdpdGhvdXQgQUNMXHJcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IFB1dE9iamVjdENvbW1hbmQoe1xyXG4gICAgICBCdWNrZXQ6IHByb2Nlc3MuZW52LlMzX0JVQ0tFVF9OQU1FISxcclxuICAgICAgS2V5OiBrZXksXHJcbiAgICAgIEJvZHk6IGZpbGUuYnVmZmVyLFxyXG4gICAgICBDb250ZW50VHlwZTogZmlsZS5taW1ldHlwZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IHMzQ2xpZW50LnNlbmQoY29tbWFuZCk7XHJcblxyXG4gICAgLy8gQnVpbGQgQ2xvdWRGcm9udCBvciBmYWxsYmFjayBTMyBVUkxcclxuICAgIGNvbnN0IHB1YmxpY1VybCA9IHByb2Nlc3MuZW52LkNMT1VERlJPTlRfRE9NQUlOXHJcbiAgICAgID8gYCR7cHJvY2Vzcy5lbnYuQ0xPVURGUk9OVF9ET01BSU59LyR7a2V5fWBcclxuICAgICAgOiBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlMzX0JVQ0tFVF9OQU1FfS5zMy4ke3Byb2Nlc3MuZW52LkFXU19SRUdJT059LmFtYXpvbmF3cy5jb20vJHtrZXl9YDtcclxuXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICB1cmw6IHB1YmxpY1VybCxcclxuICAgICAgbWVzc2FnZTogXCJGaWxlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJVcGxvYWQgZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIixcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuIl19