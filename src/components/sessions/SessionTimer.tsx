import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from '../shared/Button';
import { motion } from 'framer-motion';

interface SessionTimerProps {
  onComplete: (activeTime: number) => void;
  onStop: () => void;
  targetMinutes?: number;
}

export const SessionTimer: React.FC<SessionTimerProps> = ({ 
  onComplete, 
  onStop,
  targetMinutes = 30 
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);
  
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };
  
  const handlePause = () => {
    setIsPaused(true);
  };
  
  const handleResume = () => {
    setIsPaused(false);
  };
  
  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    onStop();
  };
  
  const handleComplete = () => {
    setIsRunning(false);
    setIsPaused(false);
    onComplete(seconds);
  };
  
  const progressPercentage = Math.min((seconds / (targetMinutes * 60)) * 100, 100);
  
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Timer Display */}
      <div className="relative">
        <svg className="w-64 h-64 transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="#3F51B5"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 754 }}
            animate={{ 
              strokeDashoffset: 754 - (754 * progressPercentage) / 100,
            }}
            style={{
              strokeDasharray: 754,
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={seconds}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold text-gray-900 tabular-nums"
          >
            {formatTime(seconds)}
          </motion.div>
          {isRunning && !isPaused && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-2 text-sm text-primary font-medium"
            >
              Recording...
            </motion.div>
          )}
          {isPaused && (
            <div className="mt-2 text-sm text-warning font-medium">
              Paused
            </div>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex gap-4">
        {!isRunning ? (
          <Button variant="primary" onClick={handleStart} className="px-8 py-3">
            <Play className="w-5 h-5 mr-2 inline" />
            Start
          </Button>
        ) : (
          <>
            {!isPaused ? (
              <Button variant="warning" onClick={handlePause} className="px-6 py-3">
                <Pause className="w-5 h-5 mr-2 inline" />
                Pause
              </Button>
            ) : (
              <Button variant="success" onClick={handleResume} className="px-6 py-3">
                <Play className="w-5 h-5 mr-2 inline" />
                Resume
              </Button>
            )}
            <Button variant="danger" onClick={handleStop} className="px-6 py-3">
              <Square className="w-5 h-5 mr-2 inline" />
              Stop
            </Button>
            <Button variant="success" onClick={handleComplete} className="px-6 py-3">
              Complete
            </Button>
          </>
        )}
      </div>
      
      {/* Target Info */}
      <div className="text-center text-sm text-gray-600">
        Target: {targetMinutes} minutes
        {progressPercentage >= 100 && (
          <span className="ml-2 text-success font-medium">🎉 Target achieved!</span>
        )}
      </div>
    </div>
  );
};
