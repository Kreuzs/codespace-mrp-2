import { Repository } from 'typeorm';
import { WorkOrder } from '../../domain/entities/WorkOrder';
import { IWorkOrderRepository } from '../../domain/repositories/IWorkOrderRepository';
import { AppDataSource } from '../database/dataSource';

export class WorkOrderRepository implements IWorkOrderRepository {
  private repository: Repository<WorkOrder>;

  constructor() {
    this.repository = AppDataSource.getRepository(WorkOrder);
  }

  async findAll(): Promise<WorkOrder[]> {
    return this.repository.find({
      relations: ['product', 'operations'],
      order: { scheduledStartDate: 'DESC' },
    });
  }

  async findById(id: string): Promise<WorkOrder | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['product', 'operations'],
    });
  }

  async findByOrderNumber(orderNumber: string): Promise<WorkOrder | null> {
    return this.repository.findOne({
      where: { orderNumber },
      relations: ['product', 'operations'],
    });
  }

  async findByStatus(status: string): Promise<WorkOrder[]> {
    return this.repository.find({
      where: { status },
      relations: ['product', 'operations'],
      order: { scheduledStartDate: 'ASC' },
    });
  }

  async create(workOrder: Partial<WorkOrder>): Promise<WorkOrder> {
    const newWorkOrder = this.repository.create(workOrder);
    return this.repository.save(newWorkOrder);
  }

  async update(id: string, workOrder: Partial<WorkOrder>): Promise<WorkOrder> {
    await this.repository.update(id, workOrder);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Work order not found after update');
    }
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
