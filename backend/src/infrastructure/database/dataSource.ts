import { DataSource } from 'typeorm';
import { Product } from '../../domain/entities/Product';
import { BillOfMaterials } from '../../domain/entities/BillOfMaterials';
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { WorkOrder } from '../../domain/entities/WorkOrder';
import { WorkOrderOperation } from '../../domain/entities/WorkOrderOperation';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'mrp_system',
  synchronize: process.env.NODE_ENV === 'development', // Auto-sync in dev only
  logging: process.env.NODE_ENV === 'development',
  entities: [Product, BillOfMaterials, InventoryItem, WorkOrder, WorkOrderOperation],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};
