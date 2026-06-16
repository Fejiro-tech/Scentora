"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full relative ">
      
      {/* Glass Background */}
      <div className="backdrop-blur-xl bg-[#0F0505] border-t border-white/10 text-white ">

        <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-10 py-10 font-['Cormorant_Garamond']">

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Brand */}
            <div>
              <h2 className="text-2xl font-semibold tracking-wide">
                Scentora
              </h2>
              <p className="text-white/60 mt-4 text-sm leading-relaxed">
                Luxury fragrances crafted to define elegance, memory, and identity.
                Every scent tells a story.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-medium mb-4">Explore</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/store" className="hover:text-white transition">Shop</Link></li>
                <li><Link href="/store/floral" className="hover:text-white transition">Floral</Link></li>
                <li><Link href="/store/woody" className="hover:text-white transition">Woody</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">TikTok</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-10"></div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">

            <p>© {new Date().getFullYear()} Scentora. All rights reserved.</p>

            <p className="mt-4 md:mt-0">
              Crafted with elegance ✨
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;