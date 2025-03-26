import React from 'react';
import { Users, Briefcase, Eye } from 'lucide-react';
import StatCard from './StatCard';
import { useStatsStore } from '../../../store/statsStore';
import { useServicesStore } from '../../../store/servicesStore';
import { useProjectStore } from '../../../store/projectStore';

const Statistics = () => {
  const visitors = useStatsStore((state) => state.visitors);
  const services = useServicesStore((state) => state.services.length);
  const clients = useProjectStore((state) => state.projects.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Website Visitors"
        value={visitors}
        icon={Eye}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Active Clients"
        value={clients}
        icon={Users}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Services Offered"
        value={services}
        icon={Briefcase}
      />
    </div>
  );
};

export default Statistics;