"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import crossword from "../images/projetos/crossword.png";

interface Slide {
  title: string;
  description: string;
  image: any;
  url: string;
}

const slides: Slide[] = [
  {
    title: "Palavra Cruzada",
    description:
      "Jogo de palavras cruzadas, onde você pode testar seu conhecimento e aprender novas palavras.",
    image: crossword,
    url: "https://crossword-liart.vercel.app",
  },
  {
    title: "Estrange Bond",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image: "https://i.redd.it/tc0aqpv92pn21.jpg",
    url: "https://estrangebond.vercel.app/",
  },
  {
    title: "The Gate Keeper",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image: "https://wharferj.files.wordpress.com/2015/11/bio_north.jpg",
    url: "https://thegatekeeper.vercel.app/",
  },
  {
    title: "Last Trace Of Us",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image: "https://images7.alphacoders.com/878/878663.jpg",
    url: "https://lasttraceofus.vercel.app/",
  },
  {
    title: "Urban Decay",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
    image:
      "https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg",
    url: "https://urbandecay.vercel.app/",
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
      className="relative w-full mx-auto overflow-hidden flex"
      style={{
        height: "500px",
        backgroundImage: `url(${
          slides[current].image.src || slides[current].image
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay para escurecer o fundo */}
      <div className="absolute inset-0  "></div>

      <motion.section
        key={current} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex-1 p-5 max-w-2xl flex flex-col justify-center my-auto text-white bg-rgba(0, 0, 0, 0.2) backdrop-blur-md h-fit rounded-lg mr-0 md:mx-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="uppercase font-extrabold text-3xl md:text-5xl mb-6 drop-shadow-md"
        >
          "{slides[current].title}"
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 max-w-lg leading-relaxed drop-shadow-md"
        >
          {slides[current].description}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          href={slides[current].url}
          className="w-max border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition drop-shadow-md"
        >
          Read More
        </motion.a>
      </motion.section>

      <aside className="relative z-10 items-center space-x-6 pr-12 hidden md:flex">
        {slides.map((slide, idx) => {
          if (idx === current) return null;
          return (
            <motion.img
              key={idx}
              src={
                typeof slide.image === "string" ? slide.image : slide.image.src
              }
              alt={slide.title}
              onClick={() => setCurrent(idx)}
              className="w-32 h-48 rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform duration-300 "
              whileHover={{ scale: 1.1 }}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button onClick={nextSlide} aria-label="Next Slide" className="btn-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>

      <style jsx>{`
        .btn-nav {
          background-color: rgba(255 255 255 / 0.5);
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
