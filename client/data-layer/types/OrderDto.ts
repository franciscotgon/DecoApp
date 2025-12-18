import { OrderItemDto } from "./OrderItemDto";

export interface OrderDto {
  id: number;
  createdAt: string;
  totalAmount: number;
  userId: string;
  notes?: string;
  items: OrderItemDto[];
}
