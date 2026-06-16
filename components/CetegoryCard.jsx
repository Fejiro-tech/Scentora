"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CategoryCard = ({ image, category, description }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/store/${category.toLowerCase()}`)}
      className="relative w-full h-[320px] md:h-[400px] lg:h-[420px] overflow-hidden rounded-2xl cursor-pointer group"
    >
      {/* Image */}
      <Image
        src={image}
        alt={category}
        fill
        className="
          object-cover 
          object-[center_top] 
          md:object-center 
          scale-95 
          md:scale-100 
          group-hover:scale-105 
          transition duration-700
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 z-10 w-full p-5 md:p-8 text-white">
        
        {/* Label */}
        <p className="text-[9px] md:text-[10px] uppercase tracking-[4px] text-[#D4A76A]">
          Scent Family
        </p>

        {/* Category */}
        <h2 className="mt-2 md:mt-3 text-2xl md:text-3xl lg:text-4xl font-light capitalize">
          {category}
        </h2>

        {/* Description */}
        <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/70 max-w-[220px] md:max-w-[260px] leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <button className="mt-5 md:mt-6 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-black text-[10px] md:text-xs uppercase tracking-[3px] hover:bg-[#D4A76A] transition duration-300 cursor-pointer">
          Explore Collection
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;