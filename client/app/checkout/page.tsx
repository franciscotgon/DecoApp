"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import Button from "@/components/ui/Button";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Datos de envío
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  // Cargar productos y cantidades desde localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    const storedCart = localStorage.getItem("cart");

    if (storedProducts && storedCart) {
      Promise.resolve().then(() => {
        const products: Product[] = JSON.parse(storedProducts);
        const cart = JSON.parse(storedCart) as { [id: number]: number };

        const items = products
          .filter((p) => cart[p.id])
          .map((p) => ({ product: p, quantity: cart[p.id] }));

        setCartItems(items);

        const sum = items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotal(sum);
      });
    }
  }, []);

  const handleConfirm = () => {
    // Aquí podrías llamar a tu API para procesar la compra
    localStorage.removeItem("cart");
    router.push("/checkout/success"); // Redirige al success page
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Formulario de envío */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Datos de Envío</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              className="border p-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dirección"
              className="border p-3 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ciudad"
              className="border p-3 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Código postal"
              className="border p-3 rounded"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>

        {/* Resumen de pedido */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Botón de confirmar */}
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="mt-6 w-full"
          >
            Confirmar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}
