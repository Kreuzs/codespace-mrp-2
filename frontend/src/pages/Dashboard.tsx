import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { productsApi, workOrdersApi, inventoryApi } from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeWorkOrders: 0,
    inventoryItems: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, workOrdersRes, inventoryRes] = await Promise.all([
          productsApi.getAll(),
          workOrdersApi.getAll(),
          inventoryApi.getAll(),
        ]);

        const activeOrders = workOrdersRes.data.data.filter(
          (wo: any) => wo.status === 'in_progress' || wo.status === 'released'
        );

        const lowStockItems = inventoryRes.data.data.filter(
          (item: any) => item.quantityAvailable < 10
        );

        setStats({
          totalProducts: productsRes.data.data.length,
          activeWorkOrders: activeOrders.length,
          inventoryItems: inventoryRes.data.data.length,
          lowStock: lowStockItems.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your MRP II System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Products"
          value={stats.totalProducts}
          icon="📦"
          color="blue"
        />
        <Card
          title="Active Work Orders"
          value={stats.activeWorkOrders}
          icon="🏭"
          color="green"
        />
        <Card
          title="Inventory Items"
          value={stats.inventoryItems}
          icon="📋"
          color="purple"
        />
        <Card
          title="Low Stock Items"
          value={stats.lowStock}
          icon="⚠️"
          color="red"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <p className="text-gray-600">No recent activity to display</p>
      </div>
    </div>
  );
};

export default Dashboard;
