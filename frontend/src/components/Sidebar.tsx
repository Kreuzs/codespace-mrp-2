import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Products', path: '/products', icon: '📦' },
    { name: 'Work Orders', path: '/work-orders', icon: '🏭' },
    { name: 'Inventory', path: '/inventory', icon: '📋' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-primary-800 to-primary-900 text-white shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">MRP II System</h1>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-primary-800 shadow-md'
                    : 'hover:bg-primary-700 hover:shadow-md'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
