"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mapProductFromDB, mapProductToDB } from "../utils/productMapper";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      const formattedProuducts = data.map(mapProductFromDB);
      setProducts(formattedProuducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      console.error(data.error, data.details);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const editProduct = async (id, updatedProduct) => {
    const DbPayload = mapProductToDB(updatedProduct);

    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DbPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.error);
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
    );
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditOpen(false);
  };

  const toggleFeatured = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newValue = !product.isFeatured;

    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_featured: newValue }),
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)),
    );
  };

  const toggleBestSeller = async (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newValue = !product.isBestSeller;

    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_best_seller: newValue }),
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestSeller: newValue } : p)),
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        deleteProduct,
        editProduct,
        openEditModal,
        closeEditModal,
        isEditOpen,
        selectedProduct,
        toggleFeatured,
        toggleBestSeller,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
