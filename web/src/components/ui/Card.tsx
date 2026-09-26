import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
export interface CardProps extends HTMLAttributes<HTMLDivElement>{padded?:boolean;interactive?:boolean}
export function Card({className,padded=true,interactive=false,...props}:CardProps){return <div className={cn("rounded-3xl border border-black/[0.07] bg-white shadow-[0_8px_30px_rgb(13_20_32/0.04)]",padded&&"p-5 sm:p-6",interactive&&"transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgb(13_20_32/0.08)]",className)} {...props}/>}
export function CardHeader({className,...props}:HTMLAttributes<HTMLDivElement>){return <div className={cn("mb-5 flex items-start justify-between gap-4",className)} {...props}/>}
export function CardTitle({className,...props}:HTMLAttributes<HTMLHeadingElement>){return <h3 className={cn("text-base font-semibold tracking-tight text-wk-ink",className)} {...props}/>}
