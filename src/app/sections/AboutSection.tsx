// src/app/sections/AboutSection.tsx
import Image from "next/image";
import personalImage from "@/images/perfil.jpg";

export default function AboutSection() {
  return (
    <section
      data-section="true"
      data-index={1}
      className="snap-start h-screen w-full grid place-items-center bg-transparent"
    >
      <div className="w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + texto "sobre mim" */}
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Sobre mim
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white drop-shadow">
              Quem sou e o que faço
            </h2>

            <p className="mt-4 max-w-prose text-slate-300/90 leading-relaxed">
              Sou um desenvolvedor apaixonado por criar experiências digitais
              que combinam performance, acessibilidade e design.{" "}
            </p>

            <p className="mt-3 max-w-prose text-slate-300/90 leading-relaxed">
              Aqui você encontrará alguns projetos e experimentos que gosto de
              construir no tempo livre, sempre com foco em qualidade e cuidado
              com os detalhes.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
