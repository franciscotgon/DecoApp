import Image from "next/image";
import Button from "../ui/Button";
import { Product } from "@/lib/types/Product";

interface CartItemProps {
  product: Product;
  quantity: number;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
}

export default function CartItem({
  product,
  quantity,
  addToCart,
  removeFromCart,
  deleteFromCart,
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={60}
          className="object-cover rounded"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="danger"
          onClick={() => removeFromCart(product.id)}
          disabled={quantity === 0}
          className="p-2"
        >
          <Image
            src="/images/payments/minus.svg"
            alt="Restar"
            width={16}
            height={16}
          />
        </Button>

        <span>{quantity}</span>

        <Button
          variant="success"
          onClick={() => addToCart(product.id)}
          className="p-2"
        >
          <Image
            src="/images/payments/plus.svg"
            alt="Sumar"
            width={16}
            height={16}
          />
        </Button>

        <Button
          variant="danger"
          onClick={() => deleteFromCart(product.id)}
          className="p-2"
        >
          <Image
            src="/images/payments/trash-can.svg"
            alt="Eliminar"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </div>
  );
}
