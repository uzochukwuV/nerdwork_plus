import { Router } from "express";
import { 
  uploadToS3,
  uploadForNFT,
  getPresignedUploadUrl,
  getUserFiles,
  getFile,
  deleteFile,
  upload
} from "../controller/file.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// File upload routes (require authentication)
router.post("/upload/s3", authenticate, upload.single('file'), uploadToS3);
router.post("/upload/nft", authenticate, upload.single('file'), uploadForNFT);
router.post("/presigned-url", authenticate, getPresignedUploadUrl);

// File management routes
router.get("/", authenticate, getUserFiles);
router.get("/:id", getFile); // Public access with permission check
router.delete("/:id", authenticate, deleteFile);

export default router;