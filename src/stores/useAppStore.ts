import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, MasterGoal, DailyTask, Session, Reward, TaskStatus, GoalStatus } from '../types';
import { generateDailyTasks, calculateDailyScore, calculateStreak } from '../utils/calculations';
import { startOfDay, isSameDay } from 'date-fns';

interface AppState {
  user: User | null;
  goals: MasterGoal[];
  dailyTasks: DailyTask[];
  sessions: Session[];
  rewards: Reward[];
  activeSession: Session | null;
  
  initializeUser: (name: string) => void;
  completeOnboarding: () => void;
  
  createGoal: (goal: Omit<MasterGoal, 'id' | 'createdAt' | 'startDate' | 'endDate' | 'status'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  
  startSession: (goalId: string, dailyTaskId: string) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  stopSession: () => void;
  completeSession: (focusRating: number) => void;
  addSessionNote: (content: string) => void;
  addSessionDisturbance: (description: string) => void;
  
  unlockReward: (goalId: string) => void;
  claimReward: (rewardId: string) => void;
  
  getTodaysTasks: () => DailyTask[];
  getCurrentStreak: () => number;
  getDailyScore: () => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      goals: [],
      dailyTasks: [],
      sessions: [],
      rewards: [],
      activeSession: null,
      
      initializeUser: (name: string) => {
        set({
          user: {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date(),
            onboardingCompleted: false,
          },
        });
      },
      
      completeOnboarding: () => {
        set(state => ({
          user: state.user ? { ...state.user, onboardingCompleted: true } : null,
        }));
      },
      
      createGoal: (goalData) => {
        const startDate = startOfDay(new Date());
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + goalData.duration - 1);
        
        const newGoal: MasterGoal = {
          ...goalData,
          id: crypto.randomUUID(),
          startDate,
          endDate,
          status: GoalStatus.ACTIVE,
          createdAt: new Date(),
        };
        
        const newTasks = generateDailyTasks(newGoal);
        
        const newReward: Reward = {
          id: crypto.randomUUID(),
          goalId: newGoal.id,
          name: goalData.rewardName,
          image: goalData.rewardImage,
        };
        
        set(state => ({
          goals: [...state.goals, newGoal],
          dailyTasks: [...state.dailyTasks, ...newTasks],
          rewards: [...state.rewards, newReward],
        }));
      },
      
      updateTaskStatus: (taskId: string, status: TaskStatus) => {
        set(state => ({
          dailyTasks: state.dailyTasks.map(task =>
            task.id === taskId
              ? { ...task, status, completedAt: status !== TaskStatus.PENDING ? new Date() : undefined }
              : task
          ),
        }));
      },
      
      startSession: (goalId: string, dailyTaskId: string) => {
        const newSession: Session = {
          id: crypto.randomUUID(),
          goalId,
          dailyTaskId,
          startTime: new Date(),
          activeTime: 0,
          pausedTime: 0,
          notes: [],
          disturbances: [],
        };
        
        set({ activeSession: newSession });
      },
      
      pauseSession: () => {
        set(state => {
          if (!state.activeSession) return state;
          return {
            activeSession: {
              ...state.activeSession,
              pausedTime: state.activeSession.pausedTime + 1,
            },
          };
        });
      },
      
      resumeSession: () => {
        // Resume logic handled in component
      },
      
      stopSession: () => {
        set({ activeSession: null });
      },
      
      completeSession: (focusRating: number) => {
        set(state => {
          if (!state.activeSession) return state;
          
          const completedSession: Session = {
            ...state.activeSession,
            endTime: new Date(),
            focusRating,
          };
          
          return {
            sessions: [...state.sessions, completedSession],
            activeSession: null,
          };
        });
      },
      
      addSessionNote: (content: string) => {
        set(state => {
          if (!state.activeSession) return state;
          
          return {
            activeSession: {
              ...state.activeSession,
              notes: [
                ...state.activeSession.notes,
                { timestamp: new Date(), content },
              ],
            },
          };
        });
      },
      
      addSessionDisturbance: (description: string) => {
        set(state => {
          if (!state.activeSession) return state;
          
          return {
            activeSession: {
              ...state.activeSession,
              disturbances: [
                ...state.activeSession.disturbances,
                { timestamp: new Date(), description },
              ],
            },
          };
        });
      },
      
      unlockReward: (goalId: string) => {
        set(state => ({
          rewards: state.rewards.map(reward =>
            reward.goalId === goalId
              ? { ...reward, unlockedAt: new Date() }
              : reward
          ),
        }));
      },
      
      claimReward: (rewardId: string) => {
        set(state => ({
          rewards: state.rewards.map(reward =>
            reward.id === rewardId
              ? { ...reward, claimedAt: new Date() }
              : reward
          ),
        }));
      },
      
      getTodaysTasks: () => {
        const today = startOfDay(new Date());
        return get().dailyTasks.filter(task => isSameDay(new Date(task.date), today));
      },
      
      getCurrentStreak: () => {
        return calculateStreak(get().dailyTasks);
      },
      
      getDailyScore: () => {
        const todaysTasks = get().getTodaysTasks();
        return calculateDailyScore(todaysTasks);
      },
    }),
    {
      name: 'miniwins-storage',
    }
  )
);
