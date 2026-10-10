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
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-[#0f0a0a] px-6 py-20 text-[#F7F3EE] sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-xl md:mb-14">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[4px] text-[rgba(160,119,66,0.9)] md:text-xs">
            Explore the collection
          </p>

          <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            Find your{" "}
            <span className="italic text-[#A77E4D]">signature</span>{" "}
            scent
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#C7BDB2] md:text-base">
            Discover fragrance families, each with its own character and
            presence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <CategoryCard
            image={categories[0].image}
            category={categories[0].category}
            description={categories[0].description}
            featured
          />

          <div className="flex flex-col divide-y divide-[#514237]">
            {categories.slice(1).map((itemData) => (
              <CategoryCard
                key={itemData.category}
                image={itemData.image}
                category={itemData.category}
                description={itemData.description}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CategorySection;