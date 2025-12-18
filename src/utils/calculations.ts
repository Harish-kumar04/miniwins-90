import { DailyTask, MasterGoal, Session, TaskStatus } from '../types';
import { startOfDay, differenceInDays } from 'date-fns';

export const calculateDailyScore = (tasks: DailyTask[]): number => {
  if (tasks.length === 0) return 0;
  
  let totalScore = 0;
  tasks.forEach(task => {
    if (task.status === TaskStatus.COMPLETED) totalScore += 100;
    else if (task.status === TaskStatus.PARTIAL) totalScore += 50;
  });
  
  return Math.round(totalScore / tasks.length);
};

export const calculateGoalProgress = (goal: MasterGoal, tasks: DailyTask[]): number => {
  const goalTasks = tasks.filter(t => t.goalId === goal.id);
  if (goalTasks.length === 0) return 0;
  
  const completed = goalTasks.filter(t => t.status === TaskStatus.COMPLETED).length;
  const partial = goalTasks.filter(t => t.status === TaskStatus.PARTIAL).length;
  
  return ((completed + partial * 0.5) / goalTasks.length) * 100;
};

export const calculateSessionScore = (session: Session, timeTarget: number, currentStreak: number): number => {
  const timeScore = Math.min((session.activeTime / 60) / timeTarget, 1) * 100;
  const focusBonus = (session.focusRating || 0) * 10;
  const disturbancePenalty = session.disturbances.length * 5;
  const streakMultiplier = Math.min(currentStreak * 2, 20);
  
  const finalScore = Math.max(0, timeScore + focusBonus - disturbancePenalty + streakMultiplier);
  
  return Math.round(Math.min(finalScore, 150));
};

export const generateDailyTasks = (goal: MasterGoal): DailyTask[] => {
  const tasks: DailyTask[] = [];
  const start = startOfDay(new Date(goal.startDate));
  const end = startOfDay(new Date(goal.endDate));
  const days = differenceInDays(end, start) + 1;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    
    tasks.push({
      id: `${goal.id}-${date.toISOString()}`,
      goalId: goal.id,
      date,
      status: TaskStatus.PENDING,
    });
  }
  
  return tasks;
};

export const checkRewardUnlock = (goal: MasterGoal, tasks: DailyTask[]): boolean => {
  const progress = calculateGoalProgress(goal, tasks);
  return progress >= goal.successThreshold * 100;
};

export const calculateStreak = (tasks: DailyTask[]): number => {
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  const today = startOfDay(new Date());
  
  for (const task of sortedTasks) {
    const taskDate = startOfDay(new Date(task.date));
    const daysDiff = differenceInDays(today, taskDate);
    
    if (daysDiff > streak) break;
    
    if (task.status === TaskStatus.COMPLETED) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};
