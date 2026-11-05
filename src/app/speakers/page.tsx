import Link from "next/link";

export default function SpeakersPage() {
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
            <Link href="/speakers" className="text-[#c9a227]">Speakers</Link>
            <Link href="/brands" className="hover:text-[#c9a227] transition">Brands</Link>
            <Link href="/venue" className="hover:text-[#c9a227] transition">Venue</Link>
            <Link href="/register" className="bg-[#1a2332] text-white px-5 py-2.5 rounded-sm hover:bg-[#c9a227] transition">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">Speakers & Experts</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2332] mb-4">
          Learn from Experienced Professionals
        </h1>
        <p className="text-[#1a2332]/60 text-sm mb-12 max-w-2xl">
          The summit will feature approximately 10–12 speakers and panelists including keynote speakers,
          franchise owners, investment professionals, finance and legal experts, and successful entrepreneurs.
        </p>

        <div className="bg-white border border-[#1a2332]/10 p-10 text-center mb-12">
          <p className="text-[#1a2332]/70 mb-2">Speaker profiles will be published once confirmed.</p>
          <p className="text-sm text-[#1a2332]/50">
            Only confirmed speakers with approved photographs and biographies will appear on this page.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#1a2332]/10 p-8">
            <h2 className="font-display text-xl font-semibold mb-4">Planned Speaker Mix</h2>
            <ul className="space-y-2 text-sm text-[#1a2332]/75">
              <li>• 2 Keynote speakers</li>
              <li>• 3 Franchise owners / operators</li>
              <li>• 2 Investment professionals</li>
              <li>• 1 Finance expert</li>
              <li>• 1 Legal expert</li>
              <li>• 2 Entrepreneurs / business-growth specialists</li>
              <li>• Moderator(s)</li>
            </ul>
          </div>

          <div className="bg-white border border-[#1a2332]/10 p-8">
            <h2 className="font-display text-xl font-semibold mb-4">Topics Covered</h2>
            <ul className="space-y-2 text-sm text-[#1a2332]/75">
              <li>• Future of entrepreneurship in India</li>
              <li>• Evaluating franchise models</li>
              <li>• Finding investment and funding</li>
              <li>• Financial planning and risk awareness</li>
              <li>• Building businesses in Tier-2 cities</li>
              <li>• Practical lessons from successful entrepreneurs</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-block bg-[#1a2332] text-white px-8 py-3.5 text-sm font-medium hover:bg-[#c9a227] transition"
          >
            Register to Attend
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
