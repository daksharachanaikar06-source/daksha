import Link from "next/link";

const day1 = [
  { time: "09:00 – 10:00", title: "Registration, Welcome Kits, Breakfast & Franchise Exhibition Opening", format: "Registration" },
  { time: "10:00 – 10:30", title: "Inauguration and Welcome Address", format: "Keynote" },
  { time: "10:30 – 11:15", title: "Keynote: The Future of Entrepreneurship and Business Opportunities in India", format: "Keynote" },
  { time: "11:15 – 11:30", title: "Tea and Networking Break", format: "Break" },
  { time: "11:30 – 12:30", title: "Panel Discussion: Is Franchising the Right Business Model for You?", format: "Panel" },
  { time: "12:30 – 13:15", title: "Franchise Showcase: Presentations by Participating Brands", format: "Showcase" },
  { time: "13:15 – 14:00", title: "Lunch and Networking", format: "Networking" },
  { time: "14:00 – 14:45", title: "Masterclass: How to Select the Right Franchise Business", format: "Masterclass" },
  { time: "14:45 – 15:30", title: "Franchise Brand Presentations and Q&A", format: "Presentation" },
  { time: "15:30 – 15:45", title: "Tea Break", format: "Break" },
  { time: "15:45 – 16:30", title: "Entrepreneur Success Stories and Practical Lessons", format: "Panel" },
  { time: "16:30 – 17:15", title: "Business Opportunity Roadmap: From Idea to Business Plan", format: "Workshop" },
  { time: "17:15 – 18:00", title: "Open Networking, Exhibition Visits & One-to-One Brand Interactions", format: "Networking" },
];

const day2 = [
  { time: "09:00 – 09:45", title: "Registration, Breakfast and Networking", format: "Registration" },
  { time: "09:45 – 10:30", title: "Keynote: Understanding Investment and Funding for Business Growth", format: "Keynote" },
  { time: "10:30 – 11:15", title: "Panel Discussion: Where and How Can Entrepreneurs Find Investment?", format: "Panel" },
  { time: "11:15 – 11:30", title: "Tea and Networking Break", format: "Break" },
  { time: "11:30 – 12:30", title: "Investor Connect: Structured Introductions and Discussions", format: "Networking" },
  { time: "12:30 – 13:15", title: "Business Pitch Arena", format: "Pitch" },
  { time: "13:15 – 14:00", title: "Lunch and Networking", format: "Networking" },
  { time: "14:00 – 14:45", title: "Session: Financial Planning, Business Valuation and Risk Awareness", format: "Session" },
  { time: "14:45 – 15:30", title: "Panel Discussion: Building and Scaling Businesses in Tier 2 Cities", format: "Panel" },
  { time: "15:30 – 15:45", title: "Tea Break", format: "Break" },
  { time: "15:45 – 16:45", title: "Pre-arranged One-to-One Meetings", format: "Meetings" },
  { time: "16:45 – 17:15", title: "Action Planning: Next Steps After the Summit", format: "Workshop" },
  { time: "17:15 – 17:45", title: "Closing Remarks, Acknowledgements and Final Networking", format: "Closing" },
  { time: "17:45 – 18:00", title: "Group Photographs and Event Conclusion", format: "Closing" },
];

export default function AgendaPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <header className="border-b border-[#1a2332]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-[#1a2332]">
            Franchise & Investment Summit
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1a2332]/80">
            <Link href="/about" className="hover:text-[#c9a227] transition">About</Link>
            <Link href="/agenda" className="text-[#c9a227]">Agenda</Link>
            <Link href="/speakers" className="hover:text-[#c9a227] transition">Speakers</Link>
            <Link href="/brands" className="hover:text-[#c9a227] transition">Brands</Link>
            <Link href="/venue" className="hover:text-[#c9a227] transition">Venue</Link>
            <Link href="/register" className="bg-[#1a2332] text-white px-5 py-2.5 rounded-sm hover:bg-[#c9a227] transition">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">Programme</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2332] mb-4">
          Two-Day Agenda
        </h1>
        <p className="text-[#1a2332]/60 text-sm mb-12 max-w-2xl">
          This is a planning draft. Final session times, speakers, and titles will be updated once confirmed.
          All sessions are subject to change.
        </p>

        {/* Day 1 */}
        <section className="mb-16">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-[#c9a227] text-sm font-medium tracking-widest uppercase">Day 1</span>
            <h2 className="font-display text-2xl font-semibold text-[#1a2332]">
              Explore Business & Franchise Opportunities
            </h2>
          </div>
          <div className="bg-white border border-[#1a2332]/10 divide-y divide-[#1a2332]/8">
            {day1.map((session, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 px-6 py-5">
                <div className="sm:w-36 shrink-0 text-sm font-medium text-[#c9a227]">{session.time}</div>
                <div className="flex-1">
                  <div className="font-medium text-[#1a2332]">{session.title}</div>
                  <div className="text-xs text-[#1a2332]/50 mt-1 uppercase tracking-wide">{session.format}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Day 2 */}
        <section>
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-[#c9a227] text-sm font-medium tracking-widest uppercase">Day 2</span>
            <h2 className="font-display text-2xl font-semibold text-[#1a2332]">
              Investment, Growth & Business Connections
            </h2>
          </div>
          <div className="bg-white border border-[#1a2332]/10 divide-y divide-[#1a2332]/8">
            {day2.map((session, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 px-6 py-5">
                <div className="sm:w-36 shrink-0 text-sm font-medium text-[#c9a227]">{session.time}</div>
                <div className="flex-1">
                  <div className="font-medium text-[#1a2332]">{session.title}</div>
                  <div className="text-xs text-[#1a2332]/50 mt-1 uppercase tracking-wide">{session.format}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-block bg-[#1a2332] text-white px-8 py-3.5 text-sm font-medium hover:bg-[#c9a227] transition"
          >
            Register for the Summit
          </Link>
        </div>
      </main>

      <footer className="border-t border-[#1a2332]/10 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-[#1a2332]/50">
          © {new Date().getFullYear()} Franchise & Investment Summit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
