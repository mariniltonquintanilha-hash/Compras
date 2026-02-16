
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  bought: boolean;
  createdAt: number;
}

export interface ShoppingTotals {
  bought: number;
  pending: number;
  total: number;
}
