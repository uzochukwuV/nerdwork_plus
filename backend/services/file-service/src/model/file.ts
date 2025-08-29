import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  json
} from 'drizzle-orm/pg-core';

// Import auth users from shared model (assuming it exists)
// For now, we'll create a local reference
export const authUsers = pgTable('auth_users', {
  id: uuid('id').primaryKey(),
});

export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimetype: text('mimetype').notNull(),
  size: integer('size').notNull(),
  
  // AWS S3 storage
  s3Key: text('s3_key'),
  s3Bucket: text('s3_bucket'),
  s3Url: text('s3_url'),
  cdnUrl: text('cdn_url'),
  
  // IPFS storage (optional)
  ipfsHash: text('ipfs_hash'),
  ipfsUrl: text('ipfs_url'),
  isPinnedToIPFS: boolean('is_pinned_to_ipfs').default(false),
  
  // File classification
  category: text('category').notNull(), // 'comic-page', 'comic-cover', 'avatar', 'nft-asset', etc.
  purpose: text('purpose').notNull(), // 'storage', 'nft-minting', 'public', 'private'
  
  // Associated references
  comicId: uuid('comic_id'), // Reference to comic if this is a comic asset
  referenceId: text('reference_id'), // Generic reference for other entities
  referenceType: text('reference_type'), // Type of entity this file belongs to
  
  // File status and access
  isPublic: boolean('is_public').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  
  // Metadata
  metadata: json('metadata'), // Additional file metadata, EXIF data, etc.
  uploadSource: text('upload_source').notNull().default('web'), // 'web', 'mobile', 'admin'
  
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const fileProcessingJobs = pgTable('file_processing_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileId: uuid('file_id')
    .notNull()
    .references(() => files.id, { onDelete: 'cascade' }),
  jobType: text('job_type').notNull(), // 'thumbnail', 'compression', 'ipfs-pin', 'virus-scan'
  status: text('status').notNull().default('pending'), // 'pending', 'processing', 'completed', 'failed'
  processingData: json('processing_data'), // Job-specific data
  resultData: json('result_data'), // Job result data
  errorMessage: text('error_message'),
  
  startedAt: timestamp('started_at', { mode: 'date' }),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
});

export type InsertFile = typeof files.$inferInsert;
export type SelectFile = typeof files.$inferSelect;

export type InsertFileProcessingJob = typeof fileProcessingJobs.$inferInsert;
export type SelectFileProcessingJob = typeof fileProcessingJobs.$inferSelect;