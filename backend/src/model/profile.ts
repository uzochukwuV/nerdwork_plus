
import {
  pgTable,
  uuid,
  text,
  timestamp,
  json
} from 'drizzle-orm/pg-core';
import { authUsers } from './auth';
import { relations } from 'drizzle-orm';

import { userWallets } from './wallet';


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
  preferences: json('preferences').notNull(), // here 
    // preferences format
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});


// const samplePreferences = {
//   theme: 'dark', // or 'light' or 'auto'
//   reading_direction: 'ltr', // or 'rtl'
//   page_transition: 'slide', // 'fade' or 'none'
//   auto_bookmark: true,
//   notifications: {
//     email_notifications: true,
//     push_notifications: false,
//     new_comics: true,
//     creator_updates: false,
//     payment_alerts: true,
//     marketing: false,
//   },
//   privacy: {
//     profile_visibility: 'friends', // 'public' or 'private'
//     reading_history_visible: true,
//     allow_friend_requests: false,
//   },
// };



export type InsertUserProfile = typeof userProfiles.$inferInsert;
export type SelectUserProfile = typeof userProfiles.$inferSelect;



export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  wallet: one(userWallets, {
    fields: [userProfiles.id],
    references: [userWallets.userProfileId],
  }),
  authUser: one(authUsers, {
    fields: [userProfiles.authUserId],
    references: [authUsers.id],
  }),
}));


