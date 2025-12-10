"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types/Product";
import CartItem from "@/components/cart/CartItem";
import CartTotal from "@/components/cart/CartTotal";
import CartEmpty from "@/components/cart/CartEmpty";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [products, setProducts] = useState<Product[]>([]);

  // Cargar productos y carrito desde localStorage de forma segura
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCart = localStorage.getItem("cart");

    Promise.resolve().then(() => {
      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedCart) setCart(JSON.parse(storedCart));
    });
  }, []);

  // Funciones de manipulación de carrito
  const addToCart = (id: number) => {
    setCart((prev) => {
      const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev, [id]: prev[id] - 1 };
      if (updated[id] === 0) delete updated[id];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteFromCart = (id: number) => {
    const updated = { ...cart };
    delete updated[id];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Calcular total
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === Number(id));
    return product ? sum + product.price * qty : sum;
  }, 0);

  // Mostrar mensaje si el carrito está vacío
  if (Object.keys(cart).length === 0) return <CartEmpty />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      {Object.entries(cart).map(([id, qty]) => {
        const product = products.find((p) => p.id === Number(id));
        if (!product) return null;
        return (
          <CartItem
            key={id}
            product={product}
            quantity={qty}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            deleteFromCart={deleteFromCart}
          />
        );
      })}

      <CartTotal total={total} onCheckout={() => router.push("/checkout")} />
    </div>
  );
}
