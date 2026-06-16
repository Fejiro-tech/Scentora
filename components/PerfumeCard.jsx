"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../app/context/CartContext";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "../app/context/Wishlist";
import { motion } from "framer-motion";

const PerfumeCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [flyHeart, setFlyHeart] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlist?.some((item) => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);

      // trigger animation
      setFlyHeart(true);
      setTimeout(() => setFlyHeart(false), 600);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DED1] hover:shadow-xl transition duration-300 group">

      {/* IMAGE */}
      <Link href={`/store/perfume/${product.slug}`}>
        <div className="relative h-72 bg-[#F8F4EE] flex items-center justify-center overflow-hidden">

          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={220}
            className="object-contain group-hover:scale-105 transition duration-500"
          />

          {product.stock <= 0 && (
            <span className="absolute top-4 left-4 bg-red-100 text-red-400 px-4 py-1 rounded-full text-xs border border-red-300 font-medium">
              Out of Stock
            </span>
          )}

          {/* ❤️ flying heart */}
          {flyHeart && (
            <motion.div
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 0, scale: 0.3, y: -120 }}
              transition={{ duration: 0.6 }}
              className="absolute top-6 right-6 text-red-500"
            >
              <Heart fill="red" />
            </motion.div>
          )}

        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h3 className="text-sm uppercase text-left tracking-[2px] text-[#1E1E1E] font-medium">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 text-left mt-1 capitalize">
              {product.category}
            </p>
          </div>

          {/* PRICE + HEART */}
          <div className="flex items-center gap-2">

            <p className="text-[rgba(200,160,100,0.95)] font-semibold text-sm">
              ₦{product.price}
            </p>

            <motion.button
              onClick={handleWishlist}
              className={`transition ${
                isWishlisted
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
              whileTap={{ scale: 1.3 }}
            >
              <Heart
                size={18}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </motion.button>

          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className={`w-full mt-6 py-3 rounded-full transition duration-300 ${
            product.stock <= 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-black text-[#D4A76A] hover:opacity-90"
          }`}
        >
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
};

export default PerfumeCard;