"use client";

import Image from "next/image";
import { useState } from "react";

export default function CreateProductPage({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  handleImageChange,
  preview,
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h1 className="text-2xl font-semibold mb-8">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Product Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-500 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-600">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-500 rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Floral">Floral</option>
              <option value="Woody">Woody</option>
              <option value="Fresh">Fresh</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-600">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-500 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* STOCK */}
          <div>
            <label className="text-sm text-gray-600">Stock</label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-500 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 accent-black"
            />
            <label className="text-sm text-gray-600">Featured</label>
          </div>

          {/* STOCK */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Best Seller</label>

            <input
              type="checkbox"
              name="isBestSeller"
              value={formData.isBestSeller}
              onChange={handleChange}
              className="w-4 h-4 accent-black"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-600">Description</label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-2 border border-gray-500 rounded-xl px-4 py-3 outline-none resize-none"
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="text-sm text-gray-600 block mb-2">
            Product Image
          </label>

          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center w-full h-[220px] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#5A1E1E] transition bg-gray-50"
          >
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={20}
                height={30}
                className="w-44 h-40 object-cover"
              />
            ) : (
              <>
                <p className="text-sm text-gray-500">Click to upload image</p>

                <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP</p>
              </>
            )}

            <input
              id="imageUpload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        {/* BUTTON */}
        <button
          type="submit"
          className="bg-[#111111] text-white px-6 py-3 rounded-xl"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
