import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log("🌱 Starting seed...");

  // ========== ROLES ==========
  const rolesData = [
    { name: "Super Admin", description: "Full system access", isSystem: true },
    { name: "Event Manager", description: "Manage event details, pages, agenda", isSystem: true },
    { name: "Registration Manager", description: "Manage registrations and tickets", isSystem: true },
    { name: "Speaker Manager", description: "Manage speakers and sessions", isSystem: true },
    { name: "Sponsor Manager", description: "Manage sponsors", isSystem: true },
    { name: "Franchise Manager", description: "Manage franchise brands and exhibitors", isSystem: true },
    { name: "Investor Relations Manager", description: "Manage investor profiles and meetings", isSystem: true },
    { name: "Check-in Staff", description: "QR scanning and check-in only", isSystem: true },
    { name: "Volunteer", description: "Limited operational access", isSystem: true },
  ];

  const insertedRoles = await db
    .insert(schema.roles)
    .values(rolesData)
    .returning();

  const roleMap = Object.fromEntries(insertedRoles.map((r) => [r.name, r.id]));

  // ========== SUPER ADMIN ==========
  const passwordHash = await bcrypt.hash("Admin@12345", 12);
  const [adminUser] = await db
    .insert(schema.users)
    .values({
      email: "admin@franchiseinvestment.summit",
      passwordHash,
      name: "Summit Administrator",
      phone: "+91 98765 00000",
      isActive: true,
    })
    .returning();

  await db.insert(schema.userRoles).values({
    userId: adminUser.id,
    roleId: roleMap["Super Admin"],
  });

  console.log("✅ Super Admin created: admin@franchiseinvestment.summit / Admin@12345");

  // ========== EVENT ==========
  const [event] = await db
    .insert(schema.events)
    .values({
      name: "Franchise & Investment Summit",
      tagline: "Discover Opportunities. Connect with Brands. Build Businesses.",
      description:
        "A two-day business event in Belagavi, Karnataka that connects aspiring entrepreneurs, existing business owners, franchise brands, investors, and business experts. Explore franchise models, understand investment requirements, learn about funding and financial planning, attend expert sessions, and take part in structured networking and one-to-one meetings.",
      category: "Business Summit",
      startDate: null, // To Be Announced
      endDate: null,
      timezone: "Asia/Kolkata",
      venueName: "To Be Announced",
      venueAddress: "Belagavi, Karnataka, India",
      organizerName: "Franchise & Investment Summit Organizing Committee",
      organizerEmail: "info@franchiseinvestment.summit",
      organizerPhone: "+91 98765 43210",
      websiteUrl: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        instagram: "",
      },
      isPublished: true,
    })
    .returning();

  // ========== EVENT SETTINGS (Branding) ==========
  await db.insert(schema.eventSettings).values({
    eventId: event.id,
    primaryColor: "#1a2332",
    secondaryColor: "#c9a227",
    backgroundColor: "#f8f6f1",
    textColor: "#1a2332",
    accentColor: "#8b7355",
    fontFamily: "Inter",
    headerStyle: "solid",
    footerStyle: "minimal",
    buttonStyle: "solid",
    registrationMode: "open",
    registrationOpen: true,
    maxCapacity: 200,
  });

  // ========== PAGES ==========
  const pages = [
    { slug: "home", title: "Home", sortOrder: 1, isEnabled: true },
    { slug: "about", title: "About the Event", sortOrder: 2, isEnabled: true },
    { slug: "agenda", title: "Agenda", sortOrder: 3, isEnabled: true },
    { slug: "speakers", title: "Speakers", sortOrder: 4, isEnabled: true },
    { slug: "brands", title: "Franchise Brands", sortOrder: 5, isEnabled: true },
    { slug: "investors", title: "Investors & Experts", sortOrder: 6, isEnabled: true },
    { slug: "networking", title: "Networking", sortOrder: 7, isEnabled: true },
    { slug: "sponsors", title: "Sponsors & Partners", sortOrder: 8, isEnabled: true },
    { slug: "venue", title: "Venue & Location", sortOrder: 9, isEnabled: true },
    { slug: "registration", title: "Registration", sortOrder: 10, isEnabled: true },
    { slug: "contact", title: "Contact", sortOrder: 11, isEnabled: true },
    { slug: "privacy", title: "Privacy Policy", sortOrder: 12, isEnabled: true },
    { slug: "terms", title: "Terms & Conditions", sortOrder: 13, isEnabled: true },
  ];

  await db.insert(schema.eventPages).values(
    pages.map((p) => ({
      eventId: event.id,
      ...p,
      content: {},
    }))
  );

  // ========== TICKET TYPES ==========
  const ticketTypesData = [
    {
      name: "General Attendee",
      description: "Access to all sessions, exhibition, and networking areas.",
      price: "0",
      capacity: 120,
      benefits: ["All sessions", "Exhibition access", "Networking"],
      sortOrder: 1,
    },
    {
      name: "Business Access",
      description: "Priority seating + access to business speed networking.",
      price: "499",
      capacity: 40,
      benefits: ["All sessions", "Priority seating", "Speed networking", "Exhibition"],
      sortOrder: 2,
    },
    {
      name: "Investor Connect",
      description: "Access to Investor Connect lounge and selected meetings.",
      price: "999",
      capacity: 20,
      benefits: ["All sessions", "Investor Connect lounge", "Meeting requests", "Priority networking"],
      sortOrder: 3,
    },
    {
      name: "Franchise Brand / Exhibitor",
      description: "Exhibition booth + brand presentation opportunity.",
      price: "0",
      capacity: 15,
      isInvitationOnly: true,
      benefits: ["Exhibition booth", "Brand presentation slot", "Lead collection"],
      sortOrder: 4,
    },
    {
      name: "Speaker / Expert",
      description: "Speaker access.",
      price: "0",
      capacity: 15,
      isInvitationOnly: true,
      benefits: ["Speaker lounge", "All sessions"],
      sortOrder: 5,
    },
    {
      name: "VIP / Invited Guest",
      description: "By invitation only.",
      price: "0",
      capacity: 20,
      isInvitationOnly: true,
      benefits: ["VIP seating", "All access", "Dedicated SPOC"],
      sortOrder: 6,
    },
  ];

  const insertedTickets = await db
    .insert(schema.ticketTypes)
    .values(
      ticketTypesData.map((t) => ({
        eventId: event.id,
        ...t,
        currency: "INR",
        isActive: true,
      }))
    )
    .returning();

  // ========== AGENDA DAYS ==========
  const [day1] = await db
    .insert(schema.agendaDays)
    .values({
      eventId: event.id,
      dayNumber: 1,
      title: "Day 1 — Explore Business & Franchise Opportunities",
      description: "Franchise models, brand presentations, and entrepreneurship foundations.",
    })
    .returning();

  const [day2] = await db
    .insert(schema.agendaDays)
    .values({
      eventId: event.id,
      dayNumber: 2,
      title: "Day 2 — Investment, Growth & Business Connections",
      description: "Funding, investor interactions, pitch arena, and action planning.",
    })
    .returning();

  // ========== AGENDA SESSIONS (Day 1) ==========
  const day1Sessions = [
    { title: "Registration, Welcome Kits, Breakfast & Franchise Exhibition Opening", startTime: "09:00", endTime: "10:00", format: "Registration", sortOrder: 1 },
    { title: "Inauguration and Welcome Address", startTime: "10:00", endTime: "10:30", format: "Keynote", sortOrder: 2 },
    { title: "Keynote: The Future of Entrepreneurship and Business Opportunities in India", startTime: "10:30", endTime: "11:15", format: "Keynote", sortOrder: 3 },
    { title: "Tea and Networking Break", startTime: "11:15", endTime: "11:30", format: "Break", sortOrder: 4 },
    { title: "Panel Discussion: Is Franchising the Right Business Model for You?", startTime: "11:30", endTime: "12:30", format: "Panel", sortOrder: 5 },
    { title: "Franchise Showcase: Presentations by Participating Brands", startTime: "12:30", endTime: "13:15", format: "Showcase", sortOrder: 6 },
    { title: "Lunch and Networking", startTime: "13:15", endTime: "14:00", format: "Networking", sortOrder: 7 },
    { title: "Masterclass: How to Select the Right Franchise Business", startTime: "14:00", endTime: "14:45", format: "Masterclass", sortOrder: 8 },
    { title: "Franchise Brand Presentations and Q&A", startTime: "14:45", endTime: "15:30", format: "Presentation", sortOrder: 9 },
    { title: "Tea Break", startTime: "15:30", endTime: "15:45", format: "Break", sortOrder: 10 },
    { title: "Entrepreneur Success Stories and Practical Lessons", startTime: "15:45", endTime: "16:30", format: "Panel", sortOrder: 11 },
    { title: "Business Opportunity Roadmap: From Idea to Business Plan", startTime: "16:30", endTime: "17:15", format: "Workshop", sortOrder: 12 },
    { title: "Open Networking, Exhibition Visits & One-to-One Brand Interactions", startTime: "17:15", endTime: "18:00", format: "Networking", sortOrder: 13 },
  ];

  await db.insert(schema.agendaSessions).values(
    day1Sessions.map((s) => ({
      eventId: event.id,
      dayId: day1.id,
      ...s,
      isPublished: true,
    }))
  );

  // ========== AGENDA SESSIONS (Day 2) ==========
  const day2Sessions = [
    { title: "Registration, Breakfast and Networking", startTime: "09:00", endTime: "09:45", format: "Registration", sortOrder: 1 },
    { title: "Keynote: Understanding Investment and Funding for Business Growth", startTime: "09:45", endTime: "10:30", format: "Keynote", sortOrder: 2 },
    { title: "Panel Discussion: Where and How Can Entrepreneurs Find Investment?", startTime: "10:30", endTime: "11:15", format: "Panel", sortOrder: 3 },
    { title: "Tea and Networking Break", startTime: "11:15", endTime: "11:30", format: "Break", sortOrder: 4 },
    { title: "Investor Connect: Structured Introductions and Discussions", startTime: "11:30", endTime: "12:30", format: "Networking", sortOrder: 5 },
    { title: "Business Pitch Arena", startTime: "12:30", endTime: "13:15", format: "Pitch", sortOrder: 6 },
    { title: "Lunch and Networking", startTime: "13:15", endTime: "14:00", format: "Networking", sortOrder: 7 },
    { title: "Session: Financial Planning, Business Valuation and Risk Awareness", startTime: "14:00", endTime: "14:45", format: "Session", sortOrder: 8 },
    { title: "Panel Discussion: Building and Scaling Businesses in Tier 2 Cities", startTime: "14:45", endTime: "15:30", format: "Panel", sortOrder: 9 },
    { title: "Tea Break", startTime: "15:30", endTime: "15:45", format: "Break", sortOrder: 10 },
    { title: "Pre-arranged One-to-One Meetings", startTime: "15:45", endTime: "16:45", format: "Meetings", sortOrder: 11 },
    { title: "Action Planning: Next Steps After the Summit", startTime: "16:45", endTime: "17:15", format: "Workshop", sortOrder: 12 },
    { title: "Closing Remarks, Acknowledgements and Final Networking", startTime: "17:15", endTime: "17:45", format: "Closing", sortOrder: 13 },
    { title: "Group Photographs and Event Conclusion", startTime: "17:45", endTime: "18:00", format: "Closing", sortOrder: 14 },
  ];

  await db.insert(schema.agendaSessions).values(
    day2Sessions.map((s) => ({
      eventId: event.id,
      dayId: day2.id,
      ...s,
      isPublished: true,
    }))
  );

  // ========== SAMPLE SPOCS ==========
  await db.insert(schema.spocs).values([
    {
      eventId: event.id,
      name: "Registration Desk",
      designation: "Registration Coordinator",
      department: "Operations",
      email: "registration@franchiseinvestment.summit",
      phone: "+91 98765 11111",
      whatsapp: "+91 98765 11111",
      responsibility: "Registration support and ticket queries",
    },
    {
      eventId: event.id,
      name: "Speaker Coordination",
      designation: "Speaker Manager",
      department: "Program",
      email: "speakers@franchiseinvestment.summit",
      phone: "+91 98765 22222",
      whatsapp: "+91 98765 22222",
      responsibility: "Speaker support and session coordination",
    },
  ]);

  // ========== EMAIL TEMPLATES ==========
  await db.insert(schema.emailTemplates).values([
    {
      eventId: event.id,
      name: "Registration Confirmation",
      subject: "Your Registration Confirmation – Franchise & Investment Summit",
      type: "confirmation",
      bodyHtml: `
        <h2>Thank you for registering!</h2>
        <p>Dear {{participant_name}},</p>
        <p>Your registration for <strong>{{event_name}}</strong> is confirmed.</p>
        <p><strong>Ticket Number:</strong> {{ticket_number}}<br/>
        <strong>Registration ID:</strong> {{registration_id}}</p>
        <p>Please keep this email and present the QR code at the venue for check-in.</p>
        <p>We look forward to seeing you in Belagavi.</p>
        <p>Warm regards,<br/>Franchise & Investment Summit Team</p>
      `,
      bodyText: "Thank you for registering for the Franchise & Investment Summit. Your ticket number is {{ticket_number}}.",
    },
  ]);

  console.log("✅ Seed completed successfully!");
  console.log("Event ID:", event.id);
  console.log("Ticket types created:", insertedTickets.length);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
