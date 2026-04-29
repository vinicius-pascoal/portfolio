"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { locales, type Locale } from "@/lib/portfolioContent";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: Record<Locale, string>;
  ariaLabel: string;
};

const FLAGS: Record<Locale, string> = {
  "pt-br": "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export default function LanguageSwitcher({ locale, labels, ariaLabel }: LanguageSwitcherProps) {
  const currentFlag = FLAGS[locale];

  return (
    <details className="group fixed left-1 top-1 z-30">
      <summary
        aria-label={ariaLabel}
        className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-xl ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-slate-900/80 hover:text-white"
      >
        <span className="text-sm leading-none">{currentFlag}</span>
        <span>{labels[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>

      <nav
        aria-label={ariaLabel}
        className="mt-2 w-32 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 p-1 shadow-2xl ring-1 ring-black/20 backdrop-blur-md"
      >
        {locales.map((item) => {
          const active = item === locale;

          return (
            <Link
              key={item}
              href={`/${item}`}
              className={[
                "flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all",
                active ? "bg-white text-slate-900 shadow-sm" : "text-slate-200/90 hover:bg-white/10 hover:text-white",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-sm leading-none">{FLAGS[item]}</span>
              <span>{labels[item]}</span>
            </Link>
          );
        })}
      </nav>
    </details>
  );
}
