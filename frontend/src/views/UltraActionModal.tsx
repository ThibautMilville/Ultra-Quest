import React, { useState } from 'react';
import { X, GamepadIcon, Download, Star, Trophy, Users, Zap } from 'lucide-react';
import { useTranslationWithFlags } from '../hooks/useTranslation';

interface UltraActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAction: (action: UltraAction) => void;
  editingAction?: any;
}

interface UltraAction {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirements?: {
    gameId?: string;
    achievementId?: string;
    playtime?: number;
    level?: number;
  };
}

// Nous devons créer cette fonction à l'intérieur du composant pour avoir accès à `t`

function UltraActionModal({ isOpen, onClose, onAddAction, editingAction }: UltraActionModalProps) {
  const { t } = useTranslationWithFlags();
  
  const actionTypes = [
    {
      id: 'install-game',
      type: t('admin.installGame'),
      title: t('admin.installGameTitle'),
      description: t('admin.installGameDesc'),
      icon: <Download size={20} className="text-blue-400" />,
      category: t('admin.gameActions')
    },
    {
      id: 'play-game',
      type: t('admin.playGame'),
      title: t('admin.playGameTitle'),
      description: t('admin.playGameDesc'),
      icon: <GamepadIcon size={20} className="text-green-400" />,
      category: t('admin.gameActions')
    },
    {
      id: 'achieve-level',
      type: t('admin.achieveLevel'),
      title: t('admin.achieveLevelTitle'),
      description: t('admin.achieveLevelDesc'),
      icon: <Star size={20} className="text-yellow-400" />,
      category: t('admin.gameActions')
    },
    {
      id: 'unlock-achievement',
      type: t('admin.unlockAchievement'),
      title: t('admin.unlockAchievementTitle'),
      description: t('admin.unlockAchievementDesc'),
      icon: <Trophy size={20} className="text-purple-400" />,
      category: t('admin.gameActions')
    },
    {
      id: 'join-community',
      type: t('admin.joinCommunity'),
      title: t('admin.joinCommunityTitle'),
      description: t('admin.joinCommunityDesc'),
      icon: <Users size={20} className="text-orange-400" />,
      category: t('admin.socialActions')
    },
    {
      id: 'daily-login',
      type: t('admin.dailyLogin'),
      title: t('admin.dailyLoginTitle'),
      description: t('admin.dailyLoginDesc'),
      icon: <Zap size={20} className="text-cyan-400" />,
      category: t('admin.platformActions')
    }
  ];
  
  const [selectedAction, setSelectedAction] = useState<typeof actionTypes[0] | null>(null);
  const [actionConfig, setActionConfig] = useState({
    gameId: '',
    achievementId: '',
    playtime: 60,
    level: 1,
    streakDays: 5
  });

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddAction = () => {
    if (!selectedAction) return;

    const action: UltraAction = {
      id: `${selectedAction.id}-${Date.now()}`,
      type: selectedAction.type,
      title: selectedAction.title,
      description: selectedAction.description,
      icon: selectedAction.icon,
      requirements: {
        gameId: actionConfig.gameId || undefined,
        achievementId: actionConfig.achievementId || undefined,
        playtime: selectedAction.id === 'play-game' ? actionConfig.playtime : undefined,
        level: selectedAction.id === 'achieve-level' ? actionConfig.level : undefined,
      }
    };

    onAddAction(action);
    onClose();
    setSelectedAction(null);
    setActionConfig({
      gameId: '',
      achievementId: '',
      playtime: 60,
      level: 1,
      streakDays: 5
    });
  };

  const groupedActions = actionTypes.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, typeof actionTypes>);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-700 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <GamepadIcon size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {editingAction ? t('admin.editAction') : t('admin.newUltraAction')}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">{t('admin.chooseActionType')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(95vh-120px)] lg:h-[calc(90vh-120px)]">
          {/* Action Types List */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-700 overflow-y-auto max-h-[40vh] lg:max-h-none">
            <h3 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">{t('admin.actionType')}</h3>
            
            {Object.entries(groupedActions).map(([category, actions]) => (
              <div key={category} className="mb-4 sm:mb-6">
                <h4 className="text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{category}</h4>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <div
                      key={action.id}
                      onClick={() => setSelectedAction(action)}
                      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAction?.id === action.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        {action.icon}
                        <span className="text-white font-medium text-sm sm:text-base">{action.type}</span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm">{action.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Configuration Panel */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto">
            {selectedAction ? (
              <div>
                <h3 className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">{t('admin.actionInformation')}</h3>
                
                <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    {selectedAction.icon}
                    <span className="text-white font-medium text-sm sm:text-base">{selectedAction.type}</span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">{selectedAction.description}</p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {/* Game Selection */}
                  {(selectedAction.id === 'install-game' || selectedAction.id === 'play-game' || selectedAction.id === 'achieve-level') && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.selectGame')}</label>
                      <select 
                        value={actionConfig.gameId}
                        onChange={(e) => setActionConfig({...actionConfig, gameId: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      >
                        <option value="">{t('admin.chooseGame')}</option>
                        <option value="ashes-of-mankind">Ashes of Mankind</option>
                        <option value="champion-tactics">Champion Tactics</option>
                        <option value="ultra-arena">Ultra Arena</option>
                      </select>
                    </div>
                  )}

                  {/* Playtime Configuration */}
                  {selectedAction.id === 'play-game' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.requiredPlaytime')}</label>
                      <input
                        type="number"
                        min="1"
                        value={actionConfig.playtime}
                        onChange={(e) => setActionConfig({...actionConfig, playtime: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                    </div>
                  )}

                  {/* Level Configuration */}
                  {selectedAction.id === 'achieve-level' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.requiredLevel')}</label>
                      <input
                        type="number"
                        min="1"
                        value={actionConfig.level}
                        onChange={(e) => setActionConfig({...actionConfig, level: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                    </div>
                  )}

                  {/* Achievement Configuration */}
                  {selectedAction.id === 'unlock-achievement' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.achievementId')}</label>
                      <input
                        type="text"
                        placeholder={t('admin.achievementIdPlaceholder')}
                        value={actionConfig.achievementId}
                        onChange={(e) => setActionConfig({...actionConfig, achievementId: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                    </div>
                  )}

                  {/* Login Streak Configuration */}
                  {selectedAction.id === 'daily-login' && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.requiredStreak')}</label>
                      <input
                        type="number"
                        min="1"
                        value={actionConfig.streakDays}
                        onChange={(e) => setActionConfig({...actionConfig, streakDays: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                  <button 
                    onClick={onClose}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    {t('action.cancel')}
                  </button>
                  <button 
                    onClick={handleAddAction}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    {t('admin.addAction')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center">
                  <GamepadIcon size={32} className="sm:w-12 sm:h-12 text-gray-600 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-400 text-sm sm:text-base">{t('admin.selectActionToConfig')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UltraActionModal; 