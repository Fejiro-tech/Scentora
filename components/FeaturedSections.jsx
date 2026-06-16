"use client";

import React from "react";
import FeaturedCard from "./FeaturedCard";
import { motion } from "framer-motion";
import { useProduct } from "@/app/context/ProductContext";

const FeaturedSections = () => {

  const { products } = useProduct();
  const featuredProducts = products.filter((product) => product.isFeatured)

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
      className="w-full bg-[#F7F3EE] px-8 md:px-18  py-20"
    >
      <div className="max-w-5xl mx-auto text-center">

        <motion.p
          variants={item}
          className="font-bold text-[rgba(200,160,100,0.8)] uppercase text-[10px] md:text-[12px] tracking-[4px]"
        >
          Curated Collections
        </motion.p>

        <motion.h1
          variants={item}
          className="text-[#1A1A1A] font-bold text-lg md:text-2xl tracking-[4px] font-['Cormorant_Garamond']"
        >
          Featured Fragances
        </motion.h1>

        <motion.p
          variants={item}
          className="mb-12 text-gray-900 text-sm md:text-base"
        >
          A refined selection of timeless and modern luxuries fragrances
        </motion.p>

        {/* GRID */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={item}>
              <FeaturedCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default FeaturedSections;