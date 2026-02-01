import { Router } from 'express';
import { WorkOrderController } from '../controllers/WorkOrderController';

export const createWorkOrderRoutes = (controller: WorkOrderController): Router => {
  const router = Router();

  router.get('/', controller.getAllWorkOrders);
  router.get('/:id', controller.getWorkOrderById);
  router.post('/', controller.createWorkOrder);
  router.put('/:id', controller.updateWorkOrder);
  router.delete('/:id', controller.deleteWorkOrder);

  return router;
};
