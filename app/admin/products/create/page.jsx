"use client";

import React, { useState } from "react";
import CreateProducts from "../../../../components/admin/CreateProducts";
import { useProduct } from "../../../context/ProductContext";
import { useRouter } from "next/navigation";
import { uploadImage } from "../../../../lib/uploadImage";

const Page = () => {
  const { setProducts, fetchProducts } = useProduct();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
    isFeatured: false,
    isBestSeller: false,
  });

  const [preview, setPreview] = useState(null);

  // IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // INPUTS + CHECKBOXES
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = formData.name
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

      let imageUrl = "";

      if (formData.image) {
        imageUrl = await uploadImage(formData.image)
      }

    const newProduct = {
      name: formData.name,
      slug,
      category: formData.category,
      price: formData.price,
      stock: Number(formData.stock),
      description: formData.description,
      is_featured: formData.isFeatured,
      is_best_seller: formData.isBestSeller,
      image: imageUrl,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    
    await fetchProducts();

    // RESET FORM
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: null,
      isFeatured: false,
      isBestSeller: false,
    });

    setPreview(null);

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen w-full text-black py-10">
      <div className="max-w-4xl mx-auto">
        <CreateProducts
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          preview={preview}
        />
      </div>
    </div>
  );
};

export default Page;
