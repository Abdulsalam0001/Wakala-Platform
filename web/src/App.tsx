import { ArrowRight, Globe2, Menu, ShieldCheck, Smartphone, WalletCards, X } from "lucide-react";
import { useState } from "react";
import { BalanceCard, Button, Card, TransactionList, type TransactionRowProps } from "./components";

const features = [
  { icon: WalletCards, title: "One wallet", text: "Keep your money organised across supported currencies in one simple account." },
  { icon: Globe2, title: "Move money", text: "Send and receive money across markets without rebuilding your financial life each time." },
  { icon: Smartphone, title: "Stay connected", text: "Wakala is being built around payments, connectivity and everyday financial access." },
];

const demoTransactions: TransactionRowProps[] = [
  { title: "Transfer to Kenya", description: "Today · International transfer", amount: -450, currency: "USD", status: "completed", type: "transfer" },
  { title: "Wallet top up", description: "Yesterday · Bank transfer", amount: 1200, currency: "USD", status: "completed", type: "deposit" },
  { title: "Card payment", description: "Sep 24 · Everyday payment", amount: -84.5, currency: "USD", status: "processing", type: "card" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Payments", "Wallet", "Coverage", "About"];

  return (
    <main className="min-h-screen overflow-hidden bg-wk-paper text-wk-ink">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-wk-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight" aria-label="Wakala home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-wk-ink text-sm font-black text-wk-gold">W</span>
            <span className="text-xl">wakala</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
            {navItems.map((item) => <a key={item} href={item === "About" ? "#about" : "#" + item.toLowerCase()} className="transition hover:opacity-60">{item}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex"><Button variant="ghost">Sign in</Button><Button variant="success">Get started</Button></div>
          <button className="rounded-xl p-2 md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="border-t border-black/5 px-5 py-5 md:hidden" aria-label="Mobile navigation"><div className="flex flex-col gap-4 text-sm font-semibold">
          {navItems.map((item) => <a key={item} href={item === "About" ? "#about" : "#" + item.toLowerCase()} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <div className="mt-2 flex gap-2 border-t border-black/5 pt-4"><Button variant="secondary" className="flex-1">Sign in</Button><Button variant="success" className="flex-1">Get started</Button></div>
        </div></nav>}
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-wk-teal/20 bg-wk-teal/8 px-3.5 py-2 text-xs font-bold text-wk-teal"><span className="h-2 w-2 rounded-full bg-wk-teal" />Built for a more connected Africa</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Pay in your own currency, anywhere.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-wk-ink/65">Wakala brings wallets, payments and connectivity together so moving through different markets feels simpler.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="xl" rightIcon={<ArrowRight size={18} />}>Get started</Button><Button variant="secondary" size="xl">Explore Wakala</Button></div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-wk-ink/55"><span className="flex items-center gap-2"><ShieldCheck size={16} /> Secure by design</span><span>Multi-currency</span><span>Payments + connectivity</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-wk-gold/25 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-wk-teal/20 blur-3xl" />
            <div className="relative rounded-[2.5rem] border border-black/10 bg-wk-ink p-4 shadow-2xl shadow-wk-ink/15">
              <BalanceCard amount={12840.5} currency="USD" available={11200.5} pending={1640} />
              <div className="mt-3 rounded-3xl bg-wk-paper p-5">
                <div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold">Supported balances</span><span className="text-xs font-semibold text-black/40">4 currencies</span></div>
                <div className="grid grid-cols-3 gap-3">{[["USD", "$8,420"], ["NGN", "₦3.1m"], ["KES", "KSh 172k"]].map(([currency, amount]) => <div key={currency} className="rounded-2xl border border-black/8 bg-white p-3"><div className="text-xs font-bold text-black/45">{currency}</div><div className="mt-2 text-sm font-bold">{amount}</div></div>)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="payments" className="border-y border-black/5 bg-white/50"><div className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-3 lg:px-8">{features.map(({ icon: Icon, title, text }) => <Card key={title} interactive><div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-wk-ink text-wk-gold"><Icon size={22} /></div><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-black/55">{text}</p></Card>)}</div></section>

      <section id="wallet" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div><TransactionList transactions={demoTransactions} onViewAll={() => {}} /></div>
          <Card className="bg-wk-ink text-white">
            <p className="text-sm font-semibold text-white/60">Built to grow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">One component system for the whole product.</h2>
            <p className="mt-4 leading-7 text-white/65">The same primitives can power onboarding, wallets, transfers, eSIM, Earn, customer dashboards and operations tooling without duplicating UI logic.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">{["Wallets", "Transfers", "eSIM", "Earn"].map((item) => <div key={item} className="rounded-2xl bg-white/[0.07] px-4 py-3 text-sm font-semibold">{item}</div>)}</div>
          </Card>
        </div>
      </section>

      <section id="coverage" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="rounded-[2.5rem] bg-wk-teal px-7 py-12 text-white sm:px-12"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-white/65">Coverage</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">One financial experience across markets.</h2><p className="mt-5 max-w-xl leading-7 text-white/75">Wakala is being designed for Nigeria, Kenya, Tanzania, Rwanda and Zanzibar, with more markets planned.</p></div><div className="mt-10 flex flex-wrap gap-3">{["Nigeria", "Kenya", "Tanzania", "Rwanda", "Zanzibar"].map((country) => <span key={country} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">{country}</span>)}</div></div></section>

      <footer id="about" className="border-t border-black/5"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-black/50 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} Wakala</span><span>Pay in your own currency, anywhere.</span></div></footer>
    </main>
  );
}
