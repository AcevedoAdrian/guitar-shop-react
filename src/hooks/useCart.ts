import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemInCart = cart.findIndex((product) => product.id === item.id);
    if (itemInCart >= 0) {
      if (cart[itemInCart].quantity >= MAX_QUANTITY) return;
      const updateCart = [...cart];
      updateCart[itemInCart].quantity++;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeToCart(id: Guitar["id"]) {
    const removeItem = cart.filter((product) => product.id !== id);
    setCart(removeItem);
  }

  function clearCart() {
    setCart([]);
  }

  function increaseQuantity(id: Guitar["id"]) {
    const updateCart = cart.map((product) => {
      if (product.id === id && product.quantity < MAX_QUANTITY) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    setCart(updateCart);
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updateCart = cart.map((product) => {
      if (product.id === id && product.quantity > MIN_QUANTITY) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
    setCart(updateCart);
  }
  // State Derivation
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
