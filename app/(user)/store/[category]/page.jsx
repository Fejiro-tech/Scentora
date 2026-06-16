"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "../../../../data/data";
import PerfumeCard from "../../../../components/PerfumeCard";
import { ArrowLeft } from "lucide-react";

const Page = () => {
  const params = useParams();
  const category = params.category?.toLowerCase();

  const router = useRouter();

  const filteredProducts =
    products.filter(
      (p) => p.category?.toLowerCase() === category
    );

  return (
    <section className="w-full bg-[#F7F3EE] px-6 py-20">
      <div className="max-w-6xl mx-auto text-center pt-10">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="flex justify-between items-center mb-12 ">
          {/* Title */}
          <h1 className="text-3xl capitalize  font-medium text-[rgba(200,160,100,0.8)]">
            {category} Perfumes
          </h1>
        </div>

        {/* Perfume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <PerfumeCard product={product} key={product.id}/>
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
