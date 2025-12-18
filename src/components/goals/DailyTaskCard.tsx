import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, MinusCircle, Play, Target, Clock } from 'lucide-react';
import { Button } from '../shared/Button';
import { TaskStatus, MasterGoal, DailyTask } from '../../types';
import { useAppStore } from '../../stores/useAppStore';
import { SessionScreen } from '../sessions/SessionScreen';

interface DailyTaskCardProps {
  goal: MasterGoal;
  task: DailyTask;
}

export const DailyTaskCard: React.FC<DailyTaskCardProps> = ({ goal, task }) => {
  const { updateTaskStatus, startSession } = useAppStore();
  const [showSession, setShowSession] = useState(false);
  
  const handleStatusChange = (status: TaskStatus) => {
    updateTaskStatus(task.id, status);
  };
  
  const handleStartSession = () => {
    startSession(goal.id, task.id);
    setShowSession(true);
  };
  
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle className="w-5 h-5 text-success" />;
      case TaskStatus.PARTIAL:
        return <MinusCircle className="w-5 h-5 text-warning" />;
      case TaskStatus.MISSED:
        return <Circle className="w-5 h-5 text-danger" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Target className="w-4 h-4" />
              {goal.dailyTargetDescription}
            </p>
            {goal.dailyTimeTarget && (
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {goal.dailyTimeTarget} minutes
              </p>
            )}
          </div>
          {getStatusIcon(task.status)}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
            className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              task.status === TaskStatus.COMPLETED
                ? 'bg-success text-white'
                : 'bg-success/10 text-success hover:bg-success/20'
            }`}
          >
            ✅ Done
          </button>
          <button
            onClick={() => handleStatusChange(TaskStatus.PARTIAL)}
            className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              task.status === TaskStatus.PARTIAL
                ? 'bg-warning text-white'
                : 'bg-warning/10 text-warning hover:bg-warning/20'
            }`}
          >
            🟡 Partial
          </button>
          <button
            onClick={() => handleStatusChange(TaskStatus.MISSED)}
            className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              task.status === TaskStatus.MISSED
                ? 'bg-danger text-white'
                : 'bg-danger/10 text-danger hover:bg-danger/20'
            }`}
          >
            🔴 Missed
          </button>
        </div>
        
        {task.status === TaskStatus.PENDING && (
          <Button
            onClick={handleStartSession}
            variant="primary"
            className="w-full mt-3"
          >
            <Play className="w-4 h-4 mr-2 inline" />
            Start Session
          </Button>
        )}
      </motion.div>
      
      <SessionScreen
        isOpen={showSession}
        onClose={() => setShowSession(false)}
        goalId={goal.id}
        dailyTaskId={task.id}
        goalTitle={goal.title}
        targetMinutes={goal.dailyTimeTarget}
      />
    </>
  );
};
