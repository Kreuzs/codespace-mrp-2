interface CardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const Card = ({ title, value, icon, color = 'primary', trend }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`text-5xl bg-${color}-50 p-4 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
