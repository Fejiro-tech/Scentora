"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedCard = ({ product }) => {

  if (!product) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8DED1] bg-white transition duration-300 hover:shadow-xl group">

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
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display line-clamp-2 min-h-10 text-sm uppercase tracking-[2px] text-[#1E1E1E] font-medium">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 capitalize text-left">
          {product.category}
        </p>

        <p className="mt-auto pt-2 text-sm font-semibold text-[rgba(200,160,100,0.95)]">
          ₦{Number(product.price).toLocaleString("en-NG")}
        </p>
      </div>
    </div>
  );
};

export default FeaturedCard;