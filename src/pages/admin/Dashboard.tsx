import React from 'react';
import DashboardHeader from '../../components/admin/DashboardHeader';
import DashboardCard from '../../components/admin/DashboardCard';
import Statistics from '../../components/admin/dashboard/Statistics';
import DatabaseStatus from '../../components/admin/DatabaseStatus';
import { dashboardCards } from '../../config/dashboardConfig';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <DashboardHeader />
        
        <Statistics />
        
        {/* Database Status Component */}
        <div className="mb-8">
          <DatabaseStatus />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;