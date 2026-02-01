import { Repository } from 'typeorm';
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { IInventoryRepository } from '../../domain/repositories/IInventoryRepository';
import { AppDataSource } from '../database/dataSource';

export class InventoryRepository implements IInventoryRepository {
  private repository: Repository<InventoryItem>;

  constructor() {
    this.repository = AppDataSource.getRepository(InventoryItem);
  }

  async findAll(): Promise<InventoryItem[]> {
    return this.repository.find({
      relations: ['product'],
      order: { location: 'ASC' },
    });
  }

  async findById(id: string): Promise<InventoryItem | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async findByProductId(productId: string): Promise<InventoryItem[]> {
    return this.repository.find({
      where: { productId },
      relations: ['product'],
    });
  }

  async findByLocation(location: string): Promise<InventoryItem[]> {
    return this.repository.find({
      where: { location },
      relations: ['product'],
    });
  }

  async create(inventory: Partial<InventoryItem>): Promise<InventoryItem> {
    const newInventory = this.repository.create(inventory);
    return this.repository.save(newInventory);
  }

  async update(id: string, inventory: Partial<InventoryItem>): Promise<InventoryItem> {
    await this.repository.update(id, inventory);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Inventory item not found after update');
    }
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
