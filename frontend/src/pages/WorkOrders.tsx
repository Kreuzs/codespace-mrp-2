import { useEffect, useState } from 'react';
import { workOrdersApi } from '../api';

type Product = {
  id: string;
  name: string;
};

type WorkOrder = {
  id: string;
  orderNumber: string;
  productId: string;
  product?: Product;
  quantity: number;
  status: string;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  priority: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    fetchWorkOrders();
  }, [filter]);

  const fetchWorkOrders = async () => {
    try {
      const response = await workOrdersApi.getAll(filter || undefined);
      setWorkOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planned: 'bg-gray-200 text-gray-800',
      released: 'bg-blue-200 text-blue-800',
      in_progress: 'bg-yellow-200 text-yellow-800',
      completed: 'bg-green-200 text-green-800',
      cancelled: 'bg-red-200 text-red-800',
    };
    return colors[status] || 'bg-gray-200 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-gray-600',
      normal: 'text-blue-600',
      high: 'text-orange-600',
      urgent: 'text-red-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Work Orders</h1>
          <p className="text-gray-600">Manage production orders</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="planned">Planned</option>
          <option value="released">Released</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {workOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No work orders found</p>
          </div>
        ) : (
          workOrders.map((workOrder) => (
            <div
              key={workOrder.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {workOrder.orderNumber}
                  </h3>
                  <p className="text-gray-600">
                    {workOrder.product?.name || `Product ID: ${workOrder.productId}`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      workOrder.status
                    )}`}
                  >
                    {workOrder.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 font-semibold ${getPriorityColor(workOrder.priority)}`}>
                    {workOrder.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Quantity</p>
                  <p className="font-semibold text-gray-800">{workOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(workOrder.scheduledStartDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(workOrder.scheduledEndDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Created</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(workOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {workOrder.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">{workOrder.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkOrders;
