import React from "react";

import Image from "next/image";
import { useProduct } from "../../app/context/ProductContext";

const ProductsTable = ({ products, showActions = true }) => {
  const { openEditModal, deleteProduct, toggleFeatured, toggleBestSeller } =
    useProduct();

  return (
    <div>
      <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-300">
        <div className="min-w-225">
          {/* HEADER */}
          <div
            className={`grid gap-6 py-4 px-10 border-b border-gray-400 text-xs uppercase text-gray-500 font-bold text-left  ${
              showActions ? "grid-cols-9" : "grid-cols-8"
            }`}
          >
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Stock</p>
            <p>Date</p>
            <p>Featured</p>
            <p>Best Seller</p>
            {showActions && <p>Actions</p>}
          </div>

          {/* ROWS */}
          {products.map((product) => (
            <div
              key={product.id}
              className={`grid gap-4 py-4 px-10 items-center border-b border-gray-200 hover:bg-gray-50 text-left whitespace-nowrap ${
                showActions ? "grid-cols-9" : "grid-cols-8"
              }`}
            >
              {/* IMAGE */}
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-md object-cover"
              />

              <p className="text-sm">{product.name}</p>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-sm">₦{product.price}</p>

              {/* STOCK */}
              <p className="text-sm">
                {product.stock > 5 ? (
                  <span className="text-green-600">
                    ({product.stock}) In Stock
                  </span>
                ) : (
                  <span className="text-red-500">
                    ({product.stock}) Low Stock
                  </span>
                )}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(product.date).toLocaleDateString()}
              </p>

              {/* ⭐ FEATURED COLUMN */}
              <button
                onClick={() => toggleFeatured(product.id)}
                className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium transition ${
                  product.isFeatured
                    ? "bg-green-100 text-green-700 border border-green-400"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
              >
                {product.isFeatured ? "★ Featured" : "Not Featured"}
              </button>

              {/* 🔥 BEST SELLER COLUMN */}
              <button
                onClick={() => toggleBestSeller(product.id)}
                className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium transition ${
                  product.isBestSeller
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
              >
                {product.isBestSeller ? "🔥 Best Seller" : "Normal"}
              </button>

              {/* ACTIONS */}
              {showActions && (
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-blue-600 bg-blue-200 px-3 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      console.log("PRODUCT:", product);
                      console.log("ID:", product.id);

                      deleteProduct(product.id);
                    }}
                    className="text-red-500 bg-red-200 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE*/}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-4 shadow-sm border"
          >
            <div className="flex gap-3 items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="w-14 h-14 rounded-xl object-cover"
              />

              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <p>₦{product.price}</p>

              {product.stock > 5 ? (
                <span className="text-green-600 text-xs">
                  {product.stock} In Stock
                </span>
              ) : (
                <span className="text-red-500 text-xs">
                  {product.stock} Low Stock
                </span>
              )}
            </div>

            {/* FEATURED */}
            <button
              onClick={() => toggleFeatured(product.id)}
              className={`mt-2 px-2 py-1 text-xs rounded ${
                product.isFeatured
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {product.isFeatured ? "Featured" : "Not Featured"}
            </button>

            {/* BEST SELLER */}
            <button
              onClick={() => toggleBestSeller(product.id)}
              className={`mt-2 ml-2 px-2 py-1 text-xs rounded ${
                product.isBestSeller
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {product.isBestSeller ? "Best Seller" : "Normal"}
            </button>

             {/* ACTIONS */}
              {showActions && (
                <div className="flex justify-between gap-2 text-sm mt-8">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-blue-600 bg-blue-200 px-3 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      console.log("PRODUCT:", product);
                      console.log("ID:", product.id);

                      deleteProduct(product.id);
                    }}
                    className="text-red-500 bg-red-200 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTable;
