// useCartState.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { Product } from "@/data-layer/types/Product";

// ----------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------

interface CartItem {
  product: Product;
  quantity: number;
}
type CartState = { [id: number]: CartItem };

// Definición de las funciones que serán exportadas al Context
export interface CartContextType {
  cartItems: CartItem[];
  total: number;
  itemCount: number;
  addItemToCart: (product: Product, quantity: number) => void;
  updateItemQuantity: (productId: number, newQuantity: number) => void;
  removeItemFromCart: (productId: number) => void;
  clearCart: () => void;
  userId?: string;
}

// ----------------------------------------------------------------------
// LÓGICA DE PERSISTENCIA
// ----------------------------------------------------------------------

const updateLocalStorage = (newState: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartState", JSON.stringify(newState));
  }
};

// ----------------------------------------------------------------------
// HOOK DE LÓGICA
// ----------------------------------------------------------------------

export const useCartState = (): CartContextType => {
  const [cart, setCart] = useState<CartState>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem("cartState");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      updateLocalStorage(cart);
    }
  }, [cart, isClient]);

  const addItemToCart = useCallback((product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev[product.id];
      const newQuantity = (existingItem ? existingItem.quantity : 0) + quantity;
      return {
        ...prev,
        [product.id]: { product, quantity: newQuantity },
      };
    });
  }, []);

  const updateItemQuantity = useCallback(
    (productId: number, newQuantity: number) => {
      setCart((prev) => {
        if (newQuantity <= 0) {
          const { [productId]: _, ...rest } = prev;
          return rest;
        }
        const existingItem = prev[productId];
        if (!existingItem) return prev;
        return {
          ...prev,
          [productId]: { ...existingItem, quantity: newQuantity },
        };
      });
    },
    []
  );

  const removeItemFromCart = useCallback((productId: number) => {
    setCart((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartState");
    }
  }, []);

  const total = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }, [cart]);

  const itemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  }, [cart]);

  return {
    cartItems: Object.values(cart),
    total,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    itemCount,
  };
};
