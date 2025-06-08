import React, { useState } from 'react';
import { ArrowLeft, Check, X, Twitter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';

interface QuestData {
  name: string;
  tagline: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  noEndDate: boolean;
  recurrence: string;
}

interface SocialTask {
  id: string;
  platform: string;
  type: string;
  title: string;
  url?: string;
}

interface Reward {
  id: string;
  name: string;
  type: string;
  rarity: string;
  description: string;
}

function QuestCreator() {
  const { getLocalizedUrl } = useLocalizedNavigation();
  const [activeStep, setActiveStep] = useState<'information' | 'tasks' | 'rewards'>('information');
  const [questData, setQuestData] = useState<QuestData>({
    name: '',
    tagline: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    noEndDate: false,
    recurrence: 'Once'
  });
  const [socialTasks, setSocialTasks] = useState<SocialTask[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  
  // États pour les formulaires
  const [newTaskForm, setNewTaskForm] = useState({
    platform: 'twitter',
    type: 'follow',
    title: ''
  });
  
  const [newRewardForm, setNewRewardForm] = useState({
    name: '',
    type: 'currency',
    rarity: 'common',
    description: ''
  });

  const steps = [
    { id: 'information', label: 'Quest information' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'rewards', label: 'Rewards' }
  ];

  const getStepStatus = (stepId: string) => {
    if (stepId === 'information') {
      return { 
        completed: questData.name.trim() !== '' && questData.tagline.trim() !== '' && questData.description.trim() !== '' && questData.image.trim() !== '' && questData.startDate.trim() !== ''
      };
    }
    if (stepId === 'tasks') {
      return { completed: socialTasks.length > 0 };
    }
    if (stepId === 'rewards') {
      return { completed: rewards.length > 0 };
    }
    return { completed: false };
  };

  const getStepIcon = (step: any) => {
    const status = getStepStatus(step.id);
    if (status.completed) {
      return <Check size={12} className="text-white" />;
    }
    return null;
  };

  const getStepBg = (stepId: string) => {
    const status = getStepStatus(stepId);
    if (status.completed) {
      return 'bg-green-600';
    }
    if (stepId === activeStep) {
      return 'bg-purple-600';
    }
    return 'bg-gray-600';
  };

  const addSocialTask = () => {
    if (newTaskForm.title.trim() === '') return;
    
    const newTask: SocialTask = {
      id: Date.now().toString(),
      platform: newTaskForm.platform,
      type: newTaskForm.type,
      title: newTaskForm.title
    };
    setSocialTasks([...socialTasks, newTask]);
    setNewTaskForm({ platform: 'twitter', type: 'follow', title: '' });
  };

  const addReward = () => {
    if (newRewardForm.name.trim() === '' || newRewardForm.description.trim() === '') return;
    
    const newReward: Reward = {
      id: Date.now().toString(),
      name: newRewardForm.name,
      type: newRewardForm.type,
      rarity: newRewardForm.rarity,
      description: newRewardForm.description
    };
    setRewards([...rewards, newReward]);
    setNewRewardForm({ name: '', type: 'currency', rarity: 'common', description: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header activeSection="nav.admin" />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-gray-800 min-h-auto lg:min-h-screen p-4 lg:p-6">
          <div className="flex lg:flex-col lg:space-y-4 space-x-4 lg:space-x-0 overflow-x-auto lg:overflow-x-visible">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id as 'information' | 'tasks' | 'rewards')}
                className={`flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap ${
                  step.id === activeStep ? 'bg-gray-700' : 'hover:bg-gray-700/50'
                }`}
              >
                <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs lg:text-sm font-medium ${getStepBg(step.id)}`}>
                  {getStepIcon(step) || (step.id === activeStep ? '●' : '○')}
                </div>
                <span className="font-medium text-sm lg:text-base">{step.label}</span>
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
              alt="Quest Creator Background"
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
                  <span className="font-medium text-sm sm:text-base">Leave Quest Creator</span>
                </Link>
              </div>
              
              <div className="text-white text-center sm:text-right">
                <h1 className="text-lg sm:text-2xl font-bold mb-1">
                  {activeStep === 'information' && 'Quest information'}
                  {activeStep === 'tasks' && 'Tasks'}
                  {activeStep === 'rewards' && 'Rewards'}
                </h1>
                <p className="text-white/80 text-xs sm:text-base">Create a new quest</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-8">

          {/* Quest Information Step */}
          {activeStep === 'information' && (
            <div className="max-w-4xl animate-fade-in-up">
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
                  </div>
                </div>

                {/* Quest Image */}
                <div>
                  <label className="flex items-center gap-2 text-white font-medium mb-3">
                    Quest Image
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 sm:p-12 text-center hover:border-gray-500 transition-colors cursor-pointer">
                    <div className="text-gray-400 mb-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                        📁
                      </div>
                      <p className="font-medium">Upload an image</p>
                      <p className="text-sm">Recommended size: 1792x1024px</p>
                    </div>
                  </div>
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
                  disabled={!getStepStatus('information').completed}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Tasks Step */}
          {activeStep === 'tasks' && (
            <div className="max-w-4xl animate-fade-in-up">
              <div className="space-y-8">
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
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{task.title}</h4>
                              <p className="text-gray-400 text-sm">{task.type}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSocialTasks(socialTasks.filter(t => t.id !== task.id))}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <X size={16} />
                          </button>
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
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-white text-sm mb-2 block">Platform</label>
                        <select 
                          value={newTaskForm.platform}
                          onChange={(e) => setNewTaskForm({...newTaskForm, platform: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="twitter">Twitter</option>
                          <option value="discord">Discord</option>
                          <option value="telegram">Telegram</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">Type</label>
                        <select 
                          value={newTaskForm.type}
                          onChange={(e) => setNewTaskForm({...newTaskForm, type: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="follow">Follow</option>
                          <option value="like">Like</option>
                          <option value="retweet">Retweet</option>
                          <option value="join">Join</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">Title</label>
                        <input 
                          type="text" 
                          placeholder="Task title"
                          value={newTaskForm.title}
                          onChange={(e) => setNewTaskForm({...newTaskForm, title: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={addSocialTask}
                      disabled={newTaskForm.title.trim() === ''}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Task
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 gap-4">
                <button 
                  onClick={() => setActiveStep('information')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setActiveStep('rewards')}
                  disabled={!getStepStatus('tasks').completed}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Rewards Step */}
          {activeStep === 'rewards' && (
            <div className="max-w-4xl animate-fade-in-up">
              <div className="space-y-8">
                {/* Existing Rewards */}
                {rewards.length > 0 && (
                  <div>
                    <label className="flex items-center gap-2 text-white font-medium mb-3">
                      Current Rewards ({rewards.length})
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {rewards.map((reward) => (
                        <div key={reward.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{reward.name}</h4>
                            <button 
                              onClick={() => setRewards(rewards.filter(r => r.id !== reward.id))}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-gray-400 text-sm capitalize">{reward.rarity} {reward.type}</p>
                          <p className="text-gray-300 text-sm mt-2">{reward.description}</p>
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
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="text-white text-sm mb-2 block">Name</label>
                        <input 
                          type="text" 
                          placeholder="Reward name"
                          value={newRewardForm.name}
                          onChange={(e) => setNewRewardForm({...newRewardForm, name: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">Type</label>
                        <select 
                          value={newRewardForm.type}
                          onChange={(e) => setNewRewardForm({...newRewardForm, type: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="currency">Currency</option>
                          <option value="nft">NFT</option>
                          <option value="skin">Skin</option>
                          <option value="item">Item</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">Rarity</label>
                        <select 
                          value={newRewardForm.rarity}
                          onChange={(e) => setNewRewardForm({...newRewardForm, rarity: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                          <option value="common">Common</option>
                          <option value="rare">Rare</option>
                          <option value="epic">Epic</option>
                          <option value="legendary">Legendary</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm mb-2 block">Description</label>
                        <input 
                          type="text" 
                          placeholder="Reward description"
                          value={newRewardForm.description}
                          onChange={(e) => setNewRewardForm({...newRewardForm, description: e.target.value})}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={addReward}
                      disabled={newRewardForm.name.trim() === '' || newRewardForm.description.trim() === ''}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Reward
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-12 gap-4">
                <button 
                  onClick={() => setActiveStep('tasks')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Previous
                </button>
                <button 
                  disabled={!getStepStatus('rewards').completed}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Create Quest
                </button>
              </div>
            </div>
          )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default QuestCreator; 