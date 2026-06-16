"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProduct } from "@/app/context/ProductContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useProduct();

  // 🔥 SAFE fallback (prevents blank UI)
  const bestSellers = (products ?? [])
    .filter((p) => p.isBestSeller === true)
    .slice(0, 6);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  // ONLY TEXT ANIMATION (cleaner)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      id="best-sellers"
      className="w-full max-w-360 mx-auto bg-[#0f0a0a] py-30 px-6 md:px-10 relative"
    >
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        className="text-center mb-10 font-['Cormorant_Garamond'] pt-12"
      >
        <p className="text-[rgba(200,160,100,0.8)] uppercase text-[10px] tracking-[4px]">
          Customer Favorites
        </p>

        <h2 className="text-[#f5e6d3] text-2xl md:text-3xl font-bold tracking-[4px]">
          Best Sellers
        </h2>

        <p className="text-[#c8a064] text-sm mt-2">
          Most loved fragrances by our customers
        </p>
      </motion.div>

      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-[#1a1212] border border-[#3a2a2a] text-[#c8a064] p-3 rounded-full hover:scale-105 transition"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-[#1a1212] border border-[#3a2a2a] text-[#c8a064] p-3 rounded-full hover:scale-105 transition"
      >
        <FaChevronRight />
      </button>

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-2 scroll-smooth"
      >
        {bestSellers.map((product, i) => (
          <motion.div
            key={product.id}
            variants={fadeUp}
            transition={{ delay: i * 0.05 }}
            className="min-w-[75%] sm:min-w-[45%] lg:min-w-[25%]"
          >
            <Link
              href={`/store/perfume/${product.slug}`}
              className="block bg-[#1a1212] border border-[#3a2a3a] rounded-2xl p-5 hover:scale-[1.02] transition"
            >
              <div className="relative h-60 flex items-center justify-center bg-[#120c0c] rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="object-contain"
                />

                <span className="absolute top-3 left-3 bg-[#c8a064] text-black text-[10px] px-3 py-1 rounded-full">
                  Best Seller
                </span>
              </div>

              <div className="mt-4 text-left">
                <h3 className="text-[#f5e6d3] uppercase tracking-[2px] text-sm">
                  {product.name}
                </h3>

                <p className="text-gray-400 text-xs mt-1">
                  {product.category}
                </p>

                <p className="text-[#c8a064] font-semibold mt-2">
                  ₦{product.price}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BestSeller;