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
          <h1 className="font-display text-2xl md:text-4xl font-bold tracking-[3px] text-[#1A1A1A]">
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
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8DED1] bg-white transition hover:shadow-lg group"
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
                <div className="flex flex-1 flex-col p-4">

                  <Link href={`/store/perfume/${item.slug}`}>
                    <h2 className="font-display line-clamp-2 min-h-10 text-sm uppercase tracking-[2px] font-medium text-[#1E1E1E]">
                      {item.name}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {item.category}
                  </p>

                  <p className="text-[rgba(200,160,100,0.95)] font-semibold text-sm mt-2">
                    ₦{Number(item.price).toLocaleString("en-NG")}
                  </p>

                  {/* ACTIONS */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="mt-auto w-full rounded-full border border-red-200 py-2 text-sm text-red-500 transition hover:bg-red-50"
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