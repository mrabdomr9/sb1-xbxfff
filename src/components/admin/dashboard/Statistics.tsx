import React from 'react';
import { Users, Briefcase, Eye } from 'lucide-react';
import StatCard from './StatCard';
import { useStatsStore } from '../../../store/statsStore';
import { useServices, useProjects } from '../../../hooks/useDatabaseIntegration';

const Statistics = () => {
  const visitors = useStatsStore((state) => state.visitors);
  const { data: services } = useServices();
  const { data: projects } = useProjects();

  const servicesCount = services?.length || 0;
  const projectsCount = projects?.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Website Visitors"
        value={visitors}
        icon={Eye}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Active Projects"
        value={projectsCount}
        icon={Users}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Services Offered"
        value={servicesCount}
        icon={Briefcase}
      />
    </div>
  );
};

export default Statistics;