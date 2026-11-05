import Link from "next/link";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <header className="border-b border-[#1a2332]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-[#1a2332]">
            Franchise & Investment Summit
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1a2332]/80">
            <Link href="/about" className="hover:text-[#c9a227] transition">About</Link>
            <Link href="/agenda" className="hover:text-[#c9a227] transition">Agenda</Link>
            <Link href="/speakers" className="hover:text-[#c9a227] transition">Speakers</Link>
            <Link href="/brands" className="text-[#c9a227]">Brands</Link>
            <Link href="/venue" className="hover:text-[#c9a227] transition">Venue</Link>
            <Link href="/register" className="bg-[#1a2332] text-white px-5 py-2.5 rounded-sm hover:bg-[#c9a227] transition">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">Franchise Brands</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2332] mb-4">
          Explore Franchise Opportunities
        </h1>
        <p className="text-[#1a2332]/60 text-sm mb-12 max-w-2xl">
          Meet participating franchise brands, understand their business models, indicative investment
          ranges, and expansion plans. Only confirmed brands will be listed here.
        </p>

        <div className="bg-white border border-[#1a2332]/10 p-10 text-center mb-12">
          <p className="text-[#1a2332]/70 mb-2">Participating brands will be announced once confirmed.</p>
          <p className="text-sm text-[#1a2332]/50">
            Expected sectors include food & beverage, education, healthcare, retail, fitness,
            technology, hospitality, and professional services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-[#1a2332]/10 p-6">
            <h3 className="font-display text-lg font-semibold mb-2">Franchise Showcase Zone</h3>
            <p className="text-sm text-[#1a2332]/70">
              Display area for participating brands to present their models, investment information,
              and answer questions from potential franchise partners.
            </p>
          </div>
          <div className="bg-white border border-[#1a2332]/10 p-6">
            <h3 className="font-display text-lg font-semibold mb-2">Brand Presentations</h3>
            <p className="text-sm text-[#1a2332]/70">
              Dedicated slots for brands to present their opportunity, followed by Q&A with
              interested participants.
            </p>
          </div>
          <div className="bg-white border border-[#1a2332]/10 p-6">
            <h3 className="font-display text-lg font-semibold mb-2">One-to-One Interactions</h3>
            <p className="text-sm text-[#1a2332]/70">
              Structured opportunities to meet brand representatives directly and discuss
              franchise possibilities.
            </p>
          </div>
        </div>

        <div className="bg-[#1a2332] text-white p-10 text-center">
          <h2 className="font-display text-2xl font-semibold mb-3">Interested in exhibiting?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto text-sm">
            Franchise brands can apply for exhibition space and presentation slots.
            Contact the organising team for details.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#c9a227] text-[#1a2332] px-8 py-3 text-sm font-semibold hover:bg-white transition"
          >
            Register Interest
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
