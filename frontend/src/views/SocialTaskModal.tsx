import React, { useState } from 'react';
import { X, MessageCircle, Youtube, Twitter } from 'lucide-react';
import { useTranslationWithFlags } from '../hooks/useTranslation';

interface SocialTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTask?: any;
  onUpdate?: (task: any) => void;
}

function SocialTaskModal({ isOpen, onClose, editingTask, onUpdate }: SocialTaskModalProps) {
  const { t } = useTranslationWithFlags();
  const [selectedPlatform, setSelectedPlatform] = useState<'twitter' | 'discord' | 'youtube' | null>(editingTask?.platform || null);
  const [taskType, setTaskType] = useState(editingTask?.type || t('admin.followAccount'));
  const [accountAddress, setAccountAddress] = useState(editingTask?.accountAddress || '');
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');

  if (!isOpen) return null;

  const platforms = [
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
    { id: 'discord', icon: MessageCircle, label: 'Discord' },
    { id: 'youtube', icon: Youtube, label: 'YouTube' }
  ];

  const taskTypes = [
    { key: 'followAccount', label: t('admin.followAccount') },
    { key: 'likePost', label: t('admin.likePost') },
    { key: 'retweetPost', label: t('admin.retweetPost') },
    { key: 'commentPost', label: t('admin.commentPost') },
    { key: 'joinServer', label: t('admin.joinServer') },
    { key: 'subscribeChannel', label: t('admin.subscribeChannel') }
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[95vh] overflow-y-auto border border-gray-700 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <MessageCircle size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {editingTask ? t('admin.editTask') : t('admin.newSocialMediaTask')}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                {editingTask ? t('admin.editTask') : t('admin.addNewTask')}
              </p>
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
          {/* Task Type */}
          <div>
            <label className="block text-white font-medium mb-3">{t('admin.taskType')}</label>
            <p className="text-gray-400 text-sm mb-3">{t('admin.platform')}</p>
            
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
                <option key={type.key} value={type.label}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Task Information */}
          <div>
            <label className="block text-white font-medium mb-3">{t('admin.taskInformation')}</label>
            
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-1">{t('admin.accountAddress')}</label>
                <input
                  type="text"
                  placeholder="https://x.com/"
                  value={accountAddress}
                  onChange={(e) => setAccountAddress(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">{t('admin.titleField')}</label>
                <input
                  type="text"
                  placeholder={t('admin.taskTitle')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1">{t('admin.description')}</label>
                <textarea
                  placeholder={t('admin.taskDescription')}
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
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base hover-lift-sm"
          >
            {t('action.cancel')}
          </button>
          <button 
            onClick={() => {
              if (editingTask && onUpdate) {
                onUpdate({
                  ...editingTask,
                  platform: selectedPlatform,
                  type: taskType,
                  accountAddress,
                  title,
                  description
                });
              }
              onClose();
            }}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base hover-lift-sm hover-glow"
          >
            {editingTask ? t('action.save') : t('admin.add')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialTaskModal; 