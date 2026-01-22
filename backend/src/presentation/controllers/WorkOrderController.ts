import { Request, Response, NextFunction } from 'express';
import { WorkOrderService } from '../../application/services/WorkOrderService';

export class WorkOrderController {
  constructor(private workOrderService: WorkOrderService) {}

  getAllWorkOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.query;
      const workOrders = status
        ? await this.workOrderService.getWorkOrdersByStatus(status as string)
        : await this.workOrderService.getAllWorkOrders();
      res.json({
        success: true,
        data: workOrders,
      });
    } catch (error) {
      next(error);
    }
  };

  getWorkOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workOrder = await this.workOrderService.getWorkOrderById(req.params.id);
      res.json({
        success: true,
        data: workOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  createWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workOrder = await this.workOrderService.createWorkOrder(req.body);
      res.status(201).json({
        success: true,
        data: workOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  updateWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workOrder = await this.workOrderService.updateWorkOrder(req.params.id, req.body);
      res.json({
        success: true,
        data: workOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.workOrderService.deleteWorkOrder(req.params.id);
      res.json({
        success: true,
        message: 'Work order deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
