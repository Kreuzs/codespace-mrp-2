import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './infrastructure/database/dataSource';
import { ProductRepository } from './infrastructure/repositories/ProductRepository';
import { WorkOrderRepository } from './infrastructure/repositories/WorkOrderRepository';
import { InventoryRepository } from './infrastructure/repositories/InventoryRepository';
import { ProductService } from './application/services/ProductService';
import { WorkOrderService } from './application/services/WorkOrderService';
import { InventoryService } from './application/services/InventoryService';
import { ProductController } from './presentation/controllers/ProductController';
import { WorkOrderController } from './presentation/controllers/WorkOrderController';
import { InventoryController } from './presentation/controllers/InventoryController';
import { createProductRoutes } from './presentation/routes/productRoutes';
import { createWorkOrderRoutes } from './presentation/routes/workOrderRoutes';
import { createInventoryRoutes } from './presentation/routes/inventoryRoutes';
import { errorHandler } from './presentation/middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize repositories
const productRepository = new ProductRepository();
const workOrderRepository = new WorkOrderRepository();
const inventoryRepository = new InventoryRepository();

// Initialize services
const productService = new ProductService(productRepository);
const workOrderService = new WorkOrderService(workOrderRepository);
const inventoryService = new InventoryService(inventoryRepository);

// Initialize controllers
const productController = new ProductController(productService);
const workOrderController = new WorkOrderController(workOrderService);
const inventoryController = new InventoryController(inventoryService);

// Routes
app.use('/api/products', createProductRoutes(productController));
app.use('/api/work-orders', createWorkOrderRoutes(workOrderController));
app.use('/api/inventory', createInventoryRoutes(inventoryController));

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
