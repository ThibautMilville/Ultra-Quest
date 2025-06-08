import React, { useState } from 'react';
import { X, Gift } from 'lucide-react';
import { useTranslationWithFlags } from '../hooks/useTranslation';

interface UniqRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (reward: any) => void;
}

function UniqRewardModal({ isOpen, onClose, onAdd }: UniqRewardModalProps) {
  const { t } = useTranslationWithFlags();
  const [rewardData, setRewardData] = useState({
    name: '',
    description: '',
    rarity: 'common',
    collection: '',
    image: ''
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (rewardData.name && rewardData.description) {
      onAdd({
        id: Date.now(),
        type: 'uniq',
        ...rewardData
      });
      setRewardData({
        name: '',
        description: '',
        rarity: 'common',
        collection: '',
        image: ''
      });
      onClose();
    }
  };

  const rarities = [
    { value: 'common', label: t('admin.common'), color: 'text-gray-400' },
    { value: 'rare', label: t('admin.rare'), color: 'text-blue-400' },
    { value: 'epic', label: t('admin.epic'), color: 'text-purple-400' },
    { value: 'legendary', label: t('admin.legendary'), color: 'text-yellow-400' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-lg w-full max-h-[95vh] overflow-y-auto border border-gray-700 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Gift size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{t('admin.newUniqReward')}</h2>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">{t('admin.createNewUniqReward')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors hover-lift-sm p-1"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* UNIQ Name */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.titleField')} *</label>
            <input
              type="text"
              placeholder="e.g., Trailblazer Backpack Skin"
              value={rewardData.name}
              onChange={(e) => setRewardData({...rewardData, name: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.description')} *</label>
            <textarea
              placeholder="Describe the UNIQ reward and its benefits"
              value={rewardData.description}
              onChange={(e) => setRewardData({...rewardData, description: e.target.value})}
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none resize-none text-sm sm:text-base"
            />
          </div>

          {/* Rarity */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.rarity')}</label>
            <select 
              value={rewardData.rarity}
              onChange={(e) => setRewardData({...rewardData, rarity: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-yellow-500 focus:outline-none text-sm sm:text-base"
            >
              {rarities.map((rarity) => (
                <option key={rarity.value} value={rarity.value}>
                  {rarity.label}
                </option>
              ))}
            </select>
          </div>

          {/* Collection */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.collection')}</label>
            <input
              type="text"
              placeholder={t('admin.collectionPlaceholder')}
              value={rewardData.collection}
              onChange={(e) => setRewardData({...rewardData, collection: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.imageUrl')}</label>
            <input
              type="url"
              placeholder={t('admin.imageUrlPlaceholder')}
              value={rewardData.image}
              onChange={(e) => setRewardData({...rewardData, image: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Preview */}
          {rewardData.name && (
            <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
              <h4 className="text-white font-medium mb-1 text-sm sm:text-base">{t('admin.preview')}</h4>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-lg flex items-center justify-center text-sm sm:text-base">
                  🎁
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">{rewardData.name}</p>
                  <p className={`text-xs sm:text-sm capitalize ${rarities.find(r => r.value === rewardData.rarity)?.color}`}>
                    {rewardData.rarity} UNIQ
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base hover-lift-sm"
          >
            {t('action.cancel')}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!rewardData.name || !rewardData.description}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base hover-lift-sm hover-glow"
          >
            {t('admin.addUniq')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UniqRewardModal; 