import React from 'react';
import { TaskStatus } from '../../types';

interface BadgeProps {
  status?: TaskStatus;
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children, className = '' }) => {
  const statusClasses = {
    [TaskStatus.COMPLETED]: 'bg-success/10 text-success border-success/20',
    [TaskStatus.PARTIAL]: 'bg-warning/10 text-warning border-warning/20',
    [TaskStatus.MISSED]: 'bg-danger/10 text-danger border-danger/20',
    [TaskStatus.PENDING]: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  
  const baseClass = status ? statusClasses[status] : 'bg-primary/10 text-primary border-primary/20';
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${baseClass} ${className}`}>
      {children}
    </span>
  );
};
