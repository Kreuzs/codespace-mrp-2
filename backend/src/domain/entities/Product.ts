import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BillOfMaterials } from './BillOfMaterials';
import { InventoryItem } from './InventoryItem';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: 'each' })
  unit: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  standardCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  sellingPrice: number;

  @Column({ default: 0 })
  leadTimeDays: number;

  @Column({ default: 0 })
  reorderPoint: number;

  @Column({ default: 0 })
  economicOrderQuantity: number;

  @Column({ default: 'raw_material' })
  productType: string; // 'raw_material', 'component', 'finished_good'

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => BillOfMaterials, bom => bom.product)
  billOfMaterials: BillOfMaterials[];

  @OneToMany(() => InventoryItem, inventory => inventory.product)
  inventory: InventoryItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
