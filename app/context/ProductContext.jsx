"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mapProductFromDB, mapProductToDB } from "../utils/productMapper";

export const ProductContext = createContext();

const loadProducts = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Unable to load products.");
  }

  return data.map(mapProductFromDB);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    setProductsError("");
    try {
      setProducts(await loadProducts());
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProductsError(
        error instanceof Error ? error.message : "Unable to load products.",
      );
    } finally {
      setIsLoadingProducts(false);
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
    let cancelled = false;

    loadProducts()
      .then((loadedProducts) => {
        if (!cancelled) {
          setProducts(loadedProducts);
          setProductsError("");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        if (!cancelled) {
          setProductsError(
            error instanceof Error ? error.message : "Unable to load products.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingProducts(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoadingProducts,
        productsError,
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
