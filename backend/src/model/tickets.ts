import { pgTable, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { events } from "./event";
import { authUsers } from "./auth"; // adjust if your users table import name differs

export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.id),
  userId: uuid("user_id").references(() => authUsers.id),
  paymentMethod: text("payment_method").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
