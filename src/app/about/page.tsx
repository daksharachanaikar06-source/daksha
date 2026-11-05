import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <header className="border-b border-[#1a2332]/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-[#1a2332]">
            Franchise & Investment Summit
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1a2332]/80">
            <Link href="/about" className="text-[#c9a227]">About</Link>
            <Link href="/agenda" className="hover:text-[#c9a227] transition">Agenda</Link>
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
        <p className="text-[#c9a227] text-sm font-medium tracking-widest uppercase mb-3">About the Event</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1a2332] mb-8">
          Franchise & Investment Summit
        </h1>

        <div className="max-w-3xl space-y-6 text-[#1a2332]/80 leading-relaxed">
          <p>
            The Franchise & Investment Summit is a two-day business event planned in Belagavi, Karnataka.
            It connects people who want to start or expand a business with franchise brands, investors,
            successful entrepreneurs, and business experts.
          </p>
          <p>
            Participants can explore franchise models, understand investment requirements, learn about
            funding and financial planning, attend expert sessions, and take part in networking and
            one-to-one meetings. The summit is designed to turn useful conversations into potential
            business enquiries, partnerships, and future opportunities.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10">
          <div className="bg-white border border-[#1a2332]/10 p-8">
            <h2 className="font-display text-xl font-semibold mb-4">Main Objectives</h2>
            <ul className="space-y-3 text-sm text-[#1a2332]/75">
              <li>• Promote entrepreneurship and business development in Belagavi and North Karnataka</li>
              <li>• Create networking opportunities between entrepreneurs, brands, investors, and professionals</li>
              <li>• Provide practical knowledge about finance, legal considerations, and business growth</li>
              <li>• Connect business owners with investors and funding experts</li>
              <li>• Help aspiring entrepreneurs evaluate and start a business</li>
              <li>• Introduce participants to franchise brands and business models</li>
            </ul>
          </div>

          <div className="bg-white border border-[#1a2332]/10 p-8">
            <h2 className="font-display text-xl font-semibold mb-4">Who Should Attend</h2>
            <ul className="space-y-3 text-sm text-[#1a2332]/75">
              <li>• Aspiring entrepreneurs and prospective franchise buyers</li>
              <li>• Existing business owners looking to expand or diversify</li>
              <li>• Franchise brands and franchisors</li>
              <li>• Investors, angel investors, and funding representatives</li>
              <li>• Students and young entrepreneurs</li>
              <li>• Professional service providers (finance, legal, consulting)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-[#1a2332] text-white p-10 text-center">
          <h2 className="font-display text-2xl font-semibold mb-3">Ready to join?</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto text-sm">
            Venue and exact dates will be announced soon. Register early to secure your place.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#c9a227] text-[#1a2332] px-8 py-3 text-sm font-semibold hover:bg-white transition"
          >
            Register Now
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
