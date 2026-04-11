import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService, KEYS } from '../storage/AsyncStorageService';

const CartContext = createContext(null);

const computeTotals = (items) => ({
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const stored = await StorageService.get(KEYS.CART);
      if (stored) setItems(stored);
    })();
  }, []);

  const persist = async (newItems) => {
    setItems(newItems);
    await StorageService.set(KEYS.CART, newItems);
  };

  const addToCart = async (product, qty = 1) => {
    const existing = items.find((i) => i.product.id === product.id);
    let updated;
    if (existing) {
      updated = items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
      );
    } else {
      updated = [...items, { product, quantity: qty }];
    }
    await persist(updated);
  };

  const removeFromCart = async (productId) => {
    await persist(items.filter((i) => i.product.id !== productId));
  };

  const incrementQty = async (productId) => {
    await persist(
      items.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decrementQty = async (productId) => {
    const item = items.find((i) => i.product.id === productId);
    if (!item) return;
    if (item.quantity === 1) {
      await removeFromCart(productId);
    } else {
      await persist(
        items.map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };

  const clearCart = async () => {
    await persist([]);
  };

  const { totalItems, totalPrice } = computeTotals(items);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
