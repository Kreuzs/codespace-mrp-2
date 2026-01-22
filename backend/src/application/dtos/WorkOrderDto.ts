export interface CreateWorkOrderDto {
  orderNumber: string;
  productId: string;
  quantity: number;
  scheduledStartDate: Date;
  scheduledEndDate: Date;
  priority?: string;
  notes?: string;
}

export interface UpdateWorkOrderDto {
  orderNumber?: string;
  productId?: string;
  quantity?: number;
  status?: string;
  scheduledStartDate?: Date;
  scheduledEndDate?: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  priority?: string;
  notes?: string;
}
