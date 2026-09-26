import { ArrowRight, Globe2, Smartphone, WalletCards, ShieldCheck, Zap, ChevronRight } from "lucide-react";
import { Button } from "../components";

const features = [
  { icon: WalletCards, title: "One wallet, multiple currencies", text: "Keep your money organised and ready for the places you actually use it." },
  { icon: Globe2, title: "Built for moving across borders", text: "Wakala is designed around everyday payments for people living, working and travelling across Africa." },
  { icon: Smartphone, title: "Stay connected", text: "Get eSIM connectivity alongside your financial tools, so your wallet and connectivity travel together." },
];

export function MarketingHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-wk-paper text-wk-ink">
      <header className="relative z-20 border-b border-black/5 bg-wk-paper/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Wakala home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-wk-ink text-sm font-black text-wk-gold">W</span>
            <span className="text-xl font-bold tracking-tight">wakala</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-black/55 md:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="transition hover:text-wk-ink">How it works</a>
            <a href="#features" className="transition hover:text-wk-ink">Features</a>
            <a href="#connectivity" className="transition hover:text-wk-ink">eSIM</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/auth" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold sm:block">Sign in</a>
            <Button asChild={false} size="sm" rightIcon={<ArrowRight size={16} />} onClick={() => { window.location.href = "/auth"; }}>Get started</Button>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-wk-teal/10 blur-3xl" />
        <div className="absolute -left-32 top-72 h-72 w-72 rounded-full bg-wk-gold/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-wk-teal/20 bg-white/70 px-3.5 py-2 text-xs font-bold text-wk-teal">
              <span className="h-2 w-2 rounded-full bg-wk-teal" />
              Money, connectivity and more
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Pay in your own currency, <span className="text-wk-teal">anywhere.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/55 sm:text-xl">
              Wakala brings your wallet, cross-border payments and connectivity together in one simple experience built for modern Africa.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" rightIcon={<ArrowRight size={19} />} onClick={() => { window.location.href = "/auth"; }}>
                Get started
              </Button>
              <a href="#how-it-works" className="inline-flex h-14 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-bold transition hover:border-black/20 hover:bg-black/[0.02]">
                See how it works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-black/45">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} /> Secure by design</span>
              <span className="inline-flex items-center gap-2"><Zap size={15} /> Fast, simple experience</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-wk-ink/[0.035] blur-xl" />
            <div className="relative rounded-[2rem] border border-black/8 bg-white p-4 shadow-[0_30px_80px_rgba(13,20,32,0.12)] sm:p-6">
              <div className="rounded-[1.5rem] bg-wk-ink p-5 text-white sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/45">Total balance</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">₦2,864,500</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-wk-gold"><WalletCards size={21} /></span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/8 p-4"><p className="text-[11px] text-white/40">Available</p><p className="mt-1 font-semibold">₦2,814,500</p></div>
                  <div className="rounded-2xl bg-wk-teal p-4"><p className="text-[11px] text-white/65">Pending</p><p className="mt-1 font-semibold">₦50,000</p></div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-wk-paper p-4"><p className="text-xs font-semibold text-black/40">Send money</p><p className="mt-2 text-sm font-bold">Transfer securely</p></div>
                <div className="rounded-2xl bg-wk-teal/10 p-4"><p className="text-xs font-semibold text-wk-teal">Connectivity</p><p className="mt-2 text-sm font-bold">eSIM ready</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-wk-teal">One platform</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to move with confidence.</h2>
            <p className="mt-4 leading-7 text-black/50">From keeping money available to staying connected when you travel, Wakala is designed around the way people move today.</p>
          </div>
          <div id="features" className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[1.75rem] border border-black/7 bg-wk-paper p-7">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-wk-ink text-wk-gold"><Icon size={21} /></div>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-black/50">{text}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-wk-teal">Learn more <ChevronRight size={16} /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="connectivity" className="bg-wk-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-wk-gold">Wakala eSIM</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your wallet travels. Your connection should too.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/55">Keep your financial tools and mobile connectivity in one place, with eSIM support designed for life across borders.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <div className="flex items-center justify-between"><span className="text-sm font-semibold">Regional connectivity</span><span className="rounded-full bg-wk-teal/20 px-3 py-1 text-xs font-bold text-wk-teal">Coming soon</span></div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Nigeria", "Kenya", "Rwanda", "Tanzania"].map(country => <div key={country} className="rounded-2xl bg-white/5 px-3 py-4 text-center text-sm font-semibold">{country}</div>)}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-wk-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-black/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="font-bold text-wk-ink">wakala</div>
          <p>Money and connectivity, built for modern Africa.</p>
        </div>
      </footer>
    </main>
  );
}
