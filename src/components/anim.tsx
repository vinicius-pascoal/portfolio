"use client";
import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22,1,0.36,1] as [number, number, number, number] } },
};

export const staggerParent = (stagger = 0.06) => ({
  hidden: {},
  show:   { transition: { staggerChildren: stagger } },
});

export const itemPop: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};
