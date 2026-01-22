import { IInventoryRepository } from '../../domain/repositories/IInventoryRepository';
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { CreateInventoryDto, UpdateInventoryDto } from '../dtos/InventoryDto';

export class InventoryService {
  constructor(private inventoryRepository: IInventoryRepository) {}

  async getAllInventory(): Promise<InventoryItem[]> {
    return this.inventoryRepository.findAll();
  }

  async getInventoryById(id: string): Promise<InventoryItem> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new Error('Inventory item not found');
    }
    return inventory;
  }

  async getInventoryByProductId(productId: string): Promise<InventoryItem[]> {
    return this.inventoryRepository.findByProductId(productId);
  }

  async getInventoryByLocation(location: string): Promise<InventoryItem[]> {
    return this.inventoryRepository.findByLocation(location);
  }

  async createInventory(dto: CreateInventoryDto): Promise<InventoryItem> {
    return this.inventoryRepository.create(dto);
  }

  async updateInventory(id: string, dto: UpdateInventoryDto): Promise<InventoryItem> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new Error('Inventory item not found');
    }
    return this.inventoryRepository.update(id, dto);
  }

  async deleteInventory(id: string): Promise<void> {
    const inventory = await this.inventoryRepository.findById(id);
    if (!inventory) {
      throw new Error('Inventory item not found');
    }
    await this.inventoryRepository.delete(id);
  }
}
