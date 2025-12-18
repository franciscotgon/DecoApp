"use client";
import { createContext, useContext } from "react";
import { useCartState, CartContextType } from "./useCartState";
// ----------------------------------------------------------------------
// CONTEXTO Y PROVIDER
// ----------------------------------------------------------------------

// 1. Definición del Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Componente Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCartState();
  return (
    <CartContext.Provider value={cartState}>{children} </CartContext.Provider>
  );
}

// 3. Hook Consumidor final (El que usarán los componentes)
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
