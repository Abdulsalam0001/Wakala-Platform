import { Banknote, Home, Smartphone, Send, WalletCards } from "lucide-react";
import { AppShell } from "./components/layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { Transfer } from "./pages/Transfer";
import { Wallet } from "./pages/Wallet";
import { Auth } from "./pages/Auth";
import { MarketingHome } from "./pages/MarketingHome";\nimport { Esim } from "./pages/Esim";\nimport { Earn } from "./pages/Earn";

const navItems=[{label:"Dashboard",href:"/dashboard",icon:<Home size={18}/>},{label:"Wallet",href:"/wallet",icon:<WalletCards size={18}/>},{label:"Transfers",href:"/transfer",icon:<Send size={18}/>},{label:"eSIM",href:"/esim",icon:<Smartphone size={18}/>},{label:"Earn",href:"/earn",icon:<Banknote size={18}/>}];

export default function App(){const path=window.location.pathname;const active=path==="/dashboard"?"Dashboard":path==="/wallet"?"Wallet":path==="/transfer"?"Transfers":path==="/esim"?"eSIM":path==="/earn"?"Earn":"";
const page=path==="/"||path==="/home"?<MarketingHome/>:path==="/auth"?<Auth/>:path==="/dashboard"?<AppShell navItems={navItems} active={active} userName="Dre"><Dashboard/></AppShell>:path==="/wallet"?<AppShell navItems={navItems} active={active} userName="Dre"><Wallet/></AppShell>:path==="/transfer"?<AppShell navItems={navItems} active={active} userName="Dre"><Transfer/></AppShell>:path==="/esim"?<AppShell navItems={navItems} active={active} userName="Dre"><Esim/></AppShell>:path==="/earn"?<AppShell navItems={navItems} active={active} userName="Dre"><Earn/></AppShell>:<MarketingHome/>;return page;}