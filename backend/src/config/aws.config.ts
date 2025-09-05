import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// AWS S3 Configuration
export const AWS_CONFIG = {
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

export const S3_CONFIG = {
  bucketName: process.env.S3_BUCKET_NAME || "nerdwork-comics",
  region: process.env.AWS_REGION || "us-east-1",
};

// Validate required environment variables
const requiredEnvVars = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
];

export const validateAWSConfig = () => {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required AWS environment variables: ${missing.join(", ")}\n` +
      "Please ensure these are set in your .env.local file:\n" +
      "- AWS_ACCESS_KEY_ID\n" +
      "- AWS_SECRET_ACCESS_KEY\n" +
      "- AWS_REGION (optional, defaults to us-east-1)\n" +
      "- S3_BUCKET_NAME (optional, defaults to nerdwork-comics)"
    );
  }
};