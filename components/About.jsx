"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="w-full bg-[#F7F3EE] px-8 py-20"
      id="about"
    >
      <div className="max-w-5xl mx-auto text-center py-14">

        {/* Title */}
        <motion.h2
          variants={item}
          className="text-2xl lg:text-4xl font-semibold text-black font-['Cormorant_Garamond']"
        >
          About Our Perfume Store
        </motion.h2>

        <motion.p
          variants={item}
          className="text-gray-600 mt-4 max-w-lg md:max-w-2xl text-sm md:text-base mx-auto leading-relaxed"
        >
          We believe fragrance is more than a scent — it's identity, memory, and emotion.
          Our collection is carefully curated to bring you luxurious perfumes that define elegance
          and personality.
        </motion.p>

        {/* CARDS */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-black font-['Cormorant_Garamond']">
              Premium Quality
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              We source high-end fragrances crafted with the finest ingredients.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-black font-['Cormorant_Garamond']">
              Unique Scents
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Every perfume is selected to offer a unique and memorable experience.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-black font-['Cormorant_Garamond']">
              Fast Delivery
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              Quick and reliable delivery right to your doorstep.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          variants={item}
          className="text-gray-500 mt-12 text-sm"
        >
          Crafted with passion for fragrance lovers.
        </motion.p>

      </div>
    </motion.section>
  );
};

export default About;