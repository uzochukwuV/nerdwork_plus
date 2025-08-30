import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  json
} from 'drizzle-orm/pg-core';
import { authUsers } from './auth.js';

export const comics = pgTable('comics', {
  id: uuid('id').primaryKey().defaultRandom(),
  creatorId: uuid('creator_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }), // Who created this comic
  title: text('title').notNull(),
  description: text('description'),
  author: text('author').notNull(), // Can be different from creator (for collaborations)
  artist: text('artist'),
  publisher: text('publisher'),
  genre: text('genre').notNull(),
  coverUrl: text('cover_url'),
  coverFileId: uuid('cover_file_id'), // Reference to file service
  totalPages: integer('total_pages').notNull().default(0),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0.00'),
  isFreemium: boolean('is_freemium').notNull().default(false),
  freePageCount: integer('free_page_count').notNull().default(0),
  
  // Publishing status
  status: text('status').notNull().default('draft'), // 'draft', 'published', 'archived'
  publishedAt: timestamp('published_at', { mode: 'date' }),
  isActive: boolean('is_active').notNull().default(true),
  
  // NFT and Web3 integration
  isNFTEligible: boolean('is_nft_eligible').notNull().default(false),
  nftContractAddress: text('nft_contract_address'),
  nftTokenId: text('nft_token_id'),
  
  metadata: json('metadata'), // Additional metadata like tags, ratings, etc.
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const comicPages = pgTable('comic_pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  comicId: uuid('comic_id')
    .notNull()
    .references(() => comics.id, { onDelete: 'cascade' }),
  pageNumber: integer('page_number').notNull(),
  imageUrl: text('image_url').notNull(),
  fileId: uuid('file_id'), // Reference to file service
  altText: text('alt_text'),
  isPreview: boolean('is_preview').notNull().default(false), // For free preview pages
  
  // IPFS/NFT data (optional)
  ipfsHash: text('ipfs_hash'),
  ipfsUrl: text('ipfs_url'),
  
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const readingProgress = pgTable('reading_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  comicId: uuid('comic_id')
    .notNull()
    .references(() => comics.id, { onDelete: 'cascade' }),
  currentPage: integer('current_page').notNull().default(1),
  totalPages: integer('total_pages').notNull(),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  lastReadAt: timestamp('last_read_at', { mode: 'date' }).notNull().defaultNow(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const comicPurchases = pgTable('comic_purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  comicId: uuid('comic_id')
    .notNull()
    .references(() => comics.id, { onDelete: 'cascade' }),
  purchasePrice: decimal('purchase_price', { precision: 10, scale: 2 }).notNull(),
  transactionId: text('transaction_id'), // Reference to wallet transaction
  purchasedAt: timestamp('purchased_at', { mode: 'date' }).notNull().defaultNow(),
});

export const comicReviews = pgTable('comic_reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  comicId: uuid('comic_id')
    .notNull()
    .references(() => comics.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(), // 1-5 stars
  review: text('review'),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export type InsertComic = typeof comics.$inferInsert;
export type SelectComic = typeof comics.$inferSelect;

export type InsertComicPage = typeof comicPages.$inferInsert;
export type SelectComicPage = typeof comicPages.$inferSelect;

export type InsertReadingProgress = typeof readingProgress.$inferInsert;
export type SelectReadingProgress = typeof readingProgress.$inferSelect;

export type InsertComicPurchase = typeof comicPurchases.$inferInsert;
export type SelectComicPurchase = typeof comicPurchases.$inferSelect;

export type InsertComicReview = typeof comicReviews.$inferInsert;
export type SelectComicReview = typeof comicReviews.$inferSelect;