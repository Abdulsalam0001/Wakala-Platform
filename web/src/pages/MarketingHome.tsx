import { ArrowRight, Globe2, Smartphone, WalletCards, ShieldCheck, Zap, Send, BarChart3, LockKeyhole, CheckCircle2 } from "lucide-react";
import { Button } from "../components";

const features = [
  { icon: WalletCards, title: "One wallet", text: "Keep your money organised with a clear view of balances, activity and available funds." },
  { icon: Send, title: "Move money", text: "Designed for simple transfers across supported accounts and currencies." },
  { icon: Smartphone, title: "Stay connected", text: "Pair your financial tools with eSIM connectivity for life and travel across Africa." },
];

export function MarketingHome() {
  return <main className="min-h-screen overflow-hidden bg-wk-paper text-wk-ink">
    <header className="sticky top-0 z-30 border-b border-black/5 bg-wk-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-wk-ink text-sm font-black text-wk-gold">W</span><span className="text-xl font-bold tracking-tight">wakala</span></a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-black/50 md:flex">
          <a href="#features" className="hover:text-wk-ink">Features</a><a href="#how" className="hover:text-wk-ink">How it works</a><a href="#coverage" className="hover:text-wk-ink">Coverage</a>
        </nav>
        <div className="flex items-center gap-2"><a href="/auth" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold sm:block">Sign in</a><Button size="sm" rightIcon={<ArrowRight size={16}/>} onClick={()=>window.location.href="/auth"}>Get started</Button></div>
      </div>
    </header>

    <section className="relative">
      <div className="absolute right-[-12rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-wk-teal/10 blur-3xl"/>
      <div className="absolute left-[-10rem] top-[28rem] h-72 w-72 rounded-full bg-wk-gold/10 blur-3xl"/>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:pb-32">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-wk-teal/20 bg-white/70 px-3.5 py-2 text-xs font-bold text-wk-teal"><span className="h-2 w-2 rounded-full bg-wk-teal"/>Money, connectivity and more</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[.96] tracking-[-.05em] sm:text-6xl lg:text-7xl">Pay in your own currency, <span className="text-wk-teal">anywhere.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/55 sm:text-xl">Wakala brings your wallet, payments and connectivity together in one simple experience built for a more connected Africa.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="xl" rightIcon={<ArrowRight size={19}/>} onClick={()=>window.location.href="/auth"}>Get started</Button><a href="#features" className="inline-flex h-14 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-bold">Explore Wakala</a></div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-5 border-t border-black/8 pt-6"><div><p className="text-2xl font-semibold">1</p><p className="mt-1 text-xs text-black/45">connected wallet</p></div><div><p className="text-2xl font-semibold">4+</p><p className="mt-1 text-xs text-black/45">regional markets</p></div><div><p className="text-2xl font-semibold">24/7</p><p className="mt-1 text-xs text-black/45">digital access</p></div></div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-wk-ink/[.035] blur-2xl"/>
          <div className="relative rounded-[2rem] border border-black/8 bg-white p-3 shadow-[0_35px_100px_rgba(13,20,32,.14)] sm:p-5">
            <div className="rounded-[1.6rem] bg-wk-ink p-6 text-white sm:p-7">
              <div className="flex items-start justify-between"><div><p className="text-xs text-white/45">Total balance</p><p className="mt-2 text-4xl font-semibold tracking-tight">₦2,864,500</p></div><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-wk-gold"><WalletCards size={21}/></span></div>
              <div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/8 p-4"><p className="text-[11px] text-white/40">Available</p><p className="mt-1 font-semibold">₦2,814,500</p></div><div className="rounded-2xl bg-wk-teal p-4"><p className="text-[11px] text-white/65">Pending</p><p className="mt-1 font-semibold">₦50,000</p></div></div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-1 pt-4"><div className="rounded-2xl bg-wk-paper p-5"><p className="text-xs font-semibold text-black/40">Recent transfer</p><p className="mt-2 font-bold">Amina · ₦45,000</p><p className="mt-1 text-xs text-wk-teal">Completed</p></div><div className="rounded-2xl bg-wk-teal/10 p-5"><p className="text-xs font-semibold text-wk-teal">eSIM</p><p className="mt-2 font-bold">Regional data</p><p className="mt-1 text-xs text-black/45">Coming soon</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" className="border-y border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-wk-teal">Built around you</p><h2 className="mt-3 text-4xl font-semibold tracking-tight">Your everyday financial tools, in one place.</h2></div><p className="max-w-md leading-7 text-black/45">Simple enough for everyday payments. Structured for a future where borders feel less complicated.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{features.map(({icon:Icon,title,text})=><article key={title} className="rounded-[1.75rem] border border-black/7 bg-wk-paper p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-wk-ink text-wk-gold"><Icon size={21}/></div><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-black/50">{text}</p><div className="mt-7 flex items-center gap-2 text-sm font-bold text-wk-teal"><CheckCircle2 size={16}/> Designed for clarity</div></article>)}</div>
      </div>
    </section>

    <section id="how" className="bg-wk-paper"><div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-wk-teal">How it works</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">From wallet to payment in a few simple steps.</h2><div className="mt-10 space-y-6">{[["01","Create your account","Set up your Wakala profile and get your wallet ready."],["02","Fund your wallet","Add money through supported payment channels."],["03","Move and manage","Transfer, track activity and manage connectivity from one place."]].map(([n,t,d])=><div key={n} className="flex gap-5"><span className="font-mono text-sm font-bold text-wk-gold">{n}</span><div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm leading-6 text-black/45">{d}</p></div></div>)}</div></div><div className="rounded-[2rem] bg-wk-ink p-7 text-white sm:p-9"><div className="grid grid-cols-2 gap-4"><div className="rounded-2xl bg-white/7 p-5"><BarChart3 className="text-wk-gold"/><p className="mt-10 text-sm font-semibold">Clear activity</p><p className="mt-2 text-xs leading-5 text-white/40">See what is moving through your wallet.</p></div><div className="rounded-2xl bg-wk-teal p-5"><Globe2/><p className="mt-10 text-sm font-semibold">Cross-border ready</p><p className="mt-2 text-xs leading-5 text-white/70">Designed around regional movement.</p></div><div className="col-span-2 rounded-2xl border border-white/10 p-5"><div className="flex items-center gap-3"><LockKeyhole size={18} className="text-wk-gold"/><span className="font-semibold">Security-first foundations</span></div><p className="mt-2 text-sm leading-6 text-white/45">Authentication, transaction controls and provider reconciliation are being built into the platform.</p></div></div></div></div></section>

    <section id="coverage" className="bg-wk-ink text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24"><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-wk-gold">Regional vision</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Made for movement across Africa.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/50">Wakala is being shaped around the markets and corridors people use every day.</p></div><div className="flex items-center gap-2 text-sm text-white/50"><ShieldCheck size={17} className="text-wk-teal"/> Built with security in mind</div></div><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{["Nigeria","Kenya","Rwanda","Tanzania"].map(c=><div key={c} className="rounded-2xl border border-white/10 bg-white/[.04] p-6 text-center font-semibold">{c}</div>)}</div></div></section>
    <footer className="bg-wk-paper"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-9 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8"><span className="font-bold">wakala</span><span className="text-black/40">Money and connectivity for a more connected Africa.</span></div></footer>
  </main>;
}