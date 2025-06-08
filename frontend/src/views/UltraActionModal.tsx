import React, { useState } from 'react';
import { X, GamepadIcon, Download, Star, Trophy, Users, Zap } from 'lucide-react';

interface UltraActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAction: (action: UltraAction) => void;
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

const actionTypes = [
  {
    id: 'install-game',
    type: 'Install Game',
    title: 'Install a specific game',
    description: 'User must install and launch a game from Ultra',
    icon: <Download size={20} className="text-blue-400" />,
    category: 'Game Actions'
  },
  {
    id: 'play-game',
    type: 'Play Game',
    title: 'Play for specific duration',
    description: 'User must play a game for a certain amount of time',
    icon: <GamepadIcon size={20} className="text-green-400" />,
    category: 'Game Actions'
  },
  {
    id: 'achieve-level',
    type: 'Achieve Level',
    title: 'Reach a specific level',
    description: 'User must reach a certain level in a game',
    icon: <Star size={20} className="text-yellow-400" />,
    category: 'Game Actions'
  },
  {
    id: 'unlock-achievement',
    type: 'Unlock Achievement',
    title: 'Unlock specific achievement',
    description: 'User must unlock a particular achievement',
    icon: <Trophy size={20} className="text-purple-400" />,
    category: 'Game Actions'
  },
  {
    id: 'join-community',
    type: 'Join Community',
    title: 'Join game community',
    description: 'User must join the game\'s community or guild',
    icon: <Users size={20} className="text-orange-400" />,
    category: 'Social Actions'
  },
  {
    id: 'daily-login',
    type: 'Daily Login',
    title: 'Login streak',
    description: 'User must maintain a login streak',
    icon: <Zap size={20} className="text-cyan-400" />,
    category: 'Platform Actions'
  }
];

function UltraActionModal({ isOpen, onClose, onAddAction }: UltraActionModalProps) {
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <GamepadIcon size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add Ultra Action</h2>
              <p className="text-gray-400 text-sm">Choose an action type for your quest</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Action Types List */}
          <div className="w-1/2 p-6 border-r border-gray-700 overflow-y-auto">
            <h3 className="text-white font-medium mb-4">Action Types</h3>
            
            {Object.entries(groupedActions).map(([category, actions]) => (
              <div key={category} className="mb-6">
                <h4 className="text-gray-400 text-sm font-medium mb-3">{category}</h4>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <div
                      key={action.id}
                      onClick={() => setSelectedAction(action)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAction?.id === action.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {action.icon}
                        <span className="text-white font-medium">{action.type}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{action.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Configuration Panel */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {selectedAction ? (
              <div>
                <h3 className="text-white font-medium mb-4">Configure Action</h3>
                
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedAction.icon}
                    <span className="text-white font-medium">{selectedAction.type}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{selectedAction.description}</p>
                </div>

                <div className="space-y-4">
                  {/* Game Selection */}
                  {(selectedAction.id === 'install-game' || selectedAction.id === 'play-game' || selectedAction.id === 'achieve-level') && (
                    <div>
                      <label className="block text-white font-medium mb-2">Select Game</label>
                      <select 
                        value={actionConfig.gameId}
                        onChange={(e) => setActionConfig({...actionConfig, gameId: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">Choose a game...</option>
                        <option value="ashes-of-mankind">Ashes of Mankind</option>
                        <option value="champion-tactics">Champion Tactics</option>
                        <option value="ultra-arena">Ultra Arena</option>
                      </select>
                    </div>
                  )}

                  {/* Playtime Configuration */}
                  {selectedAction.id === 'play-game' && (
                    <div>
                      <label className="block text-white font-medium mb-2">Required Playtime (minutes)</label>
                      <input
                        type="number"
                        min="1"
                        value={actionConfig.playtime}
                        onChange={(e) => setActionConfig({...actionConfig, playtime: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Level Configuration */}
                  {selectedAction.id === 'achieve-level' && (
                    <div>
                      <label className="block text-white font-medium mb-2">Required Level</label>
                      <input
                        type="number"
                        min="1"
                        value={actionConfig.level}
                        onChange={(e) => setActionConfig({...actionConfig, level: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Achievement Configuration */}
                  {selectedAction.id === 'unlock-achievement' && (
                    <div>
                      <label className="block text-white font-medium mb-2">Achievement ID</label>
                      <input
                        type="text"
                        placeholder="Enter achievement identifier"
                        value={actionConfig.achievementId}
                        onChange={(e) => setActionConfig({...actionConfig, achievementId: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Login Streak Configuration */}
                  {selectedAction.id === 'daily-login' && (
                    <div>
                      <label className="block text-white font-medium mb-2">Required Streak (days)</label>
                      <input
                        type="number"
                        min="1"
                        value={actionConfig.streakDays}
                        onChange={(e) => setActionConfig({...actionConfig, streakDays: parseInt(e.target.value)})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={onClose}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddAction}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Add Action
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <GamepadIcon size={48} className="text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select an action type to configure</p>
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