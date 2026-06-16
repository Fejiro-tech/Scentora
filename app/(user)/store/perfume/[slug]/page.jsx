"use client";

import React from "react";
import { useParams } from "next/navigation";
import PerfumeDetail from "../../../../../components/PerfumeDetail";
import { useProduct } from "../../../../context/ProductContext";

const Page = () => {
  
  const params = useParams();
  const slug = params.slug;
  const { products } = useProduct();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Perfume not found
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#F7F3EE] px-8 py-16">
      <PerfumeDetail product={product}/>
    </section>
  );
};

export default Page;
