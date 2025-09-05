import { Router } from "express";
import {
  uploadComicFile,
  uploadMultipleComicFiles,
  getComicFile,
  updateComicFile,
  deleteComicFile,
  listUserComicFiles,
  getComicFileInfo,
  upload,
} from "../controller/file.controller";

const router = Router();

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a single comic file to S3
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         type: file
 *         required: true
 *         description: Comic file to upload
 *       - name: userId
 *         in: formData
 *         type: string
 *         required: true
 *         description: User ID
 *       - name: title
 *         in: formData
 *         type: string
 *         description: Comic title
 *       - name: description
 *         in: formData
 *         type: string
 *         description: Comic description
 *       - name: genre
 *         in: formData
 *         type: string
 *         description: Comic genre
 *       - name: author
 *         in: formData
 *         type: string
 *         description: Comic author
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/upload", upload.single("file"), uploadComicFile);

/**
 * @swagger
 * /api/files/upload-multiple:
 *   post:
 *     summary: Upload multiple comic files to S3
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: files
 *         in: formData
 *         type: file
 *         required: true
 *         description: Multiple comic files to upload
 *       - name: userId
 *         in: formData
 *         type: string
 *         required: true
 *         description: User ID
 *       - name: title
 *         in: formData
 *         type: string
 *         description: Comic series title
 *       - name: description
 *         in: formData
 *         type: string
 *         description: Comic series description
 *       - name: genre
 *         in: formData
 *         type: string
 *         description: Comic genre
 *       - name: author
 *         in: formData
 *         type: string
 *         description: Comic author
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/upload-multiple", upload.array("files", 10), uploadMultipleComicFiles);

/**
 * @swagger
 * /api/files/{s3Key}:
 *   get:
 *     summary: Get comic file URLs (CloudFront URL and/or signed URL)
 *     tags: [Files]
 *     parameters:
 *       - name: s3Key
 *         in: path
 *         required: true
 *         type: string
 *         description: S3 key of the file
 *       - name: signed
 *         in: query
 *         type: string
 *         enum: ["true", "false"]
 *         description: Whether to generate signed URL (default false)
 *       - name: expiresIn
 *         in: query
 *         type: integer
 *         description: URL expiration time in seconds (default 3600)
 *     responses:
 *       200:
 *         description: CloudFront and/or signed URL generated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get("/:s3Key", getComicFile);

/**
 * @swagger
 * /api/files/{s3Key}:
 *   put:
 *     summary: Update a comic file in S3
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: s3Key
 *         in: path
 *         required: true
 *         type: string
 *         description: S3 key of the file to update
 *       - name: file
 *         in: formData
 *         type: file
 *         required: true
 *         description: New comic file
 *       - name: title
 *         in: formData
 *         type: string
 *         description: Updated comic title
 *       - name: description
 *         in: formData
 *         type: string
 *         description: Updated comic description
 *       - name: genre
 *         in: formData
 *         type: string
 *         description: Updated comic genre
 *       - name: author
 *         in: formData
 *         type: string
 *         description: Updated comic author
 *     responses:
 *       200:
 *         description: File updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put("/:s3Key", upload.single("file"), updateComicFile);

/**
 * @swagger
 * /api/files/{s3Key}:
 *   delete:
 *     summary: Delete a comic file from S3
 *     tags: [Files]
 *     parameters:
 *       - name: s3Key
 *         in: path
 *         required: true
 *         type: string
 *         description: S3 key of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.delete("/:s3Key", deleteComicFile);

/**
 * @swagger
 * /api/files/user/{userId}:
 *   get:
 *     summary: List all comic files for a specific user
 *     tags: [Files]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User files listed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get("/user/:userId", listUserComicFiles);

/**
 * @swagger
 * /api/files/info/{s3Key}:
 *   get:
 *     summary: Get detailed file information and metadata
 *     tags: [Files]
 *     parameters:
 *       - name: s3Key
 *         in: path
 *         required: true
 *         type: string
 *         description: S3 key of the file
 *     responses:
 *       200:
 *         description: File information retrieved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get("/info/:s3Key", getComicFileInfo);

/**
 * @swagger
 * /api/files/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "File service is running with CloudFront CDN",
    timestamp: new Date().toISOString(),
    configuration: {
      bucket: process.env.S3_BUCKET_NAME || "nerdwork-comics",
      region: process.env.AWS_REGION || "us-east-1",
      cloudFrontDomain: process.env.CLOUDFRONT_DOMAIN || "dgumbu3t6hn53.cloudfront.net",
      cloudFrontUrl: process.env.CLOUDFRONT_DOMAIN 
        ? `https://${process.env.CLOUDFRONT_DOMAIN}` 
        : "https://dgumbu3t6hn53.cloudfront.net",
      maxFileSize: process.env.MAX_FILE_SIZE || "104857600",
      maxFilesPerUpload: process.env.MAX_FILES_PER_UPLOAD || "20"
    }
  });
});

export default router;