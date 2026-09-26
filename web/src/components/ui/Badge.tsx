import type { HTMLAttributes } from "react"; import { cn } from "../../lib/cn";
export type BadgeTone="neutral"|"success"|"warning"|"danger"|"info";
const tones:Record<BadgeTone,string>={neutral:"bg-black/[0.05] text-black/60",success:"bg-wk-teal/10 text-wk-teal",warning:"bg-wk-gold/15 text-[#8a5d0b]",danger:"bg-red-50 text-red-700",info:"bg-sky-50 text-sky-700"};
export function Badge({tone="neutral",className,...props}:HTMLAttributes<HTMLSpanElement>&{tone?:BadgeTone}){return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",tones[tone],className)} {...props}/>}
