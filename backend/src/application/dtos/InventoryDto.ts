export interface CreateInventoryDto {
  productId: string;
  location: string;
  quantityOnHand?: number;
  quantityReserved?: number;
  quantityAvailable?: number;
  quantityOnOrder?: number;
}

export interface UpdateInventoryDto {
  location?: string;
  quantityOnHand?: number;
  quantityReserved?: number;
  quantityAvailable?: number;
  quantityOnOrder?: number;
}
