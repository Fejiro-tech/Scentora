"use client";

import { useWishlist } from "@/app/context/Wishlist";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="w-full min-h-screen bg-[#F7F3EE] px-6 md:px-18 py-24">
      <div className="max-w-6xl mx-auto pt-10">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold font-['Cormorant_Garamond'] tracking-[3px] text-[#1A1A1A]">
            My Wishlist
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Your saved fragrances
          </p>
        </div>

        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="mx-auto text-gray-300" size={40} />
            <p className="text-gray-500 mt-4">No items in your wishlist yet</p>

            <Link
              href="/store"
              className="inline-block mt-6 px-6 py-3 bg-black text-[#D4A76A] rounded-full text-sm hover:opacity-90 transition"
            >
              Explore Perfumes
            </Link>
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-0">

            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8DED1] hover:shadow-lg transition group"
              >

                {/* IMAGE */}
                <Link href={`/store/perfume/${item.slug}`}>
                  <div className="relative h-56 bg-[#F8F4EE] flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={180}
                      height={180}
                      className="object-contain group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-4">

                  <Link href={`/store/perfume/${item.slug}`}>
                    <h2 className="text-sm uppercase tracking-[2px] font-medium text-[#1E1E1E]">
                      {item.name}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {item.category}
                  </p>

                  <p className="text-[rgba(200,160,100,0.95)] font-semibold text-sm mt-2">
                    ₦{item.price}
                  </p>

                  {/* ACTIONS */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="mt-4 w-full py-2 rounded-full text-sm border border-red-200 text-red-500 hover:bg-red-50 transition"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;