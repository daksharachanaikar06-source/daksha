"use client";

import { useState } from "react";
import Link from "next/link";

const TICKET_OPTIONS = [
  { id: "general", name: "General Attendee", price: "Free", desc: "Access to all sessions, exhibition and networking" },
  { id: "business", name: "Business Access", price: "₹499", desc: "Priority seating + speed networking" },
  { id: "investor", name: "Investor Connect", price: "₹999", desc: "Investor lounge + meeting requests" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("general");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; ticketNumber?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ticketType: selectedTicket }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, message: data.message, ticketNumber: data.ticketNumber });
        setStep(3);
      } else {
        setResult({ success: false, message: data.error || "Registration failed" });
      }
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <header className="border-b border-[#1a2332]/10 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-semibold text-[#1a2332]">
            Franchise & Investment Summit
          </Link>
          <Link href="/" className="text-sm text-[#1a2332]/60 hover:text-[#c9a227]">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-2">Registration</p>
          <h1 className="font-display text-3xl font-semibold text-[#1a2332]">Secure your place</h1>
          <p className="mt-2 text-[#1a2332]/60 text-sm">
            Venue and exact dates will be announced soon. Your registration will be confirmed by email.
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-medium text-[#1a2332] mb-4">Select ticket type</h2>
            {TICKET_OPTIONS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTicket(t.id)}
                className={`w-full text-left p-5 border transition ${
                  selectedTicket === t.id
                    ? "border-[#c9a227] bg-[#c9a227]/5"
                    : "border-[#1a2332]/15 bg-white hover:border-[#1a2332]/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-[#1a2332]">{t.name}</div>
                    <div className="text-sm text-[#1a2332]/60 mt-1">{t.desc}</div>
                  </div>
                  <div className="font-medium text-[#c9a227]">{t.price}</div>
                </div>
              </button>
            ))}
            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-[#1a2332] text-white py-3.5 text-sm font-medium hover:bg-[#c9a227] transition"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="bg-white border border-[#1a2332]/10 p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full border border-[#1a2332]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a227]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#1a2332]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a227]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Mobile Number *</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#1a2332]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a227]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">City</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full border border-[#1a2332]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a227]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Organization</label>
                <input
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full border border-[#1a2332]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a227]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Designation</label>
                <input
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="w-full border border-[#1a2332]/20 px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a227]"
                />
              </div>
            </div>

            {result && !result.success && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-3">{result.message}</div>
            )}

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-[#1a2332]/20 py-3 text-sm font-medium hover:border-[#1a2332]/40"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#1a2332] text-white py-3 text-sm font-medium hover:bg-[#c9a227] transition disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Complete Registration"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && result?.success && (
          <div className="bg-white border border-[#1a2332]/10 p-10 text-center">
            <div className="text-[#c9a227] text-4xl mb-4">✓</div>
            <h2 className="font-display text-2xl font-semibold mb-2">Registration Successful</h2>
            <p className="text-[#1a2332]/70 mb-6">{result.message}</p>
            {result.ticketNumber && (
              <p className="text-sm font-medium mb-8">
                Ticket Number: <span className="text-[#c9a227]">{result.ticketNumber}</span>
              </p>
            )}
            <p className="text-sm text-[#1a2332]/50 mb-8">
              A confirmation email with your QR code will be sent shortly.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#1a2332] text-white px-8 py-3 text-sm font-medium hover:bg-[#c9a227] transition"
            >
              Return to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
