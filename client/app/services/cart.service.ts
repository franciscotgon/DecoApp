// services/cartService.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SyncCartItem {
  productId: number;
  quantity: number;
}

export interface SyncCartRequest {
  userId: string;
  items: SyncCartItem[];
}

export const cartService = {
  syncCart: async (data: SyncCartRequest): Promise<number> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error del servidor: ${response.status}`
        );
      }

      const cartId = await response.json();
      return cartId;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Error de conexión con el servidor");
    }
  },
};
