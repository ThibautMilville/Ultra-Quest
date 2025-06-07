import React, { useState } from 'react';
import { X, MessageCircle, Youtube, Twitter } from 'lucide-react';

interface SocialTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SocialTaskModal({ isOpen, onClose }: SocialTaskModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'twitter' | 'discord' | 'youtube' | null>(null);
  const [taskType, setTaskType] = useState('Follow an account');
  const [accountAddress, setAccountAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const platforms = [
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
    { id: 'discord', icon: MessageCircle, label: 'Discord' },
    { id: 'youtube', icon: Youtube, label: 'YouTube' }
  ];

  const taskTypes = [
    'Follow an account',
    'Like a post',
    'Retweet a post',
    'Comment on a post',
    'Join a server',
    'Subscribe to channel'
  ];

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
              <MessageCircle size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">New Social Media Task</h2>
              <p className="text-gray-400 text-sm">Add a new task</p>
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
          {/* Task Type */}
          <div>
            <label className="block text-white font-medium mb-3">Task type</label>
            <p className="text-gray-400 text-sm mb-3">Platform</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id as any)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedPlatform === platform.id
                        ? 'border-white bg-gray-700'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <Icon size={20} className="text-white mx-auto mb-1" />
                    <p className="text-white text-xs">{platform.label}</p>
                  </button>
                );
              })}
            </div>

            <select 
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none text-sm"
            >
              {taskTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Task Information */}
          <div>
            <label className="block text-white font-medium mb-3">Task information</label>
            
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Account Address</label>
                <input
                  type="text"
                  placeholder="https://x.com/"
                  value={accountAddress}
                  onChange={(e) => setAccountAddress(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">Description</label>
                <textarea
                  placeholder="Task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none text-sm"
                />
              </div>
            </div>
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialTaskModal; 