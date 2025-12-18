import { OrderDto } from "@/data-layer/types/OrderDto";

// services/orderService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CreateOrderRequest {
  userId: string;
  notes?: string;
}

export const orderService = {
  createOrder: async (data: CreateOrderRequest): Promise<{ id: number }> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al procesar la compra");
    }
    console.log(response, "Order created successfully");
    return response.json();
  },
  getOrderById: async (id: string | number): Promise<OrderDto> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok)
      throw new Error("No se pudo cargar la información de la orden");
    return response.json();
  },
};
