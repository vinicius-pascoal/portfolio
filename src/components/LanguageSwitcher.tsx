"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import paper from "@/images/cartographer.png";
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
    <details className="group fixed right-1 top-1 z-30 sm:left-1 sm:right-auto">
      <summary
        aria-label={ariaLabel}
        className="relative flex cursor-pointer list-none items-center gap-1.5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-xl ring-1 ring-white/10 backdrop-blur-md transition-all hover:shadow-2xl sm:gap-2 sm:px-3 sm:py-2 sm:text-[10px] sm:tracking-[0.18em]"
        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          backgroundImage: `url(${paper.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />
        <span className="text-sm leading-none">{currentFlag}</span>
        <span className="relative z-10">{labels[locale]}</span>
        <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
      </summary>

      <nav
        aria-label={ariaLabel}
        className="mt-2 w-32 max-w-[calc(100vw-0.5rem)] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 p-1 shadow-2xl ring-1 ring-white/10 backdrop-blur-md sm:w-36"
        style={{
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.45)",
          backgroundImage: `url(${paper.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />
        {locales.map((item) => {
          const active = item === locale;

          return (
            <Link
              key={item}
              href={`/${item}`}
              className={[
                "relative z-10 flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all",
                active
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-200/90 hover:bg-white/10 hover:text-white",
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
