import { BaseRepository } from "./BaseRepository";

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderItemPayload {
  productId: number;
  quantity: number;
}

export interface OrderPayload {
  items: OrderItemPayload[];
}

export interface OrderResponse {
  id: number;
  orderId?: number;
  customerName: string;
  createdAt: string;
  totalAmount: number;
  status: "Pendiente" | "Completado" | "Cancelado";
  items: OrderItemResponse[];
}

export class OrderRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async getAll(): Promise<OrderResponse[] | null> {
    return this.get<OrderResponse[]>("/orders");
  }

  public async getById(id: number | string): Promise<OrderResponse | null> {
    return this.get<OrderResponse>(`/orders/${id}`);
  }

  public async createOrder(payload: OrderPayload): Promise<OrderResponse> {
    const response = await this.post<OrderPayload, OrderResponse>(
      "/orders",
      payload
    );

    if (!response) {
      throw new Error(
        "El Backend no devolvió una respuesta válida al crear la orden."
      );
    }

    return {
      ...response,
      orderId: response.id,
    };
  }

  public async updateStatus(
    id: number | string,
    status: OrderResponse["status"]
  ): Promise<OrderResponse | null> {
    return this.put<{ status: string }, OrderResponse>(`/orders/${id}/status`, {
      status,
    });
  }

  public async deleteById(id: number | string): Promise<boolean> {
    try {
      await this.delete(`/orders/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar orden con ID ${id}:`, error);
      return false;
    }
  }
}
