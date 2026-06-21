"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function EditModal({ onClose, selectedProduct, editProduct }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    date: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  // PREFILL FORM
  useEffect(() => {
    if (selectedProduct) {
      setForm({
        id: selectedProduct.id,
        name: selectedProduct.name || "",
        category: selectedProduct.category || "",
        price: selectedProduct.price || "",
        stock: selectedProduct.stock || "",
        description: selectedProduct.description || "",
        date: selectedProduct.date || "",
        image: selectedProduct.image || null,
      });

      setPreview(selectedProduct.image?.src || selectedProduct.image || "");
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setForm((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      setPreview(imageUrl);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  editProduct(selectedProduct.id, {
    name: form.name,
    category: form.category,
    price: form.price,
    stock: form.stock,
    description: form.description,
    image: form.image,
  });

  onClose();
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
            Edit Product
          </h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-600 block mb-2">
              Product Image
            </label>

            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-full h-37.5 md:h-55 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#5A1E1E] transition bg-gray-50"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={300}
                  height={300}
                  className="w-24 h-24 md:w-44 md:h-44 object-cover"
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

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full border border-gray-400 text-sm md:text-base p-3 rounded-lg"
          />

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border border-gray-400 text-sm md:text-base p-3 rounded-lg"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-400 text-sm md:text-base p-3 rounded-lg"
            rows={4}
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-400 text-sm md:text-base p-3 rounded-lg"
          />

          {/* STOCK */}
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border border-gray-400 text-sm md:text-base p-3 rounded-lg"
          />

          {/* DATE */}
          <input
            type="text"
            name="date"
            value={form.date}
            disabled
            className="w-full border border-gray-400 text-sm md:text-base p-3 rounded-lg bg-gray-100"
          />

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-400 hover:bg-gray-50 text-sm md:text-base rounded-lg cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm md:text-base rounded-lg cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
