import { WorkOrder } from '../entities/WorkOrder';

export interface IWorkOrderRepository {
  findAll(): Promise<WorkOrder[]>;
  findById(id: string): Promise<WorkOrder | null>;
  findByOrderNumber(orderNumber: string): Promise<WorkOrder | null>;
  findByStatus(status: string): Promise<WorkOrder[]>;
  create(workOrder: Partial<WorkOrder>): Promise<WorkOrder>;
  update(id: string, workOrder: Partial<WorkOrder>): Promise<WorkOrder>;
  delete(id: string): Promise<boolean>;
}
