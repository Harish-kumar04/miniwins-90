import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { DailyQuote } from '../shared/DailyQuote';
import { StreakDisplay } from '../shared/StreakDisplay';
import { Badge } from '../shared/Badge';
import { DailyTaskCard } from '../goals/DailyTaskCard';
import { useAppStore } from '../../stores/useAppStore';
import { Category } from '../../types';
import { format } from 'date-fns';

interface DashboardProps {
  onCreateGoal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onCreateGoal }) => {
  const { goals, getTodaysTasks, getCurrentStreak, getDailyScore } = useAppStore();
  const todaysTasks = getTodaysTasks();
  const currentStreak = getCurrentStreak();
  const dailyScore = getDailyScore();
  
  const activeGoals = goals.filter(g => g.status === 'active');
  
  const getCategoryGoals = (category: Category) => {
    return activeGoals.filter(g => g.category === category);
  };
  
  const renderCategorySection = (category: Category, icon: string) => {
    const categoryGoals = getCategoryGoals(category);
    
    if (categoryGoals.length === 0) return null;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl font-bold text-gray-900">{category}</h2>
          <Badge className="ml-auto">
            {categoryGoals.length} {categoryGoals.length === 1 ? 'goal' : 'goals'}
          </Badge>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryGoals.map(goal => {
            const task = todaysTasks.find(t => t.goalId === goal.id);
            if (!task) return null;
            return <DailyTaskCard key={task.id} goal={goal} task={task} />;
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">MiniWins 90</h1>
              <p className="text-white/80">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </div>
            <div className="flex items-center gap-4">
              <StreakDisplay streak={currentStreak} />
              <div className="bg-white/20 rounded-full px-6 py-3 backdrop-blur-sm">
                <div className="text-sm text-white/80">Today's Score</div>
                <div className="text-2xl font-bold">{dailyScore}%</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onCreateGoal}
            className="bg-white text-indigo-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all hover:shadow-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Goal
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Daily Quote */}
        <DailyQuote />
        
        {/* Empty State */}
        {activeGoals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Goals</h3>
            <p className="text-gray-600 mb-6">Create your first goal to get started on your 30/60/90 day journey!</p>
            <button
              onClick={onCreateGoal}
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Your First Goal
            </button>
          </motion.div>
        )}
        
        {/* Categories */}
        {activeGoals.length > 0 && (
          <div className="space-y-12">
            {renderCategorySection(Category.PROFESSIONAL, '💼')}
            {renderCategorySection(Category.PERSONAL, '🎯')}
            {renderCategorySection(Category.LIFESTYLE, '🌱')}
          </div>
        )}
      </div>
    </div>
  );
};
