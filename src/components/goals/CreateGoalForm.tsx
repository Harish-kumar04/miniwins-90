import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Category } from '../../types';
import { useAppStore } from '../../stores/useAppStore';
import { Upload } from 'lucide-react';

interface CreateGoalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGoalForm: React.FC<CreateGoalFormProps> = ({ isOpen, onClose }) => {
  const { createGoal } = useAppStore();
  const [formData, setFormData] = useState({
    title: '',
    category: Category.PROFESSIONAL,
    duration: 30 as 30 | 60 | 90,
    dailyTargetDescription: '',
    dailyTimeTarget: 30,
    rewardName: '',
    rewardImage: '',
    successThreshold: 0.8,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGoal(formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      category: Category.PROFESSIONAL,
      duration: 30,
      dailyTargetDescription: '',
      dailyTimeTarget: 30,
      rewardName: '',
      rewardImage: '',
      successThreshold: 0.8,
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, rewardImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Goal">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Goal Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Master SD-WAN Technology"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={Category.PROFESSIONAL}>{Category.PROFESSIONAL}</option>
            <option value={Category.PERSONAL}>{Category.PERSONAL}</option>
            <option value={Category.LIFESTYLE}>{Category.LIFESTYLE}</option>
          </select>
        </div>
        
        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration *
          </label>
          <div className="flex gap-3">
            {[30, 60, 90].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setFormData({ ...formData, duration: days as 30 | 60 | 90 })}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  formData.duration === days
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>
        </div>
        
        {/* Daily Target Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Target Description *
          </label>
          <textarea
            required
            value={formData.dailyTargetDescription}
            onChange={(e) => setFormData({ ...formData, dailyTargetDescription: e.target.value })}
            placeholder="e.g., Practice SD-WAN configuration for 30 minutes"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Daily Time Target */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Time Target (minutes)
          </label>
          <input
            type="number"
            value={formData.dailyTimeTarget}
            onChange={(e) => setFormData({ ...formData, dailyTimeTarget: parseInt(e.target.value) })}
            min="5"
            max="300"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Reward Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reward Name *
          </label>
          <input
            type="text"
            required
            value={formData.rewardName}
            onChange={(e) => setFormData({ ...formData, rewardName: e.target.value })}
            placeholder="e.g., New Wireless Headphones"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Reward Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reward Image (Optional)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {formData.rewardImage ? 'Image uploaded' : 'Upload image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {formData.rewardImage && (
              <img src={formData.rewardImage} alt="Reward" className="w-16 h-16 object-cover rounded-lg" />
            )}
          </div>
        </div>
        
        {/* Success Threshold */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Success Threshold: {Math.round(formData.successThreshold * 100)}%
          </label>
          <input
            type="range"
            min="50"
            max="100"
            step="5"
            value={formData.successThreshold * 100}
            onChange={(e) => setFormData({ ...formData, successThreshold: parseInt(e.target.value) / 100 })}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum completion rate required to unlock your reward
          </p>
        </div>
        
        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="success" className="flex-1">
            Create Goal
          </Button>
        </div>
      </form>
    </Modal>
  );
};
