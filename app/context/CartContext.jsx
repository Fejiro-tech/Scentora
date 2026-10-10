"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import { createLocalStorageStore } from "../../lib/localStorageStore";

export const CartContext = createContext();
const cartStore = createLocalStorageStore("cart");

export const CartProvider = ({ children }) => {
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const addToCart = (product) => {
    cartStore.setSnapshot((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      return existing
        ? currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...currentCart, { ...product, quantity: 1 }];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (id) => {
    cartStore.setSnapshot((currentCart) =>
      currentCart.filter((item) => item.id !== id),
    );
  };

  const increaseQty = (id) => {
    cartStore.setSnapshot((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    cartStore.setSnapshot((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const clearCart = () => {
    cartStore.setSnapshot([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
