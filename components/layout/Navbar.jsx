"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, Search, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "../../app/context/Wishlist";
import { useCart } from "../../app/context/CartContext";

const navlinks = [
  { name: "About Us", href: "/#about" },
  { name: "Best Sellers", href: "/#best-sellers" },
  { name: "FAQ", href: "/#faq" },
  { name: "Testimonials", href: "/#testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { cart, cartCount } = useCart();

  return (
    <>
      <nav
        className={`fixed top-10 left-0 w-full z-50 transition-all duration-500 text-[#F8F4EF] bg-black/80 backdrop-blur-xl border-b border-[rgba(200,160,100,0.35)]
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 lg:px-10 py-5 max-w-360 mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="font-['Cormorant_Garamond'] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] uppercase tracking-[4px] font-semibold"
          >
            Scentora
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-14">
            {navlinks.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="relative group cursor-pointer text-[11px] uppercase tracking-[3px] text-[rgba(245,239,230,0.78)] hover:text-white transition"
                >
                  {item.name}

                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[rgba(220,185,145,0.95)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-white">
            <Search
              size={18}
              className="hover:text-[rgba(200,160,100,0.8)] transition cursor-pointer "
            />

            <Link href="/store/wishlist" className="relative cursor-pointer">
              <Heart
                size={18}
                className="hover:text-[rgba(200,160,100,0.8)] transition"
              />

              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/store/cart" className="relative cursor-pointer">
              <ShoppingCart
                size={18}
                className="hover:text-[rgba(200,160,100,0.8)] transition"
              />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cartCount}</span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden hover:text-[rgba(200,160,100,0.9)] cursor-pointer"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-24 left-0 w-full bg-black/95 backdrop-blur-xl z-50 px-8 py-10 space-y-10 transform transition-all duration-500 lg:hidden flex flex-col border-y border-[rgba(200,160,100,0.35)] ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {navlinks.map((item, idx) => (
          <Link
            href={item.href}
            onClick={() => setIsOpen(false)}
            key={idx}
            className="uppercase tracking-[3px] text-sm md:text-base font-bold text-[rgba(245,239,230,0.85)] hover:text-[rgba(200,160,100,0.8)] transition cursor-pointer"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
