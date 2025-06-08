import React from 'react';
import { Gift, ArrowLeft, Twitter, MessageSquare, Users, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { socialQuests } from '../data/questsData';
import RewardCard from '../components/RewardCard';
import { useTranslationWithFlags } from '../hooks/useTranslation';
import { getRewardDescriptionKey } from '../utils/rewardUtils';
import ClaimRewardsButton from '../components/ClaimRewardsButton';





function SocialTask({ icon, title, description, completed }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  completed?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
      completed 
        ? 'bg-green-600/20 border-green-500/30' 
        : 'bg-[#2A2D2E] border-gray-700/50 hover:border-purple-500/30'
    }`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
        completed ? 'bg-green-600' : 'bg-purple-600'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-600' : 'bg-gray-600'
      }`}>
        {completed ? (
          <Check size={16} className="text-white" />
        ) : (
          <span className="text-white text-sm">✗</span>
        )}
      </div>
    </div>
  );
}

function SocialQuest() {
  const { t } = useTranslationWithFlags();
  const socialQuest = socialQuests[0]; // Social Adventurer quest

  return (
    <div className="min-h-screen bg-[#1A1B1C] text-white">
      {/* Navigation */}
      <Header activeSection="Quests" />

      {/* Header with Back Button */}
      <header className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1C] via-[#1A1B1C]/60 to-transparent">
          <div className="container mx-auto px-6 h-full flex flex-col justify-between py-8">
            <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-fit">
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
            
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-2">Ultra</div>
                <h1 className="text-4xl font-bold mb-4">{socialQuest.title}</h1>
                <p className="text-gray-300 mb-6 max-w-2xl">{socialQuest.subtitle}</p>
                
                <div className="space-y-4 max-w-3xl">
                  <p className="text-gray-300 leading-relaxed">
                    Greetings, bold explorer! The digital realm is vast, and your quest is clear: to venture into the world of social media and 
                    spread the word of Ultra!
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed">
                    Earn your stripes by completing these mighty challenges and show the world your allegiance to the cause. The 
                    rewards? Fame, fortune, or at least bragging rights, and maybe even some cool Uniqs!
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed">
                    Good luck, adventurer. The internet awaits your mark!
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 min-w-[300px]">
                <ClaimRewardsButton 
                  quest={socialQuest}
                  onSuccess={() => {
                    // Rewards claimed for social quest
                  }}
                  onError={(error) => {
                    // Failed to claim rewards for social quest
                  }}
                />
                
                <div className="space-y-3">
                  <SocialTask
                    icon={<Twitter size={20} className="text-white" />}
                    title={t('admin.task.followUltraX')}
                    description={t('admin.task.followUltraXDesc')}
                    completed={true}
                  />
                  
                  <SocialTask
                    icon={<MessageSquare size={20} className="text-white" />}
                    title={t('admin.task.postHype')}
                    description={t('admin.task.postHypeDesc')}
                  />
                  
                  <SocialTask
                    icon={<Users size={20} className="text-white" />}
                    title={t('admin.task.tagFriends')}
                    description={t('admin.task.tagFriendsDesc')}
                  />
                  
                  <SocialTask
                    icon={<MessageSquare size={20} className="text-white" />}
                    title={t('admin.task.commentPost')}
                    description={t('admin.task.commentPostDesc')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rewards Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold">{t('rewards.title')}</h2>
          <div className="flex items-center gap-2">
            <Gift size={20} className="text-purple-400" />
            <span className="text-white font-medium">{socialQuest.gems} Gems</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">⚡</span>
            <span className="text-white font-medium">{socialQuest.lvlup} LvlUp</span>
          </div>
        </div>
        
        <div className="space-y-4 max-w-2xl">
          {socialQuest.rewards && socialQuest.rewards.length > 0 ? (
            socialQuest.rewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))
          ) : (
            <div className="text-gray-400 text-center py-8">
              {t('rewards.noAdditionalRewards')}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SocialQuest;