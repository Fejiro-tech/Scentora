"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CategoryCard = ({ image, category, description, featured = false }) => {
  const href = `/store/${category.toLowerCase()}`;

  if (featured) {
    return (
      <Link
        href={href}
        className="group relative isolate flex min-h-90 overflow-hidden rounded-sm bg-[#F8F4EE] sm:min-h-110 lg:min-h-130"
      >
        <Image
          src={image}
          alt={`${category} fragrance`}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04] sm:p-10"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />

        <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-6 text-white sm:p-9">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[3px] text-[#E0C49A]">
              Scent family
            </p>

            <h3 className="font-display text-4xl font-medium capitalize sm:text-5xl">
              {category}
            </h3>

            {description && (
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
                {description}
              </p>
            )}
          </div>

          <span className="mb-1 flex shrink-0 items-center gap-2 text-xs uppercase tracking-[2px] text-white/90 transition-colors group-hover:text-[#E0C49A]">
            Explore
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex min-h-28 items-center gap-4 py-4 first:pt-0 last:pb-0 sm:min-h-33 sm:gap-6"
    >
      <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-[#F8F4EE] sm:h-28 sm:w-32">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 640px) 128px, 96px"
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <span>
          <span className="mb-1 block text-[9px] uppercase tracking-[2px] text-[#C6A16F]">
            Scent family
          </span>

          <span className="font-display block text-2xl font-medium capitalize text-[#F7F3EE] transition-colors group-hover:text-[#D7B27E] sm:text-3xl">
            {category}
          </span>

          {description && (
            <span className="mt-1 block text-xs leading-relaxed text-[#C7BDB2] sm:text-sm">
              {description}
            </span>
          )}
        </span>

        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="shrink-0 text-[#C6A16F] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
};

export default CategoryCard;