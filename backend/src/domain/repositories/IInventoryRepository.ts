import { InventoryItem } from '../entities/InventoryItem';

export interface IInventoryRepository {
  findAll(): Promise<InventoryItem[]>;
  findById(id: string): Promise<InventoryItem | null>;
  findByProductId(productId: string): Promise<InventoryItem[]>;
  findByLocation(location: string): Promise<InventoryItem[]>;
  create(inventory: Partial<InventoryItem>): Promise<InventoryItem>;
  update(id: string, inventory: Partial<InventoryItem>): Promise<InventoryItem>;
  delete(id: string): Promise<boolean>;
}
