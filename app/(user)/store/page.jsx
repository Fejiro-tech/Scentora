
"use client";

import React, { useState } from "react";
import PerfumeCard from "../../../components/PerfumeCard";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "../../context/ProductContext";

const Page = () => {
  const router = useRouter();
  const { products } = useProduct();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const filters = ["all", "floral", "woody"];
  const formatSearchTerm = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedFilter === "all" ||
      product.category?.toLowerCase() === selectedFilter;

    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(formatSearchTerm);

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts];

  if (sortOrder === "price-ascending") {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortOrder === "price-descending") {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <section className="w-full bg-[#F7F3EE] px-6 py-20">
      <div className="mx-auto max-w-6xl pt-6 text-center">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-1 text-sm text-gray-600 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Page Heading and Description */}
        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-medium text-[rgba(200,160,100,0.8)] md:text-4xl">
            Find Your Scent
          </h1>

          <p className="text-sm text-gray-600 md:text-base">
            Explore fragrances that feel like you.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-10 flex justify-center">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search perfumes..."
            aria-label="Search perfumes"
            className="w-full max-w-md rounded-full border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgba(200,160,100,0.8)]"
          />
        </div>

        {/* Category Filters and Sorting */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full border px-4 py-1 text-xs capitalize transition md:text-sm ${
                  selectedFilter === filter
                    ? "scale-105 bg-black text-[rgba(220,185,145,0.95)]"
                    : "bg-transparent text-black"
                }`}
              >
                {filter}
              </button>
            ))}

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort perfumes by price"
              className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-xs text-black focus:outline-none focus:ring-2 focus:ring-[rgba(200,160,100,0.8)] md:text-sm"
            >
              <option value="default">Default</option>
              <option value="price-ascending">Price: Low to High</option>
              <option value="price-descending">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Perfume Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <PerfumeCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              No perfumes match your search and selected category. Try another
              name or category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
