export enum Category {
  PROFESSIONAL = 'Professional Goal',
  PERSONAL = 'Personal Discipline',
  LIFESTYLE = 'Food & Lifestyle',
}

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  PARTIAL = 'partial',
  MISSED = 'missed',
}

export enum GoalStatus {
  ACTIVE = 'active',
  ACHIEVED = 'achieved',
  FAILED = 'failed',
}

export interface User {
  id: string;
  name: string;
  createdAt: Date;
  onboardingCompleted: boolean;
}

export interface MasterGoal {
  id: string;
  title: string;
  category: Category;
  duration: 30 | 60 | 90;
  dailyTargetDescription: string;
  dailyTimeTarget?: number; // minutes
  rewardName: string;
  rewardImage?: string;
  successThreshold: number; // 0-1 (e.g., 0.8 = 80%)
  startDate: Date;
  endDate: Date;
  status: GoalStatus;
  createdAt: Date;
}

export interface DailyTask {
  id: string;
  goalId: string;
  date: Date;
  status: TaskStatus;
  completedAt?: Date;
}

export interface Disturbance {
  timestamp: Date;
  description: string;
}

export interface SessionNote {
  timestamp: Date;
  content: string;
}

export interface Session {
  id: string;
  goalId: string;
  dailyTaskId: string;
  startTime: Date;
  endTime?: Date;
  activeTime: number; // seconds
  pausedTime: number; // seconds
  notes: SessionNote[];
  disturbances: Disturbance[];
  focusRating?: number; // 1-5
  score?: number;
}

export interface Reward {
  id: string;
  goalId: string;
  name: string;
  image?: string;
  unlockedAt?: Date;
  claimedAt?: Date;
}

export interface WeeklySummary {
  weekStart: Date;
  weekEnd: Date;
  bestCategory: Category;
  weakestCategory: Category;
  mostConsistentGoalId?: string;
  mostMissedGoalId?: string;
  suggestion: string;
}
