import {
  pgTable,
  uuid,
  text,
  timestamp,
  json,
  boolean
} from 'drizzle-orm/pg-core';
import { authUsers } from './auth.js';

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  authUserId: uuid('auth_user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  firstName: text('first_name'),
  lastName: text('last_name'),
  displayName: text('display_name').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }),
  country: text('country'),
  timezone: text('timezone'),
  language: text('language').notNull(),
  preferences: json('preferences').notNull(),
  
  // Creator-specific fields
  isCreator: boolean('is_creator').notNull().default(false),
  creatorName: text('creator_name'), // Public creator name
  creatorBio: text('creator_bio'), // Creator description
  socialLinks: json('social_links'), // Twitter, Instagram, etc.
  creatorVerified: boolean('creator_verified').notNull().default(false),
  
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type SelectUserProfile = typeof userProfiles.$inferSelect;