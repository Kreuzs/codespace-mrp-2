export interface CreateProductDto {
  code: string;
  name: string;
  description?: string;
  unit?: string;
  standardCost?: number;
  sellingPrice?: number;
  leadTimeDays?: number;
  reorderPoint?: number;
  economicOrderQuantity?: number;
  productType?: string;
}

export interface UpdateProductDto {
  code?: string;
  name?: string;
  description?: string;
  unit?: string;
  standardCost?: number;
  sellingPrice?: number;
  leadTimeDays?: number;
  reorderPoint?: number;
  economicOrderQuantity?: number;
  productType?: string;
  isActive?: boolean;
}
