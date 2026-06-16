"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navlinks = [
  { title: "Overview", href: "/admin" },
  { title: "Products", href: "/admin/products" },
  { title: "Categories", href: "#" },
  { title: "Create", href: "/admin/products/create" },
  { title: "Orders", href: "#" },
];

const SideBar = () => {
  const pathname = usePathname();


  return (
    <aside className="w-54 md:w-52 lg:w-64 h-screen bg-[#111111] border-r border-[#166534] flex flex-col py-4 font-['Cormorant_Garamond']">
      <nav className="">
        <ul className="flex flex-col space-y-8 text-lg">
          {navlinks.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className={`block px-6 py-3 font-bold transition ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-[#f5f5f5] hover:bg-white/10"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;