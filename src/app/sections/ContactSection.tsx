// src/app/sections/ContactSection.tsx
"use client";

import React, { useState } from "react";
import paper from "@/app/images/cartographer.png";
import {
  Mail, Phone, MapPin, MessageCircle,
  Github, Linkedin, Instagram, Twitter, Globe,
  Copy, Check, Send
} from "lucide-react";

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

const CONTACTS: ContactItem[] = [
  { key: "email", label: "E-mail", value: "viniciuspascoal013@gmail.com", icon: Mail },
  { key: "whatsapp", label: "WhatsApp", value: "+55 (79) 99175-0501", href: "https://wa.me/5579991750501", icon: MessageCircle },
  { key: "phone", label: "Telefone", value: "+55 (79) 99175-0501", href: "tel:+5579991750501", icon: Phone },
  { key: "city", label: "Local", value: "ARACAJU", icon: MapPin },
];

const SOCIALS: SocialItem[] = [
  { key: "github", label: "GitHub", href: "https://github.com/vinicius-pascoal", icon: Github },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/vinicius-pascoal-queiroz-maynard-38854024a", icon: Linkedin },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/vinicius_pascoal_q", icon: Instagram },
];

export default function ContactSection() {
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
      // centraliza o "container" da seção no viewport
      className="snap-start min-h-[100dvh] w-full bg-transparent overflow-hidden grid place-items-center"
    >
      {/* container centralizado */}
      <div className="w-full max-w-7xl px-4 mx-auto">
        {/* grid de 2 colunas centralizado em ambas dimensões */}
        <div className="grid md:grid-cols-2 gap-8 gap-y-12 items-center justify-items-center">
          {/* ESQUERDA — título + texto (central no mobile, à esquerda no md+) */}
          <div className="relative z-10 text-center md:text-left max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Contato & Redes
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white drop-shadow">
              Vamos conversar?
            </h2>

            <p className="mt-4 text-slate-300/90 leading-relaxed">
              Curtiu o portfólio e quer trocar uma ideia, sugerir colaboração ou
              conversar sobre oportunidades? Me chama pelos canais abaixo.{" "}
            </p>

          </div>

          {/* DIREITA — cartão com contatos e redes (centralizado e com altura limitada) */}
          <div className="w-full md:w-[44rem] justify-self-center">
            <div
              className="relative mx-auto w-full max-w-xl md:max-w-2xl
                         rounded-2xl bg-slate-900/70 shadow-xl ring-1 ring-white/10 ring-1 ring-white/10
                           overflow-hidden
                         max-h-[70dvh] md:max-h-[68vh]"
            >
              {/* overlay gradiente igual aos cards */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />

              {/* conteúdo scrollável para não ultrapassar o viewport */}
              <div className="p-5 md:p-6 space-y-6 overflow-y-auto overscroll-contain
                              max-h-[calc(70dvh-2rem)] md:max-h-[calc(68vh-2rem)]">
                {/* Contatos diretos */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-200 text-slate-200/90">
                    Contato direto
                  </h3>
                  <ul className="space-y-2">
                    {CONTACTS.map(({ key, label, value, href, icon: Icon }) => (
                      <li key={key}>
                        <div
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/10
                                     bg-slate-900/60 px-3 py-2 text-sm text-slate-200 shadow-sm
                                     dark:bg-slate-900/40 dark:text-slate-200 border-white/10"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className="h-4 w-4 opacity-80 shrink-0" aria-hidden="true" />
                            <div className="min-w-0">
                              <p className="text-slate-500 dark:text-slate-400">{label}</p>
                              <p className="truncate font-medium">{value}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {href && (
                              <a
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-xs hover:bg-slate-900/30"
                                aria-label={`Abrir ${label}`}
                                title={`Abrir ${label}`}
                              >
                                Abrir
                              </a>
                            )}
                            <button
                              onClick={() => copy(value, key)}
                              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-xs hover:bg-slate-900/30"
                              aria-label={`Copiar ${label}`}
                              title={`Copiar ${label}`}
                            >
                              {copied === key ? (
                                <>
                                  <Check className="h-3.5 w-3.5" /> Copiado
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" /> Copiar
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Redes sociais */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-200 text-slate-200/90">
                    Redes sociais
                  </h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 justify-items-center">
                    {SOCIALS.map(({ key, label, href, icon: Icon }) => (
                      <li key={key} className="w-full">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center gap-2 rounded-xl border border-white/10
                                     bg-slate-900/60 px-3 py-2 text-sm text-slate-200 shadow-sm
                                     dark:bg-slate-900/40 dark:text-slate-200 border-white/10
                                     hover:shadow-md transition-all"
                          title={label}
                          aria-label={label}
                        >
                          <Icon className="h-4 w-4 opacity-80" aria-hidden="true" />
                          <span className="truncate">{label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* sombra/spot */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
