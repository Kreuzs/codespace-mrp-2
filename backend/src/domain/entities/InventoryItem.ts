import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';

@Entity('inventory_items')
export class InventoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  location: string;

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  quantityOnHand: number;

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  quantityReserved: number;

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  quantityAvailable: number;

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  quantityOnOrder: number;

  @Column({ type: 'timestamp', nullable: true })
  lastStockDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
