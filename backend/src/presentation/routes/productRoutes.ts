import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export const createProductRoutes = (controller: ProductController): Router => {
  const router = Router();

  router.get('/', controller.getAllProducts);
  router.get('/:id', controller.getProductById);
  router.post('/', controller.createProduct);
  router.put('/:id', controller.updateProduct);
  router.delete('/:id', controller.deleteProduct);

  return router;
};
