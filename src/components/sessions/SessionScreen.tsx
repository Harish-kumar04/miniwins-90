import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { SessionTimer } from './SessionTimer';
import { Button } from '../shared/Button';
import { StickyNote, AlertCircle, Star } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { motion } from 'framer-motion';

interface SessionScreenProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
  dailyTaskId: string;
  goalTitle: string;
  targetMinutes?: number;
}

export const SessionScreen: React.FC<SessionScreenProps> = ({
  isOpen,
  onClose,
  goalTitle,
  targetMinutes = 30,
}) => {
  const { activeSession, addSessionNote, addSessionDisturbance, completeSession, stopSession } = useAppStore();
  const [noteInput, setNoteInput] = useState('');
  const [disturbanceInput, setDisturbanceInput] = useState('');
  const [showRating, setShowRating] = useState(false);
  const [focusRating, setFocusRating] = useState(0);
  
  const handleAddNote = () => {
    if (noteInput.trim()) {
      addSessionNote(noteInput.trim());
      setNoteInput('');
    }
  };
  
  const handleAddDisturbance = () => {
    if (disturbanceInput.trim()) {
      addSessionDisturbance(disturbanceInput.trim());
      setDisturbanceInput('');
    }
  };
  
  const handleComplete = () => {
    setShowRating(true);
  };
  
  const handleFinalComplete = () => {
    if (focusRating > 0) {
      completeSession(focusRating);
      setShowRating(false);
      setFocusRating(0);
      onClose();
    }
  };
  
  const handleStop = () => {
    stopSession();
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Session: ${goalTitle}`}>
      <div className="space-y-8">
        {!showRating ? (
          <>
            {/* Timer */}
            <SessionTimer
              onComplete={handleComplete}
              onStop={handleStop}
              targetMinutes={targetMinutes}
            />
            
            {/* Notes Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <StickyNote className="w-4 h-4" />
                Add Note
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  placeholder="What did you accomplish?"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button onClick={handleAddNote} variant="secondary">
                  Add
                </Button>
              </div>
              {activeSession && activeSession.notes.length > 0 && (
                <div className="space-y-2 mt-3">
                  {activeSession.notes.map((note, idx) => (
                    <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(note.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-gray-700">{note.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Disturbances Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <AlertCircle className="w-4 h-4" />
                Log Disturbance
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={disturbanceInput}
                  onChange={(e) => setDisturbanceInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddDisturbance()}
                  placeholder="Phone call, noise, etc."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button onClick={handleAddDisturbance} variant="secondary">
                  Log
                </Button>
              </div>
              {activeSession && activeSession.disturbances.length > 0 && (
                <div className="space-y-2 mt-3">
                  {activeSession.disturbances.map((dist, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(dist.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="text-gray-700">{dist.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Great Work!</h3>
            <div className="space-y-3">
              <p className="text-gray-600">How focused were you during this session?</p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFocusRating(rating)}
                    className={`p-2 transition-transform hover:scale-110 active:scale-95 ${focusRating >= rating ? 'text-warning' : 'text-gray-300'}`}
                  >
                    <Star className="w-10 h-10" fill={focusRating >= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleFinalComplete}
              disabled={focusRating === 0}
              variant="success"
              className="px-8 py-3"
            >
              Complete Session
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
