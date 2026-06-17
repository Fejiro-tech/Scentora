"use client";

import React, { useState } from "react";
import PerfumeCard from "../../../components/PerfumeCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "../../context/ProductContext";


const Page = () => {
  const router = useRouter();
  const { products } = useProduct();

  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = ["all", "floral", "woody"];

  const filteredProducts =
    selectedFilter === "all"
      ? products
      : products.filter((p) => p.category?.toLowerCase() === selectedFilter);

  return (
    <section className="w-full bg-[#F7F3EE] px-6 py-20">
      <div className="max-w-6xl mx-auto text-center pt-6">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-lg capitalize font-medium text-[rgba(200,160,100,0.8)]">
            {selectedFilter} Perfumes
          </h1>

          <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1 border rounded-full text-xs md:text-sm capitalize transition ${
                  selectedFilter === filter
                    ? "bg-black text-[rgba(220,185,145,0.95)] scale-105"
                    : "bg-transparent text-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <PerfumeCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              No perfumes found in this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
