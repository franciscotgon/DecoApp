// src/app/admin/orders/orders-list.service.ts
import { OrderRepository } from "@/data-layer/repositories/OrderRepository";

export const useOrdersService = () => {
  const orderRepo = new OrderRepository();

  const getAdminOrders = async () => {
    try {
      const orders = await orderRepo.getAll();
      return orders ?? [];
    } catch (err) {
      console.error("Error fetching orders:", err);
      return [];
    }
  };

  return { getAdminOrders };
};
