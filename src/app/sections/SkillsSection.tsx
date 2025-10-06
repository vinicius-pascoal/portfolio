// src/app/sections/SkillsSection.tsx
"use client";

import { Code2, Server, Database, Boxes, Layers, Rocket, Send } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerParent, itemPop, scaleIn } from "@/components/anim";
import paper from "@/images/cartographer.png";

type Group = "Linguagens" | "Frameworks & Libs" | "Back-end & DB" | "Ferramentas";

export type Skill = {
  key: string;
  label: string;
  group: Group;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SKILLS: Skill[] = [
  // Linguagens
  { key: "java", label: "Java", group: "Linguagens", icon: Code2 },
  { key: "python", label: "Python", group: "Linguagens", icon: Code2 },
  { key: "typescript", label: "TypeScript", group: "Linguagens", icon: Code2 },
  { key: "javascript", label: "JavaScript", group: "Linguagens", icon: Code2 },
  { key: "html", label: "HTML5", group: "Linguagens", icon: Code2 },
  { key: "css", label: "CSS3", group: "Linguagens", icon: Code2 },
  { key: "php", label: "PHP", group: "Linguagens", icon: Code2 },
  { key: "sql", label: "SQL", group: "Linguagens", icon: Code2 },

  // Frameworks & Libs
  { key: "vue", label: "Vue", group: "Frameworks & Libs", icon: Boxes },
  { key: "react", label: "React", group: "Frameworks & Libs", icon: Layers },
  { key: "next", label: "Next.js", group: "Frameworks & Libs", icon: Rocket },
  { key: "tailwind", label: "Tailwind CSS", group: "Frameworks & Libs", icon: Boxes },
  { key: "express", label: "Express", group: "Frameworks & Libs", icon: Server },
  { key: "spring", label: "Spring Boot", group: "Frameworks & Libs", icon: Server },

  // Back-end & DB
  { key: "node", label: "Node.js", group: "Back-end & DB", icon: Server },
  { key: "prisma", label: "Prisma", group: "Back-end & DB", icon: Database },
  { key: "mysql", label: "MySQL", group: "Back-end & DB", icon: Database },
  { key: "postgresql", label: "PostgreSQL", group: "Back-end & DB", icon: Database },
  { key: "mongodb", label: "MongoDB", group: "Back-end & DB", icon: Database },

  // Ferramentas
  { key: "postman", label: "Postman", group: "Ferramentas", icon: Send },
  { key: "docker", label: "Docker", group: "Ferramentas", icon: Boxes },
  { key: "git", label: "Git", group: "Ferramentas", icon: Boxes },
  { key: "github", label: "GitHub", group: "Ferramentas", icon: Boxes },
  { key: "beekeeper", label: "Beekeeper Studio", group: "Ferramentas", icon: Database },
  { key: "vscode", label: "VS Code", group: "Ferramentas", icon: Boxes },
];

const GROUP_ORDER: Group[] = ["Linguagens", "Frameworks & Libs", "Back-end & DB", "Ferramentas"];

export default function SkillsSection() {
  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: SKILLS.filter((s) => s.group === g),
  })).filter((g) => g.items.length > 0);

  return (
    <section
      data-section="true"
      data-index={2}
      className="snap-start h-screen w-full grid place-items-center bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + descrição */}
          <motion.div className="text-left" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Tecnologias & Skills
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white drop-shadow">
              Minha stack e ferramentas
            </h2>

            <p className="mt-4 max-w-prose text-slate-300/90 leading-relaxed">
              Aqui estão as tecnologias e ferramentas que utilizo no dia a dia.
            </p>
          </motion.div>

          {/* DIREITA — cartão com grupos e chips (capado ao viewport + scroll interno) */}
          <motion.div className="md:justify-self-end w-full md:w-[44rem]" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={scaleIn}>
            <div
              className="relative mx-auto w-full max-w-xl md:max-w-2xl
                         rounded-2xl bg-slate-900/70 shadow-xl ring-1 ring-white/10 ring-1 ring-white/10
                           overflow-hidden
                         max-h-[76dvh] md:max-h-[72vh]"
              style={{
                backgroundImage: `url(${paper.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />

              <motion.div className="p-5 md:p-6 space-y-6 overflow-y-auto overscroll-contain
                              max-h-[calc(76dvh-2rem)] md:max-h-[calc(72vh-2rem)]" variants={staggerParent(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                {grouped.map(({ group, items }) => (
                  <div key={group} className="space-y-3">
                    <h3 className="text-sm font-semibold tracking-wide text-slate-200 text-slate-200/90">
                      {group}
                    </h3>

                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {items.map((skill) => {
                        const Icon = skill.icon ?? Code2;
                        return (
                          <motion.li key={skill.key} variants={itemPop}>
                            <div
                              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 shadow-sm
                                         dark:bg-slate-900/40 dark:text-slate-200 border-white/10
                                         hover:shadow-md transition-all"
                              title={skill.label}
                            >
                              <Icon className="h-4 w-4 opacity-80" aria-hidden="true" />
                              <span className="truncate">{skill.label}</span>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </motion.div>

              {/* sombra/spot */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
