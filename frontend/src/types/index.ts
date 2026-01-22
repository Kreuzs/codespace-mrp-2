export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  unit: string;
  standardCost: number;
  sellingPrice: number;
  leadTimeDays: number;
  reorderPoint: number;
  economicOrderQuantity: number;
  productType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  productId: string;
  product?: Product;
  quantity: number;
  status: string;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  priority: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  product?: Product;
  location: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  quantityOnOrder: number;
  lastStockDate?: string;
  createdAt: string;
  updatedAt: string;
}
