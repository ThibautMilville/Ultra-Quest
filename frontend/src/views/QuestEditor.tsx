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
          title: 'Follow @ultra.io on X',
          description: 'Discover the latest news, sneak peeks, and spicy memes from the heart of XX Gaming.'
        },
        {
          id: 2,
          platform: 'youtube',
          type: 'Follow an account',
          title: 'Follow @ultra.io on Youtube',
          description: 'Discover the latest news, sneak peeks, and spicy memes from the heart of XX Gaming.'
        },
        {
          id: 3,
          platform: 'login',
          type: '5 day login streak',
          title: '5 day login streak',
          description: 'Discover the latest news, sneak peeks, and spicy memes from the heart of XX Gaming.'
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
                  {activeStep === 'information' && 'Quest information'}
                  {activeStep === 'tasks' && 'Tasks'}
                  {activeStep === 'rewards' && 'Rewards'}
                </h1>
                <p className="text-white/80 text-xs sm:text-base">
                  {isEditing ? 'Edit your existing quest' : 'Create a new quest'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-8">

          {/* Quest Information Step */}
          {activeStep === 'information' && (
            <div className="max-w-4xl">

              <div className="space-y-6 sm:space-y-8">
                {/* Quest Name */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Quest name
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter a bold title that captures the essence of your quest!"
                      value={questData.name}
                      onChange={(e) => setQuestData({...questData, name: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">64</span>
                  </div>
                </div>

                {/* Quest Tagline */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Quest tagline
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Write a catchy description to inspire adventurers to join your quest!"
                      value={questData.tagline}
                      onChange={(e) => setQuestData({...questData, tagline: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">128</span>
                  </div>
                </div>

                {/* Quest Description */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Quest full description
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Describe your quest in detail here: what's the challenge, the story, and the reward."
                      value={questData.description}
                      onChange={(e) => setQuestData({...questData, description: e.target.value})}
                      rows={6}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                    />
                    {/* Toolbar */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-gray-400">
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
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Quest Image
                    <Check size={16} className="text-green-500" />
                  </label>
                  {questData.image ? (
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={questData.image} 
                        alt="Quest preview"
                        className="w-full h-48 object-cover"
                      />
                      <div 
                        onClick={() => setShowImageUpload(true)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <div className="text-white text-center">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            📁
                          </div>
                          <p className="font-medium">Change image</p>
                          <p className="text-sm">Recommended size: 1792x1024px</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setQuestData({...questData, image: ''})}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setShowImageUpload(true)}
                      className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-gray-500 transition-colors cursor-pointer"
                    >
                      <div className="text-gray-400 mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                          📁
                        </div>
                        <p className="font-medium">Upload an image</p>
                        <p className="text-sm">Recommended size: 1792x1024px</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quest Date */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Quest Date
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1 w-full">
                      <input
                        type="date"
                        value={questData.startDate}
                        onChange={(e) => setQuestData({...questData, startDate: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <input
                        type="date"
                        value={questData.endDate}
                        onChange={(e) => setQuestData({...questData, endDate: e.target.value})}
                        disabled={questData.noEndDate}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none disabled:opacity-50"
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
                        No End date
                      </label>
                      <span className="text-red-500">*</span>
                    </div>
                  </div>
                </div>

                {/* Recurrence */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Recurrence
                    <Check size={16} className="text-green-500" />
                  </label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {['Once', 'Daily', 'Weekly', 'Monthly'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setQuestData({...questData, recurrence: option})}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                          questData.recurrence === option
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 gap-4">
                <div className="flex gap-2 sm:gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    Save draft
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    Preview
                  </button>
                </div>
                <button 
                  onClick={() => setActiveStep('tasks')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Next
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
                      Ultra Actions ({ultraActions.length})
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
                            <button className="text-gray-400 hover:text-white transition-colors">
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
                      Current Tasks ({socialTasks.length})
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
                              <p className="text-gray-400 text-sm">{task.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-gray-400 hover:text-white transition-colors">
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
                    Add New Tasks
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      onClick={() => setShowUltraActionModal(true)}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors"
                    >
                      <div className="text-2xl mb-2">🎮</div>
                      <p className="text-white font-medium">Ultra Activity task</p>
                    </button>
                    <button 
                      onClick={() => setShowSocialTaskModal(true)}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors"
                    >
                      <div className="text-2xl mb-2">📱</div>
                      <p className="text-white font-medium">Social Media Task</p>
                    </button>
                  </div>
                </div>

                {/* Participation Requirements */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Participation Requirements
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                  </label>
                  <p className="text-gray-400 text-sm mb-4">
                    Only users who meet the requirements you set up can participate in this question.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-12">
                <div className="flex gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save draft
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Preview
                  </button>
                </div>
                <button 
                  onClick={() => setActiveStep('rewards')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Next
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
                      Current Rewards ({rewards.length})
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
                                {reward.type === 'uniq' ? `${reward.rarity} UNIQ` : 'Currency reward'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-gray-400 hover:text-white transition-colors">
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
                    Add New Rewards
                    <span className="text-red-500">*</span>
                  </label>
                  
                  {/* Gems Rewards */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        💎
                      </div>
                      <span className="text-white font-medium">Gems</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Gems are the Ultra Quest currency for rewards
                    </p>
                    <div className="flex gap-3">
                      <select className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                        <option>💎 50</option>
                        <option>💎 100</option>
                        <option>💎 200</option>
                        <option>💎 500</option>
                      </select>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Add Gems
                      </button>
                    </div>
                  </div>

                  {/* UNIQ Rewards */}
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                          🎁
                        </div>
                        <span className="text-white font-medium">UNIQ Rewards</span>
                      </div>
                      <button 
                        onClick={() => setShowUniqModal(true)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add UNIQ
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Add exclusive UNIQ NFT rewards for quest completion
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-12">
                <div className="flex gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save draft
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Preview
                  </button>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Publish Quest
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
    </div>
  );
}

export default QuestEditor; 