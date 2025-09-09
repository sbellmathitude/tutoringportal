
import React from 'react';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-neutral-medium/20 p-6 ${className}`}>
      <div className="flex items-center text-neutral-dark mb-4">
        <div className="mr-3 text-primary">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;