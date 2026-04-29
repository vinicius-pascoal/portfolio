// src/app/sections/ContactSection.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, staggerParent, itemPop } from "@/components/anim";
import paper from "@/images/cartographer.png";
import {
  Mail, Phone, MapPin, MessageCircle,
  Github, Linkedin, Instagram,
  Copy, Check
} from "lucide-react";
import type { PortfolioContent } from "@/lib/portfolioContent";

type ContactItem = {
  key: string;
  label: string;
  value: string;
  href?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type SocialItem = {
  key: string;
  label: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const CONTACT_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  email: Mail,
  whatsapp: MessageCircle,
  phone: Phone,
  city: MapPin,
};

const SOCIAL_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

type ContactSectionProps = {
  isActive: boolean;
  content: PortfolioContent["contactSection"];
};

export default function ContactSection({ isActive, content }: ContactSectionProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    } catch { }
  };

  return (
    <section
      data-section="true"
      data-index={3}
      className="snap-start min-h-[100svh] md:h-[100svh] w-full bg-transparent overflow-y-auto md:overflow-hidden flex justify-center items-start md:items-center"
    >
      <div className="w-full max-w-7xl px-4 pt-8 pb-8 sm:px-6 sm:pt-10 md:py-0 mx-auto">
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 gap-y-8 md:gap-y-12 items-start md:items-center justify-items-center">
          <motion.div
            className="relative z-10 text-center md:text-left max-w-xl"
            initial="hidden"
            animate={isActive ? "show" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-slate-300/80">
              {content.eyebrow}
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl md:mt-2 md:text-5xl font-extrabold text-white drop-shadow">
              {content.title}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-300/90 leading-relaxed md:mt-4">
              {content.description}
            </p>
          </motion.div>

          <motion.div
            className="w-full md:max-w-2xl justify-self-center"
            initial="hidden"
            animate={isActive ? "show" : "hidden"}
            variants={scaleIn}
          >
            <div
              className="relative mx-auto w-full max-w-xl md:max-w-2xl rounded-xl md:rounded-2xl bg-slate-900/70 shadow-xl ring-1 ring-white/10 overflow-hidden max-h-[74svh] md:max-h-[68vh]"
              style={{
                backgroundImage: `url(${paper.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />
              <motion.div
                className="p-4 sm:p-5 md:p-6 space-y-5 md:space-y-6 overflow-y-auto overscroll-contain max-h-[calc(74svh-2rem)] md:max-h-[calc(68vh-2rem)]"
                variants={staggerParent(0.06)}
                initial="hidden"
                animate={isActive ? "show" : "hidden"}
              >
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-200/90">
                    {content.directContact}
                  </h3>
                  <ul className="space-y-2">
                    {content.contacts.map(({ key, label, value, href }) => {
                      const Icon = CONTACT_ICONS[key] ?? Mail;

                      return (
                        <motion.li key={key} variants={itemPop}>
                          <div className="flex items-start sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <Icon className="h-4 w-4 opacity-80 shrink-0" aria-hidden="true" />
                              <div className="min-w-0">
                                <p className="text-slate-400">{label}</p>
                                <p className="font-medium break-all sm:break-normal sm:truncate">{value}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap justify-end items-center gap-2 shrink-0">
                              {href && key !== "phone" && (
                                <a
                                  href={href}
                                  target={href.startsWith("http") ? "_blank" : undefined}
                                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-xs hover:bg-slate-900/30"
                                  aria-label={`${content.open} ${label}`}
                                  title={`${content.open} ${label}`}
                                >
                                  {content.open}
                                </a>
                              )}
                              {key !== "whatsapp" && (
                                <button
                                  onClick={() => copy(value, key)}
                                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-xs hover:bg-slate-900/30"
                                  aria-label={`${content.copy} ${label}`}
                                  title={`${content.copy} ${label}`}
                                >
                                  {copied === key ? (
                                    <>
                                      <Check className="h-3.5 w-3.5" /> {content.copied}
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3.5 w-3.5" /> {content.copy}
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-200/90">
                    {content.socialNetworks}
                  </h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 justify-items-center">
                    {content.socials.map(({ key, label, href }) => {
                      const Icon = SOCIAL_ICONS[key] ?? Github;

                      return (
                        <motion.li key={key} className="w-full" variants={itemPop}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 shadow-sm hover:shadow-md transition-all"
                            title={label}
                            aria-label={label}
                          >
                            <Icon className="h-4 w-4 opacity-80" aria-hidden="true" />
                            <span className="truncate">{label}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
