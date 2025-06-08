import React from 'react';
import { Reward } from '../data/questsData';
import { useTranslation } from '../contexts/TranslationContext';

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const { t } = useTranslation();
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skin': return '👕';
      case 'item': return '🎒';
      case 'nft': return '🎨';
      case 'currency': return '💎';
      case 'utility': return '🔧';
      default: return '🎁';
    }
  };

  return (
    <div className={`reward-card border-2 rounded-lg p-4 ${getRarityColor(reward.rarity)} hover:scale-105 transition-transform`}>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
          {getTypeIcon(reward.type)}
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-sm">{reward.name}</h4>
          <p className="text-gray-400 text-xs">{reward.description}</p>
          {reward.from && (
            <p className="text-gray-500 text-xs italic">
              {reward.from.startsWith('by ') 
                ? `${t('quest.by')} ${reward.from.substring(3)}`
                : reward.from
              }
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardCard; 