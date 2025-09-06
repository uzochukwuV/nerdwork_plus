import { pgTable, uuid, varchar, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { comics } from "./comic";

export const chapters = pgTable("chapters", {
  id: uuid("id").primaryKey().defaultRandom(),
  comicId: uuid("comic_id")
    .notNull()
    .references(() => comics.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  chapterNumber: integer("chapter_number").notNull(), // User can reorder
  description: text("description"),
  pages: text("pages").array().notNull().default([]), // Array of S3 URLs - user controls order
  pageCount: integer("page_count").notNull().default(0),
  isDraft: boolean("is_draft").notNull().default(true), // Starts as draft
  publishedAt: timestamp("published_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export type InsertChapter = typeof chapters.$inferInsert;
export type SelectChapter = typeof chapters.$inferSelect;