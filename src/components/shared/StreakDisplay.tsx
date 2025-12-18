import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakDisplayProps {
  streak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  const getFlameSize = () => {
    if (streak >= 30) return 'w-8 h-8';
    if (streak >= 14) return 'w-7 h-7';
    if (streak >= 7) return 'w-6 h-6';
    return 'w-5 h-5';
  };
  
  const getFlameColor = () => {
    if (streak >= 30) return 'text-orange-600';
    if (streak >= 14) return 'text-orange-500';
    if (streak >= 7) return 'text-orange-400';
    return 'text-orange-300';
  };
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-4 py-2"
    >
      <motion.div
        animate={streak > 0 ? { 
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className={`${getFlameSize()} ${getFlameColor()}`} fill="currentColor" />
      </motion.div>
      <div className="font-bold text-gray-900">
        {streak} {streak === 1 ? 'day' : 'days'}
      </div>
    </motion.div>
  );
};
