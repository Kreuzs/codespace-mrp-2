import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';

@Entity('bill_of_materials')
export class BillOfMaterials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('uuid')
  componentId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'componentId' })
  component: Product;

  @Column('decimal', { precision: 10, scale: 4 })
  quantity: number;

  @Column({ default: 'each' })
  unit: string;

  @Column({ default: 1 })
  sequenceNumber: number;

  @Column('text', { nullable: true })
  notes: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
