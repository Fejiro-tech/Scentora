"use client";

import SideBar from "../../components/admin/Sidebar";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { navlinks } from "../../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5]">
        {/* SIDEBAR */}
        <div className="fixed top-0 left-0 h-screen hidden md:block">
          <SideBar />
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex flex-col">
          {/* TOP NAVBAR */}
          <div
            className="
            fixed top-0 left-0 md:left-52 lg:left-64 right-0
            h-20
            flex items-center justify-between
            px-6 md:px-8 lg:px-12
            border-b border-[#111111]
            bg-white
            shadow-sm
            z-30
          "
          >
            <h1 className="text-lg md:text-xl font-bold text-black">
              Dashboard
            </h1>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block md:hidden text-[#166534]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* LOGOUT BUTTON */}
            <button className="hidden md:block text-red-500 font-semibold hover:text-red-400 transition">
              Logout
            </button>
          </div>

          {/* PAGE CONTENT */}
          <main
            className="
            ml-0 md:ml-52 lg:ml-64
            mt-20
            min-h-screen
            p-4 md:p-6 lg:p-8
          "
          >
            {children}
          </main>
        </div>
      </div>

      {isOpen && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 top-20 right-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* MOBILE SIDEBAR */}
          <div className="fixed top-20 right-0 w-64 h-screen  bg-white border-l border-[#111111] z-50 font-['Cormorant_Garamond'] ">
            <nav className="mt-6">
              <ul className="flex flex-col">
                {navlinks.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-8 py-4 text-black font-bold hover:bg-black/10 transition text-base uppercase tracking-wide"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}

                <li className="mt-6 border-t border-white/10">
                  <button className="w-full text-left px-8 py-4 text-red-500 font-bold hover:bg-white/10 transition">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
