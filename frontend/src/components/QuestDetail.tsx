import React, { useEffect } from 'react';
import { Gift, ArrowLeft, Check, Gamepad2, Timer, Star, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ashesQuests, ultraQuests, championQuests, socialQuests } from '../data/questsData';
import { useTranslation } from '../contexts/TranslationContext';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';
import { parseQuestSlug, createSlug } from '../utils/slugUtils';
import { getRewardDescriptionKey } from '../utils/rewardUtils';

function RewardCard({ reward }: { reward: any }) {
  const { t } = useTranslation();
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/50';
      case 'rare': return 'border-blue-500/50';
      case 'epic': return 'border-purple-500/50';
      case 'legendary': return 'border-yellow-500/50';
      default: return 'border-gray-500/50';
    }
  };

  return (
    <div className={`reward-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border ${getRarityBorder(reward.rarity)} hover:scale-105 transition-all duration-300 shadow-lg`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRarityColor(reward.rarity)} flex items-center justify-center shadow-lg`}>
          {reward.type === 'nft' && <Trophy size={24} className="text-white" />}
          {reward.type === 'skin' && <Star size={24} className="text-white" />}
          {reward.type === 'item' && <Gift size={24} className="text-white" />}
          {reward.type === 'utility' && <Gamepad2 size={24} className="text-white" />}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{reward.name}</h3>
          <p className="text-gray-400 text-sm capitalize">{t(`quest.rarity.${reward.rarity}` as any)} {t(`quest.rewardType.${reward.type}` as any)}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm mb-3">{t(getRewardDescriptionKey(reward.description) as any)}</p>
      {reward.from && (
        <p className="text-gray-500 text-xs">
          {reward.from.startsWith('by ') 
            ? `${t('quest.by')} ${reward.from.substring(3)}`
            : reward.from
          }
        </p>
      )}
    </div>
  );
}

function QuestDetail() {
  const { questId } = useParams();
  const { t } = useTranslation();
  const { getLocalizedUrl } = useLocalizedNavigation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Find quest by ID
  const allQuests = [...ashesQuests, ...ultraQuests, ...championQuests, ...socialQuests];
  let quest = null;
  
  if (questId) {
    const foundQuest = allQuests.find(q => q.id === questId);
    if (foundQuest) {
      // Translate quest if it's in the translated range
      if (foundQuest.category === 'ashes') {
        const questIndex = ashesQuests.findIndex(aq => aq.id === foundQuest.id);
        if (questIndex !== -1 && questIndex < 8) {
          quest = {
            ...foundQuest,
            title: t(`quest.ashes.${questIndex + 1}.title` as any),
            subtitle: t(`quest.ashes.${questIndex + 1}.subtitle` as any),
            description: t(`quest.ashes.${questIndex + 1}.description` as any)
          };
        } else {
          quest = foundQuest;
        }
      } else if (foundQuest.category === 'ultra') {
        const questIndex = ultraQuests.findIndex(uq => uq.id === foundQuest.id);
        if (questIndex !== -1 && questIndex < 6) {
          quest = {
            ...foundQuest,
            title: t(`quest.ultra.${questIndex + 1}.title` as any),
            subtitle: t(`quest.ultra.${questIndex + 1}.subtitle` as any),
            description: t(`quest.ultra.${questIndex + 1}.description` as any)
          };
        } else {
          quest = foundQuest;
        }
      } else if (foundQuest.category === 'champion') {
        const questIndex = championQuests.findIndex(cq => cq.id === foundQuest.id);
        if (questIndex !== -1 && questIndex < 5) {
          quest = {
            ...foundQuest,
            title: t(`quest.champion.${questIndex + 1}.title` as any),
            subtitle: t(`quest.champion.${questIndex + 1}.subtitle` as any),
            description: t(`quest.champion.${questIndex + 1}.description` as any)
          };
        } else {
          quest = foundQuest;
        }
      } else {
        quest = foundQuest;
      }
    }
  }

  if (!quest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <Header activeSection="nav.quests" />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('questDetail.notFound')}</h1>
          <p className="text-gray-400 mb-8">{t('questDetail.notFoundDescription')}</p>
          <Link to={getLocalizedUrl('/')} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
            {t('questDetail.backToQuests')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryInfo = () => {
    if (quest.category === 'ashes') {
      return {
        name: t('category.ashes'),
        color: 'from-orange-600 to-red-600',
        textColor: 'text-orange-400',
        bgColor: 'bg-orange-600'
      };
    }
    if (quest.category === 'ultra') {
      return {
        name: t('category.ultra'),
        color: 'from-purple-600 to-blue-600',
        textColor: 'text-purple-400',
        bgColor: 'bg-purple-600'
      };
    }
    return {
      name: t('category.champion'),
      color: 'from-green-600 to-emerald-600',
      textColor: 'text-green-400',
      bgColor: 'bg-green-600'
    };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header activeSection="nav.quests" />
      
      {/* Hero Header with Quest Image */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <img 
          src={quest.image} 
          alt={quest.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
          <Link 
            to={getLocalizedUrl('/')} 
            className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-full hover:bg-black/60 transition-all duration-200 shadow-lg hover-lift-sm"
          >
            <ArrowLeft size={16} className="text-white sm:w-5 sm:h-5" />
            <span className="text-white font-medium text-sm sm:text-base">{t('button.back')}</span>
          </Link>
        </div>

        {/* Quest Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="container mx-auto">
            <div className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4 bg-gradient-to-r ${categoryInfo.color} text-white shadow-lg`}>
              {categoryInfo.name}
            </div>
            <h1 className="text-2xl sm:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {quest.title}
            </h1>
            <p className="text-sm sm:text-xl text-gray-300 mb-4 sm:mb-6 max-w-3xl line-clamp-2 sm:line-clamp-none">{quest.subtitle}</p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <Gift size={16} className={`${categoryInfo.textColor} sm:w-5 sm:h-5`} />
                <span className="text-white font-medium text-sm sm:text-base">{quest.gems} {t('quest.gems')}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <Timer size={16} className={`${categoryInfo.textColor} sm:w-5 sm:h-5`} />
                <span className="text-white font-medium text-sm sm:text-base">{quest.lvlup} {t('quest.lvlup')}</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-300 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                {t('quest.endsIn')} {quest.endsIn}
              </div>
              <div className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full capitalize ${
                quest.difficulty === 'easy' ? 'bg-green-600/80 text-green-100' :
                quest.difficulty === 'medium' ? 'bg-yellow-600/80 text-yellow-100' :
                'bg-red-600/80 text-red-100'
              }`}>
                {t(`quest.difficulty.${quest.difficulty}` as any)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
          
          {/* Quest Description */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700/50">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{t('questDetail.description')}</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                {quest.description}
              </p>
              
              {/* Quest Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl">
                  <div className={`text-lg sm:text-2xl font-bold ${categoryInfo.textColor}`}>{quest.gems}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('quest.gems')}</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl">
                  <div className={`text-lg sm:text-2xl font-bold ${categoryInfo.textColor}`}>{quest.lvlup}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('quest.lvlup')}</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-white capitalize">{t(`quest.difficulty.${quest.difficulty}` as any)}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('quest.difficulty')}</div>
                </div>
                                  <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-white capitalize">{t(`quest.type.${quest.type}` as any)}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('quest.type')}</div>
                </div>
              </div>
            </div>

            {/* Rewards Section */}
            {quest.rewards && quest.rewards.length > 0 && (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <Trophy className={categoryInfo.textColor} size={28} />
                  {t('questDetail.rewards')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quest.rewards.map((reward) => (
                    <RewardCard key={reward.id} reward={reward} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-white">{t('questDetail.actions')}</h3>
              
              {quest.completed ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-600/20 border border-green-500/30 rounded-xl">
                    <Check size={24} className="text-green-400" />
                    <span className="text-green-400 font-medium">{t('questDetail.completed')}</span>
                  </div>
                  <button className={`w-full ${categoryInfo.bgColor} hover:opacity-90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg`}>
                    <Gift size={20} />
                    {t('button.claimRewards')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                    <p className="text-blue-400 text-sm font-medium">{t('questDetail.inProgress')}</p>
                    <p className="text-gray-300 text-sm mt-1">{t('questDetail.inProgressDescription')}</p>
                  </div>
                  <button className={`w-full ${categoryInfo.bgColor} hover:opacity-90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg`}>
                    <Gamepad2 size={20} />
                    {t('button.startQuest')}
                  </button>
                </div>
              )}

              {/* Quest Info */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t('questDetail.category')}</span>
                    <span className="text-white font-medium">{categoryInfo.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t('quest.difficulty')}</span>
                    <span className="text-white font-medium capitalize">{t(`quest.difficulty.${quest.difficulty}` as any)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t('quest.type')}</span>
                    <span className="text-white font-medium capitalize">{t(`quest.type.${quest.type}` as any)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t('questDetail.timeRemaining')}</span>
                    <span className="text-white font-medium">{quest.endsIn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default QuestDetail;