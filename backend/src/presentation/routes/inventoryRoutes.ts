import { Router } from 'express';
import { InventoryController } from '../controllers/InventoryController';

export const createInventoryRoutes = (controller: InventoryController): Router => {
  const router = Router();

  router.get('/', controller.getAllInventory);
  router.get('/:id', controller.getInventoryById);
  router.post('/', controller.createInventory);
  router.put('/:id', controller.updateInventory);
  router.delete('/:id', controller.deleteInventory);

  return router;
};
