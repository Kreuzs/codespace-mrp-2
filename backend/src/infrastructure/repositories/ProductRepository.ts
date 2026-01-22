import { Repository } from 'typeorm';
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { AppDataSource } from '../database/dataSource';

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find({
      relations: ['billOfMaterials', 'inventory'],
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['billOfMaterials', 'inventory'],
    });
  }

  async findByCode(code: string): Promise<Product | null> {
    return this.repository.findOne({
      where: { code },
      relations: ['billOfMaterials', 'inventory'],
    });
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.repository.create(product);
    return this.repository.save(newProduct);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    await this.repository.update(id, product);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Product not found after update');
    }
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
