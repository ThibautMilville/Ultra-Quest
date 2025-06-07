import React, { useState } from 'react';
import { X, Copy } from 'lucide-react';

interface DuplicateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  questTitle: string;
}

function DuplicateQuestModal({ isOpen, onClose, questTitle }: DuplicateQuestModalProps) {
  const [newTitle, setNewTitle] = useState(`${questTitle} (Copy)`);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-gray-700 animate-scale-in hover-lift-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Copy size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Duplicate Quest</h2>
              <p className="text-gray-400 text-sm">Create a copy of this quest</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors hover-lift-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">New Quest Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none text-sm"
            />
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-gray-300 text-sm">
              This will create an exact copy of the quest with all its tasks, rewards, and settings. 
              The new quest will be created as a draft.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-all duration-200 text-sm hover-lift-sm"
          >
            Cancel
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200 text-sm hover-lift-sm hover-glow">
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
}

export default DuplicateQuestModal; 