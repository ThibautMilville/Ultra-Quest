import React, { useState } from 'react';
import { X, Gift } from 'lucide-react';

interface UniqRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (reward: any) => void;
}

function UniqRewardModal({ isOpen, onClose, onAdd }: UniqRewardModalProps) {
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
    { value: 'common', label: 'Common', color: 'text-gray-400' },
    { value: 'rare', label: 'Rare', color: 'text-blue-400' },
    { value: 'epic', label: 'Epic', color: 'text-purple-400' },
    { value: 'legendary', label: 'Legendary', color: 'text-yellow-400' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-6 max-w-lg w-full mx-4 border border-gray-700 animate-scale-in hover-lift-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Gift size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add UNIQ Reward</h2>
              <p className="text-gray-400 text-sm">Create a new UNIQ NFT reward</p>
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
          {/* UNIQ Name */}
          <div>
            <label className="block text-white font-medium mb-2">UNIQ Name *</label>
            <input
              type="text"
              placeholder="e.g., Trailblazer Backpack Skin"
              value={rewardData.name}
              onChange={(e) => setRewardData({...rewardData, name: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description *</label>
            <textarea
              placeholder="Describe the UNIQ reward and its benefits"
              value={rewardData.description}
              onChange={(e) => setRewardData({...rewardData, description: e.target.value})}
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none resize-none text-sm"
            />
          </div>

          {/* Rarity */}
          <div>
            <label className="block text-white font-medium mb-2">Rarity</label>
            <select 
              value={rewardData.rarity}
              onChange={(e) => setRewardData({...rewardData, rarity: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-yellow-500 focus:outline-none text-sm"
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
            <label className="block text-white font-medium mb-2">Collection</label>
            <input
              type="text"
              placeholder="e.g., Ultra Quest Rewards"
              value={rewardData.collection}
              onChange={(e) => setRewardData({...rewardData, collection: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none text-sm"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-white font-medium mb-2">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/uniq-image.png"
              value={rewardData.image}
              onChange={(e) => setRewardData({...rewardData, image: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none text-sm"
            />
          </div>

          {/* Preview */}
          {rewardData.name && (
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-1">Preview</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                  🎁
                </div>
                <div>
                  <p className="text-white font-medium">{rewardData.name}</p>
                  <p className={`text-sm capitalize ${rarities.find(r => r.value === rewardData.rarity)?.color}`}>
                    {rewardData.rarity} UNIQ
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-all duration-200 text-sm hover-lift-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!rewardData.name || !rewardData.description}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-all duration-200 text-sm hover-lift-sm hover-glow"
          >
            Add UNIQ
          </button>
        </div>
      </div>
    </div>
  );
}

export default UniqRewardModal; 