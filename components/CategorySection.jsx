"use client";

import CategoryCard from "./CetegoryCard";
import { motion } from "framer-motion";

const categories = [
  {
    category: "Floral",
    image: "/perfume2.avif",
    description: "",
  },
  {
    category: "Woody",
    image: "/noir-perf.jpeg",
    description: "",
  },
  {
    category: "Sweet",
    image: "/amber-perf.webp",
    description: "",
  },
  {
    category: "Amber",
    image: "/perfume2.webp",
    description: "",
  },
];

const CategorySection = () => {
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
      className="w-full max-w-7xl mx-auto bg-[#140909] px-10 py-20"
    >
      <div className="text-center font-['Cormorant_Garamond']">

        {/* HEADER */}
        <motion.h1
          variants={item}
          className="text-[rgba(200,160,100,0.8)] font-bold text-[10px] md:text-[12px] tracking-[4px] uppercase mb-2"
        >
          Explore Categories
        </motion.h1>

        <motion.p
          variants={item}
          className="font-bold text-lg md:text-2xl tracking-[4px]"
        >
          Find your{" "}
          <span className="text-[rgba(220,185,145,0.95)] italic">
            Perfect
          </span>{" "}
          Scent
        </motion.p>

        <motion.p
          variants={item}
          className="mb-12 text-[rgba(220,185,145,0.95)] text-sm md:text-base"
        >
          Every fragrance tells a story. Explore our scent families and discover
          the one that truly defines you.
        </motion.p>

        {/* MOBILE SCROLL */}
        <motion.div variants={container} className="w-full">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide lg:hidden px-2">
            {categories.map((itemData, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="min-w-[60%] sm:min-w-[50%] md:min-w-[45%] flex-shrink-0 rounded-2xl"
              >
                <CategoryCard
                  image={itemData.image}
                  category={itemData.category}
                  description={itemData.description}
                />
              </motion.div>
            ))}
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {categories.map((itemData, idx) => (
              <motion.div key={idx} variants={item}>
                <CategoryCard
                  image={itemData.image}
                  category={itemData.category}
                  description={itemData.description}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default CategorySection;