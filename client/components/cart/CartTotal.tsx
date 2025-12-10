import Button from "../ui/Button";

interface CartTotalProps {
  total: number;
  onCheckout: () => void;
}

export default function CartTotal({ total, onCheckout }: CartTotalProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg gap-4">
      <span className="font-semibold text-lg">Total: ${total.toFixed(2)}</span>
      <Button variant="primary" onClick={onCheckout} className="px-6 py-2">
        Ir al Checkout
      </Button>
    </div>
  );
}
