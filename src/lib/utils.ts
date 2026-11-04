import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRegistrationId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FIS${year}${random}`;
}

export function generateTicketNumber(): string {
  const prefix = "TKT";
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}

export function generateQrToken(): string {
  return crypto.randomUUID().replace(/-/g, "") + Date.now().toString(36);
}
