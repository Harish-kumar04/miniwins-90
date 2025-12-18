import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Award, ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';
import { useAppStore } from '../../stores/useAppStore';

export const Onboarding: React.FC = () => {
  const { initializeUser, completeOnboarding } = useAppStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  
  const slides = [
    {
      icon: <Target className="w-16 h-16 text-primary" />,
      title: 'Welcome to MiniWins 90',
      description: 'Transform your goals into daily wins. Track your progress over 30, 60, or 90 days.',
    },
    {
      icon: <Zap className="w-16 h-16 text-warning" />,
      title: 'Daily Focus Sessions',
      description: 'Start focused sessions with built-in timers. Track your time, notes, and distractions.',
    },
    {
      icon: <Award className="w-16 h-16 text-success" />,
      title: 'Earn Your Rewards',
      description: 'Complete your goals and unlock personalized rewards. Stay motivated every single day.',
    },
  ];
  
  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else if (step === slides.length - 1 && !name) {
      setStep(step + 1); // Go to name input
    } else {
      initializeUser(name);
      completeOnboarding();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
      >
        <AnimatePresence mode="wait">
          {step < slides.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">{slides[step].icon}</div>
              <h2 className="text-3xl font-bold text-gray-900">{slides[step].title}</h2>
              <p className="text-gray-600 text-lg">{slides[step].description}</p>
              
              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pt-4">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === step ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button onClick={handleNext} variant="primary" className="w-full py-3">
                {step === slides.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="name-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your name?</h2>
                <p className="text-gray-600">Let's personalize your experience</p>
              </div>
              
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && name && handleNext()}
              />
              
              <Button
                onClick={handleNext}
                disabled={!name}
                variant="primary"
                className="w-full py-3"
              >
                Start My Journey
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
