import React, { useState } from 'react';
import { X, Copy } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface DuplicateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  questTitle: string;
}

function DuplicateQuestModal({ isOpen, onClose, questTitle }: DuplicateQuestModalProps) {
  const [newTitle, setNewTitle] = useState(`${questTitle} - Copy`);
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[95vh] overflow-y-auto border border-gray-700 animate-scale-in hover-lift-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Copy size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{t('admin.duplicateQuest')}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.newQuestTitle')}</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
            <p className="text-gray-300 text-xs sm:text-sm">
              {t('admin.duplicateQuestDescription')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            {t('action.cancel')}
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
            {t('button.duplicate')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DuplicateQuestModal; 