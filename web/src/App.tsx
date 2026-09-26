import { Banknote, Home, Smartphone, Send, WalletCards } from "lucide-react";
import { AppShell } from "./components/layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { Transfer } from "./pages/Transfer";
import { Wallet } from "./pages/Wallet";

const navItems=[
  {label:"Dashboard",href:"/",icon:<Home size={18}/>},
  {label:"Wallet",href:"/wallet",icon:<WalletCards size={18}/>},
  {label:"Transfers",href:"/transfer",icon:<Send size={18}/>},
  {label:"eSIM",href:"/esim",icon:<Smartphone size={18}/>},
  {label:"Earn",href:"/earn",icon:<Banknote size={18}/>}
];

export default function App(){
  const path=window.location.pathname;
  const active=path==="/wallet"?"Wallet":path==="/transfer"?"Transfers":"Dashboard";
  const page=path==="/wallet"?<Wallet/>:path==="/transfer"?<Transfer/>:<Dashboard/>;
  return <AppShell navItems={navItems} active={active} userName="Dre">{page}</AppShell>;
}