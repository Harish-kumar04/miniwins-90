import React from 'react';
import { Sparkles } from 'lucide-react';
import { getDailyQuote } from '../../data/quotes';
import { motion } from 'framer-motion';

export const DailyQuote: React.FC = () => {
  const quote = getDailyQuote();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20"
    >
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <p className="text-gray-700 italic text-lg leading-relaxed">
          "{quote}"
        </p>
      </div>
    </motion.div>
  );
};
