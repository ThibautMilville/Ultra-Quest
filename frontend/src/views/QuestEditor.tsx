import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, Plus, Twitter, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import SocialTaskModal from './SocialTaskModal';
import UniqRewardModal from './UniqRewardModal';
import UltraActionModal from './UltraActionModal';
import ImageUploadModal from '../components/ImageUploadModal';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';
import { useTranslation } from '../contexts/TranslationContext';
import { ashesQuests, ultraQuests, championQuests } from '../data/questsData';

// Utility function to translate task types
const getTranslatedTaskType = (taskType: string, t: any) => {
  const typeMap: { [key: string]: string } = {
    'Follow an account': 'admin.followAccount',
    'Like a post': 'admin.likePost',
    'Retweet a post': 'admin.retweetPost',
    'Comment on a post': 'admin.commentPost',
    'Join a server': 'admin.joinServer',
    'Subscribe to channel': 'admin.subscribeChannel',
    '5 day login streak': 'admin.loginStreak'
  };
  
  return typeMap[taskType] ? t(typeMap[taskType] as any) : taskType;
};

interface QuestEditorProps {
  step?: 'information' | 'tasks' | 'rewards';
}

function QuestEditor() {
  const { step = 'information', questId } = useParams();
  const { getLocalizedUrl } = useLocalizedNavigation();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(step || 'information');
  const [showSocialTaskModal, setShowSocialTaskModal] = useState(false);
  const [showUniqModal, setShowUniqModal] = useState(false);
  const [showUltraActionModal, setShowUltraActionModal] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showGemsModal, setShowGemsModal] = useState(false);
  const [gemsAmount, setGemsAmount] = useState(50);
  const [editingReward, setEditingReward] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editingAction, setEditingAction] = useState<any>(null);
  
  // Determine if this is an edit (has questId) or create (no questId)
  const isEditing = !!questId;
  
  // Find the quest data if editing
  const findQuestById = (id: string) => {
    const allQuests = [...ashesQuests, ...ultraQuests, ...championQuests];
    return allQuests.find(quest => quest.id === id);
  };
  
  const currentQuest = questId ? findQuestById(questId) : null;
  
  const [rewards, setRewards] = useState<any[]>([]);
  const [socialTasks, setSocialTasks] = useState<any[]>([]);
  const [ultraActions, setUltraActions] = useState<any[]>([]);
  const [questData, setQuestData] = useState({
    name: '',
    tagline: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    noEndDate: false,
    recurrence: 'Once'
  });

  // Load quest data when editing
  useEffect(() => {
    if (isEditing && currentQuest) {
      setQuestData({
        name: currentQuest.title,
        tagline: currentQuest.subtitle,
        description: currentQuest.description || '',
        image: currentQuest.image,
        startDate: '2025-01-22', // Default date since not in quest data
        endDate: '',
        noEndDate: true,
        recurrence: 'Once'
      });
      
      // Set default rewards based on quest data
      setRewards([
        {
          id: 1,
          type: 'gems',
          name: 'Gems',
          amount: currentQuest.gems,
          description: 'Ultra Quest gems reward'
        }
      ]);
      
      // Add quest rewards if they exist
      if (currentQuest.rewards && currentQuest.rewards.length > 0) {
        const questRewards = currentQuest.rewards.map((reward, index) => ({
          id: index + 2,
          type: 'uniq',
          name: reward.name,
          rarity: reward.rarity,
          description: reward.description
        }));
        setRewards(prev => [...prev, ...questRewards]);
      }
      
      // Set default social tasks for editing
      setSocialTasks([
        {
          id: 1,
          platform: 'twitter',
          type: 'Follow an account',
          title: t('admin.task.followUltraX'),
          description: t('admin.task.followUltraXDesc')
        },
        {
          id: 2,
          platform: 'youtube',
          type: 'Follow an account',
          title: t('admin.task.followUltraYoutube'),
          description: t('admin.task.followUltraYoutubeDesc')
        },
        {
          id: 3,
          platform: 'login',
          type: '5 day login streak',
          title: t('admin.task.loginStreak5Days'),
          description: t('admin.task.loginStreak5DaysDesc')
        }
      ]);
    }
  }, [isEditing, currentQuest]);

  const handleAddUltraAction = (action: any) => {
    setUltraActions([...ultraActions, action]);
  };

  const getStepStatus = (stepId: string) => {
    if (stepId === 'information') {
      return { 
        completed: questData.name.trim() !== '' && questData.tagline.trim() !== '' && questData.description.trim() !== '' && questData.image.trim() !== '' && questData.startDate.trim() !== ''
      };
    }
    if (stepId === 'tasks') return { completed: socialTasks.length > 0 || ultraActions.length > 0 };
    if (stepId === 'rewards') return { completed: rewards.length > 0 };
    return { completed: false };
  };

  const steps = [
    { id: 'information', label: t('admin.questInformation'), ...getStepStatus('information') },
    { id: 'tasks', label: t('admin.tasks'), ...getStepStatus('tasks') },
    { id: 'rewards', label: t('admin.rewards'), ...getStepStatus('rewards') }
  ];

  const getStepIcon = (step: any) => {
    if (step.completed) {
      return <Check size={16} className="text-white" />;
    }
    return null;
  };

  const getStepBg = (stepId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (step?.completed) return 'bg-green-600';
    if (stepId === activeStep) return 'bg-white text-black';
    return 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header activeSection="nav.admin" />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-gray-800 min-h-auto lg:min-h-screen p-4 lg:p-6">
          <div className="flex lg:flex-col lg:space-y-4 space-x-4 lg:space-x-0 overflow-x-auto lg:overflow-x-visible">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap min-w-fit ${
                  step.id === activeStep ? 'bg-gray-700' : 'hover:bg-gray-700/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${getStepBg(step.id)}`}>
                  {getStepIcon(step) || (step.id === activeStep ? '●' : '○')}
                </div>
                <span className="font-medium text-base flex-shrink-0">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with Background */}
          <div className="relative h-32 sm:h-48 bg-gradient-to-r from-gray-800 to-gray-700 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=300&fit=crop&crop=center"
              alt="Quest Editor Background"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            
            {/* Header Content */}
            <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4">
              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
                <Link 
                  to={getLocalizedUrl("/admin/quest-manager")}
                  className="flex items-center gap-1 sm:gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">{t('admin.leaveQuestEditor')}</span>
                </Link>
              </div>
              
              <div className="text-white text-center sm:text-right">
                <h1 className="text-lg sm:text-2xl font-bold mb-1">
                  {activeStep === 'information' && t('admin.questInformation')}
                  {activeStep === 'tasks' && t('admin.tasks')}
                  {activeStep === 'rewards' && t('admin.rewards')}
                </h1>
                <p className="text-white/80 text-xs sm:text-base">
                  {isEditing ? t('admin.editQuest') : t('admin.createNewQuest')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-8">

          {/* Quest Information Step */}
          {activeStep === 'information' && (
            <div className="max-w-4xl">

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Quest Name */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('admin.questName')}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('admin.questNamePlaceholder')}
                      value={questData.name}
                      onChange={(e) => setQuestData({...questData, name: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                    />
                    <span className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-400 text-xs sm:text-sm">64</span>
                  </div>
                </div>

                {/* Quest Tagline */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('admin.questTagline')}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t('admin.questTaglinePlaceholder')}
                      value={questData.tagline}
                      onChange={(e) => setQuestData({...questData, tagline: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                    />
                    <span className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-400 text-xs sm:text-sm">128</span>
                  </div>
                </div>

                {/* Quest Description */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('admin.questDescription')}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder={t('admin.questDescriptionPlaceholder')}
                      value={questData.description}
                      onChange={(e) => setQuestData({...questData, description: e.target.value})}
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none text-sm sm:text-base sm:rows-6"
                    />
                    {/* Toolbar - Hidden on mobile */}
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 hidden sm:flex items-center gap-2 text-gray-400">
                      <button className="hover:text-white transition-colors">B</button>
                      <button className="hover:text-white transition-colors italic">I</button>
                      <button className="hover:text-white transition-colors underline">U</button>
                      <button className="hover:text-white transition-colors">T</button>
                      <button className="hover:text-white transition-colors">🔗</button>
                      <button className="hover:text-white transition-colors">≡</button>
                      <button className="hover:text-white transition-colors">⋯</button>
                    </div>
                  </div>
                </div>

                {/* Quest Image */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('admin.questImage')}
                    <Check size={14} className="sm:w-4 sm:h-4 text-green-500" />
                  </label>
                  {questData.image ? (
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={questData.image} 
                        alt="Quest preview"
                        className="w-full h-32 sm:h-48 object-cover"
                      />
                      <div 
                        onClick={() => setShowImageUpload(true)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <div className="text-white text-center">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                            📁
                          </div>
                          <p className="font-medium text-sm sm:text-base">{t('admin.changeImage')}</p>
                          <p className="text-xs sm:text-sm">{t('admin.recommendedImageSize')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setQuestData({...questData, image: ''})}
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X size={12} className="sm:w-4 sm:h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setShowImageUpload(true)}
                      className="border-2 border-dashed border-gray-600 rounded-lg p-6 sm:p-12 text-center hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <div className="text-gray-400 mb-2 sm:mb-4">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          📁
                        </div>
                        <p className="font-medium text-sm sm:text-base">{t('admin.uploadImage')}</p>
                        <p className="text-xs sm:text-sm">{t('admin.recommendedImageSize')}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quest Date */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('admin.questDate')}
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="flex-1 w-full">
                      <input
                        type="date"
                        value={questData.startDate}
                        onChange={(e) => setQuestData({...questData, startDate: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <input
                        type="date"
                        value={questData.endDate}
                        onChange={(e) => setQuestData({...questData, endDate: e.target.value})}
                        disabled={questData.noEndDate}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-purple-500 focus:outline-none disabled:opacity-50 text-sm sm:text-base"
                      />
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="noEndDate"
                          checked={questData.noEndDate}
                          onChange={(e) => setQuestData({...questData, noEndDate: e.target.checked})}
                          className="sr-only"
                        />
                        <label
                          htmlFor="noEndDate"
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            questData.noEndDate ? 'bg-purple-600 border-purple-600' : 'border-gray-600'
                          }`}
                        >
                          {questData.noEndDate && <Check size={12} className="text-white" />}
                        </label>
                      </div>
                      <label htmlFor="noEndDate" className="text-white cursor-pointer">
                        {t('admin.noEndDate')}
                      </label>
                      <span className="text-red-500">*</span>
                    </div>
                  </div>
                </div>

                {/* Recurrence */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    {t('admin.recurrence')}
                    <Check size={16} className="text-green-500" />
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      { key: 'Once', label: t('admin.once') },
                      { key: 'Daily', label: t('admin.daily') },
                      { key: 'Weekly', label: t('admin.weekly') },
                      { key: 'Monthly', label: t('admin.monthly') }
                    ].map((option) => (
                      <button
                        key={option.key}
                        onClick={() => setQuestData({...questData, recurrence: option.key})}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                          questData.recurrence === option.key
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 gap-4">
                <div className="flex gap-2 sm:gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    {t('admin.saveDraft')}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    {t('admin.preview')}
                  </button>
                </div>
                <button 
                  onClick={() => setActiveStep('tasks')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  {t('admin.next')}
                </button>
              </div>
            </div>
          )}

          {/* Tasks Step */}
          {activeStep === 'tasks' && (
            <div className="max-w-4xl">

              <div className="space-y-8">
                {/* Existing Ultra Actions */}
                {ultraActions.length > 0 && (
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      {t('admin.ultraActions')} ({ultraActions.length})
                    </label>
                    <div className="space-y-3 mb-6">
                      {ultraActions.map((action) => (
                        <div key={action.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                              {action.icon}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{action.title}</h4>
                              <p className="text-gray-400 text-sm">{action.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingAction(action)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => setUltraActions(ultraActions.filter(a => a.id !== action.id))}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Existing Tasks */}
                {socialTasks.length > 0 && (
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      {t('admin.currentTasks')} ({socialTasks.length})
                    </label>
                    <div className="space-y-3 mb-6">
                      {socialTasks.map((task) => (
                        <div key={task.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                              {task.platform === 'twitter' && <Twitter size={16} className="text-blue-400" />}
                              {task.platform === 'youtube' && <span className="text-red-400">▶</span>}
                              {task.platform === 'login' && <span className="text-green-400">🔑</span>}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{task.title}</h4>
                              <p className="text-gray-400 text-sm">{getTranslatedTaskType(task.type, t)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingTask(task)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => setSocialTasks(socialTasks.filter(t => t.id !== task.id))}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Tasks */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    {t('admin.addNewTasks')}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      onClick={() => setShowUltraActionModal(true)}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors"
                    >
                      <div className="text-2xl mb-2">🎮</div>
                      <p className="text-white font-medium">{t('admin.ultraActivityTask')}</p>
                    </button>
                    <button 
                      onClick={() => setShowSocialTaskModal(true)}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors"
                    >
                      <div className="text-2xl mb-2">📱</div>
                      <p className="text-white font-medium">{t('admin.socialMediaTask')}</p>
                    </button>
                  </div>
                </div>

                {/* Participation Requirements */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    {t('admin.participationRequirements')}
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                  </label>
                  <p className="text-gray-400 text-sm mb-4">
                    {t('admin.participationRequirementsDesc')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-12">
                <div className="flex gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t('admin.saveDraft')}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t('admin.preview')}
                  </button>
                </div>
                <button 
                  onClick={() => setActiveStep('rewards')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('admin.next')}
                </button>
              </div>
            </div>
          )}

          {/* Rewards Step */}
          {activeStep === 'rewards' && (
            <div className="max-w-4xl">

              <div className="space-y-8">
                {/* Current Rewards */}
                {rewards.length > 0 && (
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      {t('admin.currentRewards')} ({rewards.length})
                    </label>
                    <div className="space-y-3 mb-6">
                      {rewards.map((reward) => (
                        <div key={reward.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                              {reward.type === 'gems' ? '💎' : '🎁'}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {reward.type === 'gems' ? `${reward.amount} ${reward.name}` : reward.name}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {reward.type === 'uniq' ? `${reward.rarity} UNIQ` : t('admin.currencyReward')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingReward(reward)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => setRewards(rewards.filter(r => r.id !== reward.id))}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Rewards */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    {t('admin.addNewRewards')}
                    <span className="text-red-500">*</span>
                  </label>
                  
                  {/* Gems Rewards */}
                  <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-xl p-6 mb-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          💎
                        </div>
                        <div>
                          <span className="text-white font-semibold text-lg">{t('admin.gems')}</span>
                          <p className="text-purple-200 text-sm">{t('admin.gemsDescription')}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowGemsModal(true)}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Plus size={18} />
                        {t('admin.addGems')}
                      </button>
                    </div>
                  </div>

                  {/* UNIQ Rewards */}
                  <div className="bg-gradient-to-br from-yellow-900/50 to-orange-800/30 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          🎁
                        </div>
                        <div>
                          <span className="text-white font-semibold text-lg">{t('admin.uniqRewards')}</span>
                          <p className="text-yellow-200 text-sm">{t('admin.uniqDescription')}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowUniqModal(true)}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Plus size={18} />
                        {t('admin.addUniq')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-12">
                <div className="flex gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t('admin.saveDraft')}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    {t('admin.preview')}
                  </button>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  {t('admin.publishQuest')}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      <Footer />
      
      <SocialTaskModal 
        isOpen={showSocialTaskModal}
        onClose={() => setShowSocialTaskModal(false)}
      />
      
      <UniqRewardModal 
        isOpen={showUniqModal}
        onClose={() => setShowUniqModal(false)}
        onAdd={(reward) => setRewards([...rewards, reward])}
      />

      <UltraActionModal 
        isOpen={showUltraActionModal} 
        onClose={() => setShowUltraActionModal(false)} 
        onAddAction={handleAddUltraAction}
      />

      <ImageUploadModal
        isOpen={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onImageSelect={(imageUrl) => setQuestData({...questData, image: imageUrl})}
        title="Quest Image"
        recommendedSize="1792x1024px"
      />

      {/* Gems Modal */}
      {showGemsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowGemsModal(false);
            }
          }}
        >
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                💎
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('admin.addGems')}</h3>
                <p className="text-gray-400 text-sm">{t('admin.gemsDescription')}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">{t('admin.gemsAmount')}</label>
              <div className="relative mb-4">
                <div className="flex items-center bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-purple-500/30 rounded-xl shadow-lg transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-purple-500/25">
                  <button
                    onClick={() => setGemsAmount(Math.max(1, gemsAmount - 10))}
                    className="flex items-center justify-center w-12 h-12 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-l-xl transition-all duration-200 font-bold text-xl"
                  >
                    −
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={gemsAmount}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                        const value = Math.min(10000, Math.max(1, parseInt(numericValue) || 1));
                        setGemsAmount(value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setGemsAmount(Math.min(10000, gemsAmount + 10));
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setGemsAmount(Math.max(1, gemsAmount - 10));
                        }
                      }}
                      className="w-full bg-transparent px-4 py-4 text-white placeholder-gray-400 focus:outline-none text-center text-xl font-bold"
                      placeholder="50"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 font-medium text-sm">
                      💎 Gems
                    </div>
                  </div>
                  <button
                    onClick={() => setGemsAmount(Math.min(10000, gemsAmount + 10))}
                    className="flex items-center justify-center w-12 h-12 text-purple-400 hover:text-white hover:bg-purple-600/20 rounded-r-xl transition-all duration-200 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[50, 100, 200, 500, 1000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setGemsAmount(amount)}
                    className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                      gemsAmount === amount
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25 ring-2 ring-purple-400/50'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:shadow-md'
                    }`}
                  >
                    <span className="relative z-10">{amount}</span>
                    {gemsAmount === amount && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="text-center mt-3 space-y-1">
                <p className="text-gray-400 text-sm">
                  {t('admin.gemsRangeInfo')}
                </p>
                <p className="text-gray-500 text-xs">
                  💡 {t('admin.gemsInputHelp')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowGemsModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {t('action.cancel')}
              </button>
              <button 
                onClick={() => {
                  const newReward = {
                    id: Date.now(),
                    type: 'gems',
                    name: 'Gems',
                    amount: gemsAmount,
                    description: t('admin.currencyReward')
                  };
                  setRewards([...rewards, newReward]);
                  setShowGemsModal(false);
                  setGemsAmount(50);
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
              >
                {t('admin.addGems')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Reward Modal */}
      {editingReward && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingReward(null);
            }
          }}
        >
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                {editingReward.type === 'gems' ? '💎' : '🎁'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('admin.editReward')}</h3>
                <p className="text-gray-400 text-sm">
                  {editingReward.type === 'gems' ? t('admin.gemsDescription') : t('admin.uniqDescription')}
                </p>
              </div>
            </div>
            
            {editingReward.type === 'gems' ? (
              <div className="mb-6">
                <label className="block text-white font-medium mb-3">{t('admin.gemsAmount')}</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={editingReward.amount || 50}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                      const value = Math.min(10000, Math.max(1, parseInt(numericValue) || 50));
                      setEditingReward({...editingReward, amount: value});
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-center text-lg font-semibold"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 font-medium">
                    💎
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white font-medium mb-2">{t('admin.titleField')}</label>
                  <input
                    type="text"
                    value={editingReward.name || ''}
                    onChange={(e) => setEditingReward({...editingReward, name: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">{t('admin.rarity')}</label>
                  <select 
                    value={editingReward.rarity || 'common'}
                    onChange={(e) => setEditingReward({...editingReward, rarity: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="common">{t('admin.common')}</option>
                    <option value="rare">{t('admin.rare')}</option>
                    <option value="epic">{t('admin.epic')}</option>
                    <option value="legendary">{t('admin.legendary')}</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => setEditingReward(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {t('action.cancel')}
              </button>
              <button 
                onClick={() => {
                  setRewards(rewards.map(r => r.id === editingReward.id ? editingReward : r));
                  setEditingReward(null);
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
              >
                {t('action.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <SocialTaskModal 
          isOpen={true}
          onClose={() => setEditingTask(null)}
          editingTask={editingTask}
          onUpdate={(updatedTask) => {
            setSocialTasks(socialTasks.map(t => t.id === editingTask.id ? updatedTask : t));
            setEditingTask(null);
          }}
        />
      )}

      {/* Edit Action Modal */}
      {editingAction && (
        <UltraActionModal 
          isOpen={true}
          onClose={() => setEditingAction(null)}
          editingAction={editingAction}
          onAddAction={(updatedAction) => {
            setUltraActions(ultraActions.map(a => a.id === editingAction.id ? updatedAction : a));
            setEditingAction(null);
          }}
        />
      )}
    </div>
  );
}

export default QuestEditor; 