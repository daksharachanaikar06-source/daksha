import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      {/* Header */}
      <header className="border-b border-[#1a2332]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display text-xl font-semibold text-[#1a2332]">
            Franchise & Investment Summit
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1a2332]/80">
            <Link href="/about" className="hover:text-[#c9a227] transition">About</Link>
            <Link href="/agenda" className="hover:text-[#c9a227] transition">Agenda</Link>
            <Link href="/speakers" className="hover:text-[#c9a227] transition">Speakers</Link>
            <Link href="/brands" className="hover:text-[#c9a227] transition">Brands</Link>
            <Link href="/venue" className="hover:text-[#c9a227] transition">Venue</Link>
            <Link
              href="/register"
              className="bg-[#1a2332] text-white px-5 py-2.5 rounded-sm hover:bg-[#c9a227] transition"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[#c9a227] font-medium tracking-widest uppercase text-sm mb-4">
              Belagavi, Karnataka · Two-Day Business Summit
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#1a2332] leading-tight mb-6">
              Discover Opportunities.
              <br />
              Connect with Brands.
              <br />
              Build Businesses.
            </h1>
            <p className="text-lg text-[#1a2332]/70 leading-relaxed mb-10 max-w-2xl">
              A focused platform bringing together aspiring entrepreneurs, existing
              business owners, franchise brands, investors, and experts to explore
              real business and franchise opportunities in North Karnataka and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center bg-[#1a2332] text-white px-8 py-3.5 text-sm font-medium tracking-wide hover:bg-[#c9a227] transition"
              >
                Register Now
              </Link>
              <Link
                href="/agenda"
                className="inline-flex items-center border border-[#1a2332]/30 text-[#1a2332] px-8 py-3.5 text-sm font-medium tracking-wide hover:border-[#c9a227] hover:text-[#c9a227] transition"
              >
                View Agenda
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="border-t border-[#1a2332]/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">
                Franchise Showcase
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                Explore Proven Models
              </h3>
              <p className="text-[#1a2332]/70 text-sm leading-relaxed">
                Meet franchise brands across food, education, healthcare, retail,
                fitness and more. Understand investment ranges, support systems,
                and expansion opportunities.
              </p>
            </div>
            <div>
              <div className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">
                Investor Connect
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                Meet Funding Experts
              </h3>
              <p className="text-[#1a2332]/70 text-sm leading-relaxed">
                Structured interactions with angel investors, bank representatives,
                and funding professionals. Learn what investors look for and how
                to prepare.
              </p>
            </div>
            <div>
              <div className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">
                Practical Learning
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                Expert Sessions & Panels
              </h3>
              <p className="text-[#1a2332]/70 text-sm leading-relaxed">
                Keynotes, masterclasses and panel discussions on franchising,
                financial planning, risk awareness, and building businesses in
                Tier-2 cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Preview */}
      <section className="border-t border-[#1a2332]/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-2">
                Programme
              </p>
              <h2 className="font-display text-3xl font-semibold">Two-Day Agenda</h2>
            </div>
            <Link href="/agenda" className="text-sm font-medium text-[#c9a227] hover:underline">
              Full schedule →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#1a2332]/10 p-8">
              <div className="text-[#c9a227] text-xs font-medium tracking-widest uppercase mb-2">
                Day 1
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">
                Explore Business & Franchise Opportunities
              </h3>
              <ul className="space-y-3 text-sm text-[#1a2332]/70">
                <li>• Inauguration & Welcome Address</li>
                <li>• Keynote: Future of Entrepreneurship in India</li>
                <li>• Panel: Is Franchising the Right Model for You?</li>
                <li>• Franchise Brand Presentations & Showcase</li>
                <li>• Masterclass: Selecting the Right Franchise</li>
                <li>• Entrepreneur Success Stories</li>
              </ul>
            </div>
            <div className="bg-white border border-[#1a2332]/10 p-8">
              <div className="text-[#c9a227] text-xs font-medium tracking-widest uppercase mb-2">
                Day 2
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">
                Investment, Growth & Business Connections
              </h3>
              <ul className="space-y-3 text-sm text-[#1a2332]/70">
                <li>• Keynote: Understanding Investment & Funding</li>
                <li>• Panel: Finding Investment for Entrepreneurs</li>
                <li>• Investor Connect Lounge</li>
                <li>• Business Pitch Arena</li>
                <li>• Financial Planning & Risk Awareness</li>
                <li>• One-to-One Meetings & Action Planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a2332] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Ready to explore your next business opportunity?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Registration is open. Venue and exact dates will be announced soon.
            Secure your place early.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-[#c9a227] text-[#1a2332] px-10 py-4 text-sm font-semibold tracking-wide hover:bg-white transition"
          >
            Register for the Summit
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a2332]/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="font-display text-lg font-semibold mb-2">
                Franchise & Investment Summit
              </div>
              <p className="text-sm text-[#1a2332]/60 max-w-xs">
                Belagavi, Karnataka. Connecting entrepreneurs, brands and investors.
              </p>
            </div>
            <div className="text-sm text-[#1a2332]/60">
              <p>Contact: info@franchiseinvestment.summit</p>
              <p className="mt-1">Venue & dates: To Be Announced</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#1a2332]/10 text-xs text-[#1a2332]/40">
            © {new Date().getFullYear()} Franchise & Investment Summit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
