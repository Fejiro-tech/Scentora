"use client";
import React, { useEffect } from "react";
import DashboardCard from "../../components/admin/DashboardCard";
import ProductsTable from "../../components/admin/ProductsTable";

import { useProduct } from "../context/ProductContext";

const page = () => {
  const { products } = useProduct();

  return (
    <div className=" min-h-screen text-black px-10 py-">
      <div className="max-w-6xl mx-auto text-center pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
          <DashboardCard label="Total Products" value={products.length} />
          <DashboardCard label="Orders" value="45" />
          <DashboardCard label="Revenue" value="₦230k" />
       
        </div>

        <div className="mt-12">
          <ProductsTable products={products} showActions={false}/>
        </div>
      </div>
    </div>
  );
};

export default page;
