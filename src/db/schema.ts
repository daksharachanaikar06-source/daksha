import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  uuid,
  varchar,
  decimal,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ===================== USERS & AUTH =====================
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").default(true).notNull(),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  isSystem: boolean("is_system").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const permissions = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
});

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("role_perm_unique").on(t.roleId, t.permissionId)]
);

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (t) => [uniqueIndex("user_role_unique").on(t.userId, t.roleId)]
);

// ===================== EVENT CONFIG =====================
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 500 }),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  logoUrl: text("logo_url"),
  bannerUrl: text("banner_url"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  startTime: varchar("start_time", { length: 20 }),
  endTime: varchar("end_time", { length: 20 }),
  timezone: varchar("timezone", { length: 100 }).default("Asia/Kolkata"),
  venueName: varchar("venue_name", { length: 255 }),
  venueAddress: text("venue_address"),
  googleMapsUrl: text("google_maps_url"),
  organizerName: varchar("organizer_name", { length: 255 }),
  organizerEmail: varchar("organizer_email", { length: 255 }),
  organizerPhone: varchar("organizer_phone", { length: 50 }),
  websiteUrl: text("website_url"),
  socialLinks: jsonb("social_links").$type<Record<string, string>>(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const eventSettings = pgTable("event_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" })
    .unique(),
  // Branding
  primaryColor: varchar("primary_color", { length: 20 }).default("#1a2332"),
  secondaryColor: varchar("secondary_color", { length: 20 }).default("#c9a227"),
  backgroundColor: varchar("background_color", { length: 20 }).default("#f8f6f1"),
  textColor: varchar("text_color", { length: 20 }).default("#1a2332"),
  accentColor: varchar("accent_color", { length: 20 }).default("#8b7355"),
  fontFamily: varchar("font_family", { length: 100 }).default("Inter"),
  headerStyle: varchar("header_style", { length: 50 }).default("solid"),
  footerStyle: varchar("footer_style", { length: 50 }).default("minimal"),
  buttonStyle: varchar("button_style", { length: 50 }).default("solid"),
  faviconUrl: text("favicon_url"),
  // Registration
  registrationMode: varchar("registration_mode", { length: 50 }).default("open"), // open | rsvp | invitation
  registrationOpen: boolean("registration_open").default(true),
  registrationStart: timestamp("registration_start"),
  registrationEnd: timestamp("registration_end"),
  maxCapacity: integer("max_capacity"),
  // Other
  extraConfig: jsonb("extra_config").$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const eventPages = pgTable("event_pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  sortOrder: integer("sort_order").default(0),
  content: jsonb("content").$type<Record<string, unknown>>(),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [uniqueIndex("event_page_slug").on(t.eventId, t.slug)]);

// ===================== TICKETS & REGISTRATION =====================
export const ticketTypes = pgTable("ticket_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  currency: varchar("currency", { length: 10 }).default("INR"),
  capacity: integer("capacity"),
  soldCount: integer("sold_count").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  isInvitationOnly: boolean("is_invitation_only").default(false),
  benefits: jsonb("benefits").$type<string[]>(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const registrationFormFields = pgTable("registration_form_fields", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  ticketTypeId: uuid("ticket_type_id").references(() => ticketTypes.id, {
    onDelete: "cascade",
  }),
  fieldKey: varchar("field_key", { length: 100 }).notNull(),
  label: varchar("label", { length: 255 }).notNull(),
  fieldType: varchar("field_type", { length: 50 }).notNull(), // text, email, phone, select, radio, checkbox, textarea, file
  options: jsonb("options").$type<string[]>(),
  isRequired: boolean("is_required").default(false),
  placeholder: varchar("placeholder", { length: 255 }),
  sortOrder: integer("sort_order").default(0),
  conditionalLogic: jsonb("conditional_logic"),
  isActive: boolean("is_active").default(true),
});

export const registrations = pgTable("registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  ticketTypeId: uuid("ticket_type_id")
    .notNull()
    .references(() => ticketTypes.id),
  registrationId: varchar("registration_id", { length: 50 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  organization: varchar("organization", { length: 255 }),
  designation: varchar("designation", { length: 255 }),
  city: varchar("city", { length: 100 }),
  status: varchar("status", { length: 50 }).default("confirmed").notNull(), // pending, confirmed, cancelled, checked_in
  paymentStatus: varchar("payment_status", { length: 50 }).default("free"),
  amountPaid: decimal("amount_paid", { precision: 10, scale: 2 }).default("0"),
  invitationCode: varchar("invitation_code", { length: 100 }),
  answers: jsonb("answers").$type<Record<string, unknown>>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => [
  index("reg_event_idx").on(t.eventId),
  index("reg_email_idx").on(t.email),
]);

export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  registrationId: uuid("registration_id")
    .notNull()
    .references(() => registrations.id, { onDelete: "cascade" })
    .unique(),
  ticketNumber: varchar("ticket_number", { length: 50 }).notNull().unique(),
  qrToken: varchar("qr_token", { length: 100 }).notNull().unique(),
  qrCodeDataUrl: text("qr_code_data_url"),
  status: varchar("status", { length: 50 }).default("valid").notNull(), // valid, used, cancelled, expired
  checkedInAt: timestamp("checked_in_at"),
  checkedInBy: uuid("checked_in_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const checkIns = pgTable("check_ins", {
  id: uuid("id").defaultRandom().primaryKey(),
  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => tickets.id),
  registrationId: uuid("registration_id")
    .notNull()
    .references(() => registrations.id),
  checkedInBy: uuid("checked_in_by").references(() => users.id),
  checkedInAt: timestamp("checked_in_at").defaultNow().notNull(),
  notes: text("notes"),
});

// ===================== SPEAKERS, SPONSORS, ETC =====================
export const speakers = pgTable("speakers", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 255 }),
  organization: varchar("organization", { length: 255 }),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  expertise: text("expertise"),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  linkedinUrl: text("linkedin_url"),
  status: varchar("status", { length: 50 }).default("draft"), // draft, invited, confirmed, declined
  isPublic: boolean("is_public").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sponsors = pgTable("sponsors", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  description: text("description"),
  tier: varchar("tier", { length: 50 }), // platinum, gold, silver, etc.
  sortOrder: integer("sort_order").default(0),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const exhibitors = pgTable("exhibitors", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  brandName: varchar("brand_name", { length: 255 }).notNull(),
  sector: varchar("sector", { length: 150 }),
  logoUrl: text("logo_url"),
  description: text("description"),
  franchiseModel: text("franchise_model"),
  investmentRange: varchar("investment_range", { length: 100 }),
  expansionLocations: text("expansion_locations"),
  contactName: varchar("contact_name", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  boothNumber: varchar("booth_number", { length: 50 }),
  status: varchar("status", { length: 50 }).default("pending"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===================== AGENDA =====================
export const agendaDays = pgTable("agenda_days", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  dayNumber: integer("day_number").notNull(),
  title: varchar("title", { length: 255 }),
  date: timestamp("date"),
  description: text("description"),
});

export const agendaSessions = pgTable("agenda_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  dayId: uuid("day_id").references(() => agendaDays.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startTime: varchar("start_time", { length: 20 }),
  endTime: varchar("end_time", { length: 20 }),
  format: varchar("format", { length: 100 }), // keynote, panel, workshop, networking, etc.
  room: varchar("room", { length: 100 }),
  capacity: integer("capacity"),
  speakerIds: jsonb("speaker_ids").$type<string[]>(),
  isPublished: boolean("is_published").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===================== SPOC =====================
export const spocs = pgTable("spocs", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 255 }),
  department: varchar("department", { length: 150 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  photoUrl: text("photo_url"),
  responsibility: text("responsibility"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const spocAssignments = pgTable("spoc_assignments", {
  id: uuid("id").defaultRandom().primaryKey(),
  spocId: uuid("spoc_id")
    .notNull()
    .references(() => spocs.id, { onDelete: "cascade" }),
  ticketTypeId: uuid("ticket_type_id").references(() => ticketTypes.id, {
    onDelete: "cascade",
  }),
  category: varchar("category", { length: 100 }), // speakers, exhibitors, investors, etc.
});

// ===================== EMAIL =====================
export const emailTemplates = pgTable("email_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  bodyHtml: text("body_html").notNull(),
  bodyText: text("body_text"),
  type: varchar("type", { length: 50 }), // confirmation, reminder, custom
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const emailCampaigns = pgTable("email_campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  bodyHtml: text("body_html").notNull(),
  status: varchar("status", { length: 50 }).default("draft"), // draft, scheduled, sending, sent, failed
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  recipientFilter: jsonb("recipient_filter"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailLogs = pgTable("email_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").references(() => emailCampaigns.id),
  registrationId: uuid("registration_id").references(() => registrations.id),
  toEmail: varchar("to_email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  status: varchar("status", { length: 50 }).notNull(), // sent, delivered, bounced, failed
  resendId: varchar("resend_id", { length: 100 }),
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at").defaultNow(),
});

// ===================== REMINDERS =====================
export const reminders = pgTable("reminders", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  bodyHtml: text("body_html").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: varchar("status", { length: 50 }).default("scheduled"), // scheduled, sent, cancelled, failed
  recipientFilter: jsonb("recipient_filter"),
  sentAt: timestamp("sent_at"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===================== INVITATIONS =====================
export const invitations = pgTable("invitations", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  ticketTypeId: uuid("ticket_type_id").references(() => ticketTypes.id),
  status: varchar("status", { length: 50 }).default("pending"), // pending, used, expired, cancelled
  expiresAt: timestamp("expires_at"),
  usedAt: timestamp("used_at"),
  usedByRegistrationId: uuid("used_by_registration_id").references(
    () => registrations.id
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===================== AUDIT =====================
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }),
  entityId: uuid("entity_id"),
  details: jsonb("details"),
  ipAddress: varchar("ip_address", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===================== RELATIONS =====================
export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userRoles: many(userRoles),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  settings: one(eventSettings),
  pages: many(eventPages),
  ticketTypes: many(ticketTypes),
  speakers: many(speakers),
  sponsors: many(sponsors),
  exhibitors: many(exhibitors),
  agendaDays: many(agendaDays),
  spocs: many(spocs),
}));
