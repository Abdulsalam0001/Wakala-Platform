import { ArrowRight, Globe2, Menu, ShieldCheck, Smartphone, WalletCards, X } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: WalletCards,
    title: "One wallet",
    text: "Keep your money organised across supported currencies in one simple account.",
  },
  {
    icon: Globe2,
    title: "Move money",
    text: "Send and receive money across markets without rebuilding your financial life each time.",
  },
  {
    icon: Smartphone,
    title: "Stay connected",
    text: "Wakala is being built around payments, connectivity and everyday financial access.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FBF7EF] text-[#0D1420]">
      <header className="border-b border-black/5 bg-[#FBF7EF]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0D1420] text-sm font-black text-[#E4A445]">W</span>
            <span className="text-xl">wakala</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#payments" className="transition hover:opacity-60">Payments</a>
            <a href="#wallet" className="transition hover:opacity-60">Wallet</a>
            <a href="#coverage" className="transition hover:opacity-60">Coverage</a>
            <a href="#about" className="transition hover:opacity-60">About</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-black/5">Sign in</button>
            <button className="rounded-full bg-[#229175] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-95">
              Get started
            </button>
          </div>

          <button
            className="rounded-xl p-2 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/5 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold">
              <a href="#payments" onClick={() => setMenuOpen(false)}>Payments</a>
              <a href="#wallet" onClick={() => setMenuOpen(false)}>Wallet</a>
              <a href="#coverage" onClick={() => setMenuOpen(false)}>Coverage</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </div>
          </div>
        )}
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#229175]/20 bg-[#229175]/8 px-3.5 py-2 text-xs font-bold text-[#16725c]">
              <span className="h-2 w-2 rounded-full bg-[#229175]" />
              Built for a more connected Africa
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Pay in your own currency, anywhere.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#0D1420]/65">
              Wakala brings wallets, payments and connectivity together so moving through different markets feels simpler.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0D1420] px-6 py-4 font-semibold text-white shadow-lg shadow-black/10 hover:-translate-y-0.5">
                Get started <ArrowRight size={18} />
              </button>
              <button className="rounded-2xl border border-black/10 bg-white/70 px-6 py-4 font-semibold hover:bg-white">
                Explore Wakala
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#0D1420]/55">
              <span className="flex items-center gap-2"><ShieldCheck size={16} /> Secure by design</span>
              <span>Multi-currency</span>
              <span>Payments + connectivity</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#E4A445]/25 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-[#229175]/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-black/10 bg-[#0D1420] p-4 shadow-2xl shadow-[#0D1420]/15">
              <div className="rounded-[2rem] bg-[#FBF7EF] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Total balance</span>
                  <span className="rounded-full bg-[#229175]/10 px-3 py-1 text-xs font-bold text-[#16725c]">Live</span>
                </div>
                <div className="mt-5 text-4xl font-semibold tracking-tight">$12,840.50</div>
                <div className="mt-1 text-sm text-black/45">Across 4 supported currencies</div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    ["USD", "$8,420"],
                    ["NGN", "₦3.1m"],
                    ["KES", "KSh 172k"],
                  ].map(([currency, amount]) => (
                    <div key={currency} className="rounded-2xl border border-black/8 bg-white p-3">
                      <div className="text-xs font-bold text-black/45">{currency}</div>
                      <div className="mt-2 text-sm font-bold">{amount}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-[#229175] p-4 text-white">
                  <div className="text-xs font-semibold text-white/70">Next transfer</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-semibold">To Kenya</span>
                    <span className="font-bold">$450.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="payments" className="border-y border-black/5 bg-white/50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-3 lg:px-8">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-black/7 bg-[#FBF7EF] p-7">
              <div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-[#0D1420] text-[#E4A445]">
                <Icon size={22} />
              </div>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-black/55">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="coverage" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-[2.5rem] bg-[#229175] px-7 py-12 text-white sm:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/65">Coverage</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">One financial experience across markets.</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/75">
              Wakala is being designed for Nigeria, Kenya, Tanzania, Rwanda and Zanzibar, with more markets planned.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Nigeria", "Kenya", "Tanzania", "Rwanda", "Zanzibar"].map((country) => (
              <span key={country} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer id="about" className="border-t border-black/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-black/50 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} Wakala</span>
          <span>Pay in your own currency, anywhere.</span>
        </div>
      </footer>
    </main>
  );
}
