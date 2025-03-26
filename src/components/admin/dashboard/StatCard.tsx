import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="bg-[#04968d]/10 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-[#04968d]" />
        </div>
        {trend && (
          <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold mt-4">{value.toLocaleString()}</h3>
      <p className="text-gray-600 mt-1">{title}</p>
    </div>
  );
};

export default StatCard;