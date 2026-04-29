// src/app/sections/SkillsSection.tsx
"use client";

import { Code2, Server, Database, Boxes, Layers, Rocket, Send } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerParent, itemPop, scaleIn } from "@/components/anim";
import paper from "@/images/cartographer.png";
import type { PortfolioContent } from "@/lib/portfolioContent";

type Group = "languages" | "frameworks" | "backend" | "tools";

export type Skill = {
  key: string;
  label: string;
  group: Group;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SKILLS: Skill[] = [
  // Linguagens
  { key: "java", label: "Java", group: "languages", icon: Code2 },
  { key: "python", label: "Python", group: "languages", icon: Code2 },
  { key: "typescript", label: "TypeScript", group: "languages", icon: Code2 },
  { key: "javascript", label: "JavaScript", group: "languages", icon: Code2 },
  { key: "dart", label: "Dart", group: "languages", icon: Code2 },
  { key: "csharp", label: "C#", group: "languages", icon: Code2 },
  { key: "html", label: "HTML5", group: "languages", icon: Code2 },
  { key: "css", label: "CSS3", group: "languages", icon: Code2 },
  { key: "sql", label: "SQL", group: "languages", icon: Code2 },

  // Frameworks & Libs
  { key: "vue", label: "Vue", group: "frameworks", icon: Boxes },
  { key: "react", label: "React", group: "frameworks", icon: Layers },
  { key: "next", label: "Next.js", group: "frameworks", icon: Rocket },
  { key: "tailwind", label: "Tailwind CSS", group: "frameworks", icon: Boxes },
  { key: "flutter", label: "Flutter", group: "frameworks", icon: Boxes },
  { key: "unity", label: "Unity", group: "frameworks", icon: Boxes },
  { key: "express", label: "Express", group: "frameworks", icon: Server },
  { key: "spring", label: "Spring Boot", group: "frameworks", icon: Server },

  // Back-end & DB
  { key: "node", label: "Node.js", group: "backend", icon: Server },
  { key: "prisma", label: "Prisma", group: "backend", icon: Database },
  { key: "mysql", label: "MySQL", group: "backend", icon: Database },
  { key: "postgresql", label: "PostgreSQL", group: "backend", icon: Database },
  { key: "mongodb", label: "MongoDB", group: "backend", icon: Database },

  // Ferramentas
  { key: "postman", label: "Postman", group: "tools", icon: Send },
  { key: "docker", label: "Docker", group: "tools", icon: Boxes },
  { key: "git", label: "Git", group: "tools", icon: Boxes },
  { key: "github", label: "GitHub", group: "tools", icon: Boxes },
  { key: "beekeeper", label: "Beekeeper Studio", group: "tools", icon: Database },
  { key: "vscode", label: "VS Code", group: "tools", icon: Boxes },
];

const GROUP_ORDER: Group[] = ["languages", "frameworks", "backend", "tools"];

type SkillsSectionProps = {
  isActive: boolean;
  content: PortfolioContent["skillsSection"];
};

export default function SkillsSection({ isActive, content }: SkillsSectionProps) {
  const [isExpandedMobile, setIsExpandedMobile] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const mobileCardMaxHeight = isExpandedMobile ? "max-h-[80svh]" : "max-h-[52svh]";
  const mobileContentMaxHeight = isExpandedMobile
    ? "max-h-[calc(80svh-4rem)] overflow-y-auto"
    : "max-h-[calc(52svh-4rem)] overflow-hidden";
  const mobileBottomSpacing = isMobile && isExpandedMobile ? "pb-8" : "pb-4";

  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: SKILLS.filter((s) => s.group === g),
  })).filter((g) => g.items.length > 0);

  const visibleGroups = isMobile && !isExpandedMobile ? grouped.slice(0, 2) : grouped;

  return (
    <section
      data-section="true"
      data-index={2}
      className="snap-start h-[100svh] w-full flex justify-center items-start md:items-center bg-transparent overflow-hidden"
    >
      <div className={`w-full max-w-7xl px-3 pt-5 ${mobileBottomSpacing} sm:px-6 sm:pt-10 md:py-0`}>
        <div className="grid items-start gap-4 md:items-center md:grid-cols-2 md:gap-8">
          {/* ESQUERDA — título + descrição */}
          <motion.div className="text-left" initial="hidden" animate={isActive ? "show" : "hidden"} variants={fadeInUp}>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              {content.eyebrow}
            </p>
            <h2 className="mt-1 text-xl sm:text-3xl md:mt-2 md:text-5xl font-extrabold text-white drop-shadow">
              {content.title}
            </h2>

            <p className="mt-2 max-w-prose text-xs sm:text-base text-slate-300/90 leading-relaxed md:mt-4">
              {content.description}
            </p>
          </motion.div>

          {/* DIREITA — cartão com grupos e chips (capado ao viewport + scroll interno) */}
          <motion.div className="md:justify-self-end w-full md:max-w-2xl" initial="hidden" animate={isActive ? "show" : "hidden"} variants={scaleIn}>
            <div
              className={`relative mx-auto w-full max-w-xl md:max-w-2xl
                         rounded-2xl bg-slate-900/70 shadow-xl ring-1 ring-white/10
                           overflow-hidden
                         ${mobileCardMaxHeight} md:max-h-[72vh]`}
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
                className={`p-4 md:p-6 space-y-5 md:space-y-6 overscroll-contain md:overflow-y-auto
                              ${mobileContentMaxHeight} md:max-h-[calc(72vh-2rem)]`}
                variants={staggerParent(0.05)}
                initial="hidden"
                animate={isActive ? "show" : "hidden"}
              >
                {visibleGroups.map(({ group, items }) => (
                  <div key={group} className="space-y-3">
                    <h3 className="text-xs md:text-sm font-semibold tracking-wide text-slate-200 ">
                      {content.groupLabels[group]}
                    </h3>

                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {items.map((skill) => {
                        const Icon = skill.icon ?? Code2;
                        return (
                          <motion.li key={skill.key} variants={itemPop}>
                            <div
                              className="group flex min-w-0 items-center gap-1.5 rounded-xl border bg-slate-900/60 px-2.5 py-2 text-[11px] leading-tight md:gap-2 md:px-3 md:text-sm text-slate-200 shadow-sm
                                         dark:bg-slate-900/40 dark:text-slate-200 border-white/10
                                         hover:shadow-md transition-all"
                              title={skill.label}
                            >
                              <Icon className="h-3.5 w-3.5 shrink-0 opacity-80 md:h-4 md:w-4" aria-hidden="true" />
                              <span className="truncate">{skill.label}</span>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </motion.div>

              <div className="md:hidden border-t border-white/10 bg-slate-900/35 backdrop-blur-sm px-4 pb-4 pt-3">
                <button
                  type="button"
                  onClick={() => setIsExpandedMobile((prev) => !prev)}
                  className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-sm transition-all hover:bg-slate-800/85 active:scale-[0.99]"
                  aria-expanded={isExpandedMobile}
                >
                  {isExpandedMobile ? content.showLess : content.showMore}
                </button>
              </div>

              {/* sombra/spot */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
