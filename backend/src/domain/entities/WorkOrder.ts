import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Product } from './Product';
import { WorkOrderOperation } from './WorkOrderOperation';

@Entity('work_orders')
export class WorkOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  orderNumber: string;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('decimal', { precision: 10, scale: 4 })
  quantity: number;

  @Column({ default: 'planned' })
  status: string; // 'planned', 'released', 'in_progress', 'completed', 'cancelled'

  @Column({ type: 'date' })
  scheduledStartDate: Date;

  @Column({ type: 'date' })
  scheduledEndDate: Date;

  @Column({ type: 'date', nullable: true })
  actualStartDate: Date;

  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  @Column({ default: 'normal' })
  priority: string; // 'low', 'normal', 'high', 'urgent'

  @Column('text', { nullable: true })
  notes: string;

  @OneToMany(() => WorkOrderOperation, operation => operation.workOrder)
  operations: WorkOrderOperation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
