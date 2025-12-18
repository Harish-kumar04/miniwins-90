import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  const getColor = () => {
    if (clampedProgress >= 80) return 'bg-success';
    if (clampedProgress >= 50) return 'bg-warning';
    return 'bg-danger';
  };
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`h-full ${getColor()} rounded-full`}
      />
    </div>
  );
};
