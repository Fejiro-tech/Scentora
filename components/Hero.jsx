"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const stats = [
    { num: "200+", label: "Fragrances" },
    { num: "18", label: "Maisons" },
    { num: "∞", label: "Moments" },
  ];

  // background images
  const backgrounds = [
    "/herobg.png",
    "/herobg2.jpg",
    "/herobg5.jpg",
  ];

  const [index, setIndex] = useState(0);

  // auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section className="relative overflow-hidden min-h-[80vh] bg-black font-['Montserrat'] ">

      {/* BACKGROUND SLIDER */}
      <AnimatePresence mode="sync">
        <motion.img
          key={backgrounds[index]}
          src={backgrounds[index]}
          alt="hero background"
          className="absolute inset-0 w-full h-full object-cover"

          initial={{
            opacity: 0,
            scale: 1.08,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 1.02,
          }}

          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      {/* overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,5,5,0.65)_0%,rgba(15,5,5,0.45)_35%,rgba(15,5,5,0.2)_60%,transparent_100%)]" />

      <div className="absolute inset-0 bg-black/35" />

      {/* Accent line */}
      <div className="hidden lg:block absolute left-[38%] inset-y-0 w-px bg-linear-to-b from-transparent via-[rgba(200,160,100,0.21)] to-transparent" />

      {/* Vertical text */}
      <span className="hidden lg:block absolute top-50  lg:right-8 z-20 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[3px] italic text-[rgba(218,169,97,0.45)] font-['Cormorant_Garamond']">
        Maison de Parfum
      </span>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex justify-center min-h-[80vh] px-6 sm:px-8 md:px-10 lg:px-16 pt-16">

        {/* Text Content */}
        <div className="flex flex-col justify-center pt-2 sm:pt-32 lg:pt-20 pb-12 lg:pb-0 max-w-130">

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <span className="block w-10 h-px mb-3 bg-[rgba(200,155,90,0.65)]" />

            <p className="text-[10px] sm:text-[11px] tracking-[4px] uppercase font-semibold text-[rgba(200,160,100,0.75)]">
              Luxury Perfume Experience
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-['Cormorant_Garamond'] text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] leading-[1.05] font-light text-[#f8f4ef]"
          >
            Scents that{" "}
            <em className="italic text-[rgba(220,185,145,0.95)]">
              Define You
            </em>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-105 text-[14px] sm:text-[15px] leading-[1.9] text-[rgba(220,210,200,0.72)] font-light"
          >
            More than fragrance — each bottle holds a memory,
            a moment, a mood waiting to unfold on your skin.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <Link href="/store" className="group inline-flex items-center gap-3 border border-[rgba(200,160,100,0.45)] px-6 sm:px-7 py-4 text-[10px] tracking-[4px] uppercase font-semibold text-[#f5efe8] hover:bg-[rgba(200,160,100,0.08)] transition-all">
              Find Your Scent

              <img
                src="/arrow.svg"
                alt="arrow"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-y-5 mt-10 pt-6 border-t border-[rgba(200,160,100,0.21)]"
          >
            {stats.map(({ num, label }) => (
              <div
                key={label}
                className="w-1/3 flex flex-col items-center"
              >
                <span className="text-[24px] sm:text-[28px] text-[rgba(220,190,150,0.92)]">
                  {num}
                </span>

                <span className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[3px] text-[rgba(200,160,100,0.45)]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;