"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartEmpty from "@/components/cart/CartEmpty";
import CartItem from "@/components/cart/CartItem";
import CartTotal from "@/components/cart/CartTotal";
import { useCart } from "@/hooks/CartContext";
import { cartService } from "@/app/services/cart.service";
import { handleApiError } from "@/lib/error-handler";

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    total,
    updateItemQuantity,
    removeItemFromCart,
    userId = "36cacece-8f57-4766-b34f-e1d9e49d102d",
  } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!userId) {
      alert("Debes iniciar sesión para finalizar la compra.");
      return;
    }

    setIsProcessing(true);

    try {
      await cartService.syncCart({
        userId,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      router.push("/checkout");
    } catch (err: unknown) {
      const message = handleApiError(err);
      console.error("[Checkout Sync Error]:", err);
      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) return <CartEmpty />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
        <p className="text-gray-500 mt-2">
          Revisa tus productos antes de pagar
        </p>
      </header>

      <div className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {cartItems.map((item) => (
          <CartItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
            updateQuantity={updateItemQuantity}
            deleteItem={removeItemFromCart}
          />
        ))}
      </div>

      <CartTotal
        total={total}
        onCheckout={handleCheckout}
        isLoading={isProcessing}
      />
    </div>
  );
}
