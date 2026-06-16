"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedCard = ({ product }) => {

  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DED1] hover:shadow-xl transition duration-300 group">

      {/* Image */}
      <Link href={`/store/perfume/${product.slug}`}>
        <div className="relative h-72 bg-[#F8F4EE] flex items-center justify-center overflow-hidden p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={220}
            className="object-contain group-hover:scale-105 transition duration-500"
          />

          <div className="absolute top-4 left-4  px-4 py-1 rounded-full">
            <button className="bg-black text-[rgba(200,160,100,0.95)] px-4 py-1 text-xs rounded-full">Luxury</button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm uppercase tracking-[2px] text-[#1E1E1E] font-medium">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1 capitalize text-left">
              {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;