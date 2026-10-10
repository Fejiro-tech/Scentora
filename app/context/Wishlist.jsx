"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import { createLocalStorageStore } from "../../lib/localStorageStore";

const WishlistContext = createContext();
const wishlistStore = createLocalStorageStore("wishlist");

export const WishlistProvider = ({ children }) => {
  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );

  const addToWishlist = (product) => {
    wishlistStore.setSnapshot((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    toast.success("Added to wishlist")
  };

  const removeFromWishlist = (id) => {
    wishlistStore.setSnapshot((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);