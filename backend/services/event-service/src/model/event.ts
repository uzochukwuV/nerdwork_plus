import {
  pgTable,
  uuid,
  text,
  timestamp,
  decimal,
  integer,
  boolean,
  json
} from 'drizzle-orm/pg-core';
import { authUsers } from './auth.js';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  shortDescription: text('short_description'),
  category: text('category').notNull(), // 'convention', 'meetup', 'workshop', 'signing'
  organizer: text('organizer').notNull(),
  venue: text('venue').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state'),
  country: text('country').notNull(),
  zipCode: text('zip_code'),
  startDateTime: timestamp('start_date_time', { mode: 'date' }).notNull(),
  endDateTime: timestamp('end_date_time', { mode: 'date' }).notNull(),
  timezone: text('timezone').notNull().default('UTC'),
  coverImageUrl: text('cover_image_url'),
  bannerImageUrl: text('banner_image_url'),
  website: text('website'),
  socialLinks: json('social_links'), // {twitter, instagram, facebook}
  tags: json('tags'), // ['comic-con', 'marvel', 'dc']
  ageRestriction: text('age_restriction'), // 'all-ages', '13+', '18+'
  maxAttendees: integer('max_attendees'),
  currentAttendees: integer('current_attendees').notNull().default(0),
  isPublished: boolean('is_published').notNull().default(false),
  isFeatured: boolean('is_featured').notNull().default(false),
  isVirtual: boolean('is_virtual').notNull().default(false),
  virtualLink: text('virtual_link'),
  status: text('status').notNull().default('upcoming'), // 'upcoming', 'ongoing', 'completed', 'cancelled'
  metadata: json('metadata'), // Additional event data
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // 'General Admission', 'VIP', 'Early Bird'
  description: text('description'),
  type: text('type').notNull().default('paid'), // 'free', 'paid', 'donation'
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0.00'),
  nwtPrice: decimal('nwt_price', { precision: 18, scale: 8 }), // Price in NWT tokens
  currency: text('currency').notNull().default('USD'),
  totalQuantity: integer('total_quantity').notNull(),
  availableQuantity: integer('available_quantity').notNull(),
  minQuantityPerOrder: integer('min_quantity_per_order').notNull().default(1),
  maxQuantityPerOrder: integer('max_quantity_per_order').notNull().default(10),
  saleStartDate: timestamp('sale_start_date', { mode: 'date' }),
  saleEndDate: timestamp('sale_end_date', { mode: 'date' }),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  metadata: json('metadata'), // Additional ticket data like perks, includes
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  ticketId: uuid('ticket_id')
    .notNull()
    .references(() => tickets.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text('payment_method').notNull(), // 'stripe', 'nwt', 'paypal'
  transactionId: text('transaction_id'), // Reference to wallet transaction or payment
  status: text('status').notNull().default('confirmed'), // 'pending', 'confirmed', 'cancelled', 'refunded'
  attendeeInfo: json('attendee_info'), // Names, emails for tickets
  bookingReference: text('booking_reference').notNull().unique(),
  qrCode: text('qr_code'), // QR code for check-in
  checkInDateTime: timestamp('check_in_date_time', { mode: 'date' }),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const eventCategories = pgTable('event_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  description: text('description'),
  iconUrl: text('icon_url'),
  color: text('color'), // Hex color code
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
});

export const eventReviews = pgTable('event_reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(), // 1-5 stars
  review: text('review'),
  isPublished: boolean('is_published').notNull().default(true),
  helpfulVotes: integer('helpful_votes').notNull().default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export type InsertEvent = typeof events.$inferInsert;
export type SelectEvent = typeof events.$inferSelect;

export type InsertTicket = typeof tickets.$inferInsert;
export type SelectTicket = typeof tickets.$inferSelect;

export type InsertBooking = typeof bookings.$inferInsert;
export type SelectBooking = typeof bookings.$inferSelect;

export type InsertEventCategory = typeof eventCategories.$inferInsert;
export type SelectEventCategory = typeof eventCategories.$inferSelect;

export type InsertEventReview = typeof eventReviews.$inferInsert;
export type SelectEventReview = typeof eventReviews.$inferSelect;