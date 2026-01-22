import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkOrder } from './WorkOrder';

@Entity('work_order_operations')
export class WorkOrderOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workOrderId: string;

  @ManyToOne(() => WorkOrder, workOrder => workOrder.operations)
  @JoinColumn({ name: 'workOrderId' })
  workOrder: WorkOrder;

  @Column()
  operationName: string;

  @Column()
  sequenceNumber: number;

  @Column()
  workCenter: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  setupTime: number; // in minutes

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  runTime: number; // in minutes

  @Column({ default: 'pending' })
  status: string; // 'pending', 'in_progress', 'completed', 'skipped'

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
