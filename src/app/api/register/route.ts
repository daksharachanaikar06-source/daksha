import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events, ticketTypes, registrations, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateRegistrationId, generateTicketNumber, generateQrToken } from "@/lib/utils";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, organization, designation, city, ticketType } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email and phone are required" },
        { status: 400 }
      );
    }

    // Get the active event (first published one for now)
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.isPublished, true))
      .limit(1);

    if (!event) {
      return NextResponse.json(
        { error: "No active event found. Please contact the organizer." },
        { status: 404 }
      );
    }

    // Map simple ticket key to actual ticket type
    const ticketNameMap: Record<string, string> = {
      general: "General Attendee",
      business: "Business Access",
      investor: "Investor Connect",
    };

    const desiredName = ticketNameMap[ticketType] || "General Attendee";

    const [ticketTypeRow] = await db
      .select()
      .from(ticketTypes)
      .where(eq(ticketTypes.eventId, event.id))
      .limit(20);

    // Find matching ticket type
    const allTickets = await db
      .select()
      .from(ticketTypes)
      .where(eq(ticketTypes.eventId, event.id));

    const matchedTicket =
      allTickets.find((t) => t.name === desiredName) || allTickets[0];

    if (!matchedTicket) {
      return NextResponse.json(
        { error: "Selected ticket type is not available" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "This email is already registered for the event" },
        { status: 409 }
      );
    }

    const registrationId = generateRegistrationId();
    const ticketNumber = generateTicketNumber();
    const qrToken = generateQrToken();

    // Generate QR code data URL
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify/${qrToken}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 300,
      margin: 2,
      color: { dark: "#1a2332", light: "#ffffff" },
    });

    // Create registration
    const [registration] = await db
      .insert(registrations)
      .values({
        eventId: event.id,
        ticketTypeId: matchedTicket.id,
        registrationId,
        fullName,
        email: email.toLowerCase(),
        phone,
        organization: organization || null,
        designation: designation || null,
        city: city || null,
        status: "confirmed",
        paymentStatus: matchedTicket.price === "0" ? "free" : "pending",
        amountPaid: matchedTicket.price,
      })
      .returning();

    // Create ticket
    await db.insert(tickets).values({
      registrationId: registration.id,
      ticketNumber,
      qrToken,
      qrCodeDataUrl,
      status: "valid",
    });

    // TODO: Send confirmation email via Resend when configured

    return NextResponse.json({
      success: true,
      message: "Registration successful. A confirmation email will be sent shortly.",
      registrationId,
      ticketNumber,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
