import { IWorkOrderRepository } from '../../domain/repositories/IWorkOrderRepository';
import { WorkOrder } from '../../domain/entities/WorkOrder';
import { CreateWorkOrderDto, UpdateWorkOrderDto } from '../dtos/WorkOrderDto';

export class WorkOrderService {
  constructor(private workOrderRepository: IWorkOrderRepository) {}

  async getAllWorkOrders(): Promise<WorkOrder[]> {
    return this.workOrderRepository.findAll();
  }

  async getWorkOrderById(id: string): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findById(id);
    if (!workOrder) {
      throw new Error('Work order not found');
    }
    return workOrder;
  }

  async getWorkOrdersByStatus(status: string): Promise<WorkOrder[]> {
    return this.workOrderRepository.findByStatus(status);
  }

  async createWorkOrder(dto: CreateWorkOrderDto): Promise<WorkOrder> {
    // Check if order number already exists
    const existing = await this.workOrderRepository.findByOrderNumber(dto.orderNumber);
    if (existing) {
      throw new Error('Work order with this order number already exists');
    }
    return this.workOrderRepository.create(dto);
  }

  async updateWorkOrder(id: string, dto: UpdateWorkOrderDto): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findById(id);
    if (!workOrder) {
      throw new Error('Work order not found');
    }
    return this.workOrderRepository.update(id, dto);
  }

  async deleteWorkOrder(id: string): Promise<void> {
    const workOrder = await this.workOrderRepository.findById(id);
    if (!workOrder) {
      throw new Error('Work order not found');
    }
    await this.workOrderRepository.delete(id);
  }
}
