"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Lossless Youths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image:
      "https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg",
  },
  {
    title: "Estrange Bond",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image:
      "https://i.redd.it/tc0aqpv92pn21.jpg",
  },
  {
    title: "The Gate Keeper",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image:
      "https://wharferj.files.wordpress.com/2015/11/bio_north.jpg",
  },
  {
    title: "Last Trace Of Us",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image:
      "https://images7.alphacoders.com/878/878663.jpg",
  },
  {
    title: "Urban Decay",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image:
      "https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <main
      className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden flex"
      style={{
        backgroundImage: `url(${slides[current].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay para escurecer o fundo */}
      <div className="absolute inset-0 "></div>

      {/* Conteúdo do slide principal */}
      <section className="relative z-10 flex-1 p-12 max-w-2xl flex flex-col justify-center text-white">
        <h2 className="uppercase font-extrabold text-3xl md:text-5xl mb-6 drop-shadow-md">
          "{slides[current].title}"
        </h2>
        <p className="mb-8 max-w-lg leading-relaxed drop-shadow-md">
          {slides[current].description}
        </p>
        <button className="w-max border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition drop-shadow-md">
          Read More
        </button>
      </section>

      {/* Miniaturas à direita */}
      <aside className="relative z-10 flex items-center space-x-6 pr-12">
        {slides.map((slide, idx) => {
          // não mostrar miniatura do slide atual
          if (idx === current) return null;
          return (
            <motion.img
              key={idx}
              src={slide.image}
              alt={slide.title}
              onClick={() => setCurrent(idx)}
              className="w-32 h-48 rounded-xl object-cover cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              style={{
                filter: "brightness(0.75)",
                boxShadow:
                  idx === current ? "0 0 20px 5px rgba(255,255,255,0.8)" : "",
              }}
            />
          );
        })}
      </aside>

      {/* Navegação inferior */}
      <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-5 z-20">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="btn-nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="btn-nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>

      <style jsx>{`
        .btn-nav {
          background-color: rgba(255 255 255 / 0.5);
          border: 2px solid rgba(0 0 0 / 0.6);
          border-radius: 9999px;
          padding: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn-nav:hover {
          background-color: rgba(255 255 255 / 0.3);
        }
      `}</style>
    </main>
  );
}
