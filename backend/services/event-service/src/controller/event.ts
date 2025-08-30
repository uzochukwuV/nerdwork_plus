import { eq, desc, asc, gte, lte, and, sql, ilike } from "drizzle-orm";
import { db } from "../config/db.js";
import { events, tickets, bookings, eventCategories, eventReviews } from "../model/event.js";
import { nanoid } from 'nanoid';

// Get all events with filtering and pagination
export const getEvents = async (req: any, res: any) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      location, 
      dateFrom, 
      dateTo, 
      search,
      featured,
      virtual,
      status = 'upcoming'
    } = req.query;
    
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereConditions = [
      eq(events.isPublished, true),
      eq(events.status, status)
    ];
    
    if (category) {
      whereConditions.push(eq(events.category, category));
    }
    
    if (location) {
      whereConditions.push(ilike(events.city, `%${location}%`));
    }
    
    if (dateFrom) {
      whereConditions.push(gte(events.startDateTime, new Date(dateFrom)));
    }
    
    if (dateTo) {
      whereConditions.push(lte(events.startDateTime, new Date(dateTo)));
    }
    
    if (search) {
      whereConditions.push(
        sql`(${events.title} ILIKE ${`%${search}%`} OR ${events.description} ILIKE ${`%${search}%`})`
      );
    }
    
    if (featured === 'true') {
      whereConditions.push(eq(events.isFeatured, true));
    }
    
    if (virtual === 'true') {
      whereConditions.push(eq(events.isVirtual, true));
    }

    const eventsList = await db
      .select({
        id: events.id,
        title: events.title,
        shortDescription: events.shortDescription,
        category: events.category,
        organizer: events.organizer,
        venue: events.venue,
        city: events.city,
        state: events.state,
        country: events.country,
        startDateTime: events.startDateTime,
        endDateTime: events.endDateTime,
        coverImageUrl: events.coverImageUrl,
        isVirtual: events.isVirtual,
        isFeatured: events.isFeatured,
        currentAttendees: events.currentAttendees,
        maxAttendees: events.maxAttendees,
        status: events.status,
      })
      .from(events)
      .where(and(...whereConditions))
      .orderBy(desc(events.startDateTime))
      .limit(parseInt(limit))
      .offset(offset);

    const totalCount = await db
      .select({ count: sql`count(*)` })
      .from(events)
      .where(and(...whereConditions));

    return res.status(200).json({
      success: true,
      data: {
        events: eventsList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount[0].count,
          totalPages: Math.ceil(Number(totalCount[0].count) / parseInt(limit))
        }
      },
      message: "Events retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get events error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get specific event details with tickets
export const getEvent = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const [event] = await db
      .select()
      .from(events)
      .where(and(eq(events.id, id), eq(events.isPublished, true)));

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
        timestamp: new Date().toISOString()
      });
    }

    // Get available tickets for this event
    const eventTickets = await db
      .select()
      .from(tickets)
      .where(and(
        eq(tickets.eventId, id),
        eq(tickets.isActive, true),
        gte(tickets.availableQuantity, 0)
      ))
      .orderBy(asc(tickets.sortOrder));

    return res.status(200).json({
      success: true,
      data: {
        event,
        tickets: eventTickets
      },
      message: "Event retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get event error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Book event tickets
export const bookTickets = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { ticketId, quantity, attendeeInfo, paymentMethod } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    // Get event and ticket details
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id));

    const [ticket] = await db
      .select()
      .from(tickets)
      .where(and(eq(tickets.id, ticketId), eq(tickets.eventId, id)));

    if (!event || !ticket) {
      return res.status(404).json({
        success: false,
        error: "Event or ticket not found",
        timestamp: new Date().toISOString()
      });
    }

    // Check availability
    if (ticket.availableQuantity < quantity) {
      return res.status(400).json({
        success: false,
        error: "Insufficient tickets available",
        timestamp: new Date().toISOString()
      });
    }

    // Check quantity limits
    if (quantity < ticket.minQuantityPerOrder || quantity > ticket.maxQuantityPerOrder) {
      return res.status(400).json({
        success: false,
        error: `Quantity must be between ${ticket.minQuantityPerOrder} and ${ticket.maxQuantityPerOrder}`,
        timestamp: new Date().toISOString()
      });
    }

    // Calculate total price
    const totalPrice = (parseFloat(ticket.price) * quantity).toFixed(2);
    const bookingReference = `NW-${nanoid(10).toUpperCase()}`;

    // Create booking
    const [booking] = await db
      .insert(bookings)
      .values({
        userId,
        eventId: id,
        ticketId,
        quantity,
        totalPrice,
        paymentMethod,
        attendeeInfo,
        bookingReference,
        status: 'confirmed' // In real app, this would be 'pending' until payment
      })
      .returning();

    // Update ticket availability
    await db
      .update(tickets)
      .set({
        availableQuantity: ticket.availableQuantity - quantity,
        updatedAt: new Date()
      })
      .where(eq(tickets.id, ticketId));

    // Update event attendee count
    await db
      .update(events)
      .set({
        currentAttendees: event.currentAttendees + quantity,
        updatedAt: new Date()
      })
      .where(eq(events.id, id));

    return res.status(201).json({
      success: true,
      data: booking,
      message: "Tickets booked successfully"
    });
  } catch (error: any) {
    console.error("Book tickets error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get user's bookings
export const getUserBookings = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    const userBookings = await db
      .select({
        id: bookings.id,
        quantity: bookings.quantity,
        totalPrice: bookings.totalPrice,
        status: bookings.status,
        bookingReference: bookings.bookingReference,
        checkInDateTime: bookings.checkInDateTime,
        createdAt: bookings.createdAt,
        event: {
          id: events.id,
          title: events.title,
          startDateTime: events.startDateTime,
          venue: events.venue,
          city: events.city,
          coverImageUrl: events.coverImageUrl,
        },
        ticket: {
          id: tickets.id,
          name: tickets.name,
          price: tickets.price,
        }
      })
      .from(bookings)
      .innerJoin(events, eq(bookings.eventId, events.id))
      .innerJoin(tickets, eq(bookings.ticketId, tickets.id))
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));

    return res.status(200).json({
      success: true,
      data: userBookings,
      message: "Bookings retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get user bookings error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Get event categories
export const getEventCategories = async (req: any, res: any) => {
  try {
    const categories = await db
      .select()
      .from(eventCategories)
      .where(eq(eventCategories.isActive, true))
      .orderBy(asc(eventCategories.sortOrder));

    return res.status(200).json({
      success: true,
      data: categories,
      message: "Event categories retrieved successfully"
    });
  } catch (error: any) {
    console.error("Get event categories error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};

// Add event review
export const addEventReview = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
        timestamp: new Date().toISOString()
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user attended the event
    const [booking] = await db
      .select()
      .from(bookings)
      .where(and(
        eq(bookings.userId, userId),
        eq(bookings.eventId, id),
        eq(bookings.status, 'confirmed')
      ));

    if (!booking) {
      return res.status(403).json({
        success: false,
        error: "You can only review events you have attended",
        timestamp: new Date().toISOString()
      });
    }

    // Check if user already reviewed this event
    const [existingReview] = await db
      .select()
      .from(eventReviews)
      .where(and(eq(eventReviews.userId, userId), eq(eventReviews.eventId, id)));

    let reviewResult;
    if (existingReview) {
      [reviewResult] = await db
        .update(eventReviews)
        .set({
          rating,
          review,
          updatedAt: new Date(),
        })
        .where(eq(eventReviews.id, existingReview.id))
        .returning();
    } else {
      [reviewResult] = await db
        .insert(eventReviews)
        .values({
          userId,
          eventId: id,
          rating,
          review,
        })
        .returning();
    }

    return res.status(200).json({
      success: true,
      data: reviewResult,
      message: existingReview ? "Review updated successfully" : "Review added successfully"
    });
  } catch (error: any) {
    console.error("Add event review error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
};