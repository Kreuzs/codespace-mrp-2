import { Request, Response, NextFunction } from 'express';
import { InventoryService } from '../../application/services/InventoryService';

export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  getAllInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, location } = req.query;
      let inventory;
      if (productId) {
        inventory = await this.inventoryService.getInventoryByProductId(productId as string);
      } else if (location) {
        inventory = await this.inventoryService.getInventoryByLocation(location as string);
      } else {
        inventory = await this.inventoryService.getAllInventory();
      }
      res.json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  };

  getInventoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.inventoryService.getInventoryById(req.params.id as string);
      res.json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  };

  createInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.inventoryService.createInventory(req.body);
      res.status(201).json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  };

  updateInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inventory = await this.inventoryService.updateInventory(req.params.id as string, req.body);
      res.json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.inventoryService.deleteInventory(req.params.id as string);
      res.json({
        success: true,
        message: 'Inventory item deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
