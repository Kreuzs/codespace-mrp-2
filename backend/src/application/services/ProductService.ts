import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { CreateProductDto, UpdateProductDto } from '../dtos/ProductDto';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async getProductByCode(code: string): Promise<Product> {
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    // Check if product code already exists
    const existing = await this.productRepository.findByCode(dto.code);
    if (existing) {
      throw new Error('Product with this code already exists');
    }
    return this.productRepository.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return this.productRepository.update(id, dto);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await this.productRepository.delete(id);
  }
}
