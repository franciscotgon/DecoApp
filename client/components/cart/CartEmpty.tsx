import { useRouter } from "next/navigation";

export default function CartEmpty() {
  const router = useRouter();
  return (
    <p className="text-gray-600">
      Tu carrito está vacío.
      <button
        className="text-blue-500 underline"
        onClick={() => router.push("/products")}
      >
        Ver productos
      </button>
    </p>
  );
}
