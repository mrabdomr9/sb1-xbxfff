import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import Card from '../common/Card';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const DashboardCard = ({ title, description, icon: Icon, link }: DashboardCardProps) => {
  return (
    <Link to={link}>
      <Card className="p-6 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center space-x-4">
          <div className="bg-[#04968d]/10 p-3 rounded-lg">
            <Icon className="h-8 w-8 text-[#04968d]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        <div className="mt-4 h-1 w-0 group-hover:w-full bg-[#04968d] transition-all duration-300"></div>
      </Card>
    </Link>
  );
};

export default DashboardCard;