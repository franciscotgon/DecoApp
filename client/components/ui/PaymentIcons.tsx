"use client";

import Image from "next/image";
import { CreditCard } from "lucide-react";

export default function PaymentIcons() {
  return (
    <div className="flex gap-2 items-center">
      <CreditCard size={20} className="text-gray-500" />
      <span className="text-sm font-medium text-gray-700 mr-2">Aceptamos:</span>

      {/* Logos específicos de pago */}
      <Image
        src="/images/payments/visa.svg"
        alt="Visa"
        width={30}
        height={20}
        className="h-4 w-auto object-contain"
      />
      <Image
        src="/images/payments/mastercard.svg"
        alt="Mastercard"
        width={30}
        height={20}
        className="h-4 w-auto object-contain"
      />
      <Image
        src="/images/payments/mercadopago.svg"
        alt="MercadoPago"
        width={30}
        height={20}
        className="h-4 w-auto object-contain"
      />
    </div>
  );
}
