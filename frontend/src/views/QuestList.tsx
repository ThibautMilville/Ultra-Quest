import React, { useState } from 'react';
import { Timer, TowerControl as GameController, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import CategorySlider from '../components/CategorySlider';
import { challenges, ashesQuests, ultraQuests, championQuests, featuredQuest, gameImages } from '../data/questsData';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

function QuestCategory({ icon, title, subtitle, active, onClick, link }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
  link?: string;
}) {
  const content = (
    <div className={`category-card flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
      active ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30' : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-purple-500/30'
    }`} onClick={onClick}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold text-base sm:text-lg">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}

function QuestRow({ title, quests, categoryLink }: {
  title: string;
  quests: any[];
  categoryLink: string;
}) {
  const rowAnimation = useScrollAnimation();
  
  const getIconColor = () => {
    if (title === 'Ashes of Mankind') return 'text-orange-400';
    if (title === 'Ultra') return 'text-purple-400';
    if (title === 'Champion Tactics') return 'text-green-400';
    return 'text-blue-400';
  };

  // Sort quests to show completed ones first
  const sortedQuests = [...quests].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return 0;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const questsToShow = 3;
  const maxIndex = Math.max(0, sortedQuests.length - questsToShow);

  const nextQuests = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevQuests = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleQuests = sortedQuests.slice(currentIndex, currentIndex + questsToShow);

  return (
    <section 
      ref={rowAnimation.elementRef as React.RefObject<HTMLElement>}
      className={`container mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-animate-right ${rowAnimation.isVisible ? 'visible' : ''}`}
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={prevQuests}
            disabled={currentIndex === 0}
            className={`slider-nav p-2 sm:p-3 rounded-full transition-all duration-300 border ${
              currentIndex === 0 
                ? 'bg-gray-800/30 border-gray-700/30 text-gray-600 cursor-not-allowed' 
                : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white hover:scale-110'
            }`}
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={nextQuests}
            disabled={currentIndex >= maxIndex}
            className={`slider-nav p-2 sm:p-3 rounded-full transition-all duration-300 border ${
              currentIndex >= maxIndex 
                ? 'bg-gray-800/30 border-gray-700/30 text-gray-600 cursor-not-allowed' 
                : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 text-white hover:scale-110'
            }`}
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visibleQuests.map((quest, index) => (
          <Link 
            key={quest.id} 
            to={`/quest/${quest.id}`}
            className="quest-card group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 hover:scale-105"
          >
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img 
                src={quest.image} 
                alt={quest.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium shadow-lg border border-gray-500/20">
                  Ends in {quest.endsIn}
                </div>
              </div>

              {/* Completed badge if applicable */}
              {quest.completed && (
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-green-600/90 backdrop-blur flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                {quest.title}
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">{quest.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 sm:gap-2 bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full border border-gray-500/30">
                    <Gift size={14} className={`${getIconColor()} sm:w-4 sm:h-4`} />
                    <span className="text-white text-xs sm:text-sm font-medium">{quest.gems}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full border border-gray-500/30">
                    <Timer size={14} className={`${getIconColor()} sm:w-4 sm:h-4`} />
                    <span className="text-white text-xs sm:text-sm font-medium">{quest.lvlup}</span>
                  </div>
                </div>
                {quest.completed && (
                  <button className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    title === 'Ashes of Mankind' 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : title === 'Champion Tactics'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white`}>
                    Claim rewards
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QuestList() {
  const [activeCategory, setActiveCategory] = useState('ultra');
  
  // Animations au scroll
  const heroAnimation = useScrollAnimation();
  const challengesAnimation = useScrollAnimation();
  const ultraRowAnimation = useScrollAnimation();
  const ashesRowAnimation = useScrollAnimation();
  const championRowAnimation = useScrollAnimation();
  const categoriesAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <Header activeSection="Quests" />

      {/* Category Slider */}
      <section 
        ref={heroAnimation.elementRef as React.RefObject<HTMLElement>}
        className={`container mx-auto px-6 py-8 scroll-animate ${heroAnimation.isVisible ? 'visible' : ''}`}
      >
        <CategorySlider />
      </section>

      {/* Daily & Weekly Challenges */}
      <section 
        ref={challengesAnimation.elementRef as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 sm:px-6 py-8 sm:py-16 scroll-animate-left ${challengesAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {challenges.map((challenge, index) => (
            <div key={challenge.id} className={`challenge-card rounded-xl sm:rounded-2xl p-4 sm:p-8 relative overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 ${
              challenge.type === 'daily' 
                ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600'
                : 'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600'
            }`}>
              <div className={`absolute top-4 left-6 text-xs font-medium uppercase tracking-wider ${
                challenge.type === 'daily' ? 'text-purple-200' : 'text-blue-200'
              }`}>
                {challenge.type === 'daily' ? 'Daily challenge' : 'Weekly challenge'}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mt-4 sm:mt-8">{challenge.title}</h3>
              <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 sm:gap-8">
                    <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                    <Gift size={18} className="text-white" />
                    <span className="text-white font-medium">{challenge.gems} Gems</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                    <Timer size={18} className="text-white" />
                    <span className="text-white font-medium text-sm sm:text-base">{challenge.lvlup} LvlUp</span>
                  </div>
                  <div className={`text-xs sm:text-sm bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full ${
                    challenge.type === 'daily' ? 'text-purple-100' : 'text-blue-100'
                  }`}>
                    Ends in {challenge.endsIn}
                  </div>
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg progress-circle">
                  <span className="text-2xl sm:text-4xl font-bold text-white">{challenge.progress}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ultra Quests Row - Premier */}
      <QuestRow 
        title="Ultra" 
        quests={ultraQuests} 
        categoryLink="/category/ultra"
      />

      {/* Ashes of Mankind Quests Row */}
      <QuestRow 
        title="Ashes of Mankind" 
        quests={ashesQuests} 
        categoryLink="/category/ashes"
      />

      {/* Champion Tactics Quests Row */}
      <QuestRow 
        title="Champion Tactics" 
        quests={championQuests} 
        categoryLink="/category/champion"
      />

      {/* Quest Categories */}
      <section 
        ref={categoriesAnimation.elementRef as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 sm:px-6 py-8 sm:py-16 scroll-animate ${categoriesAnimation.isVisible ? 'visible' : ''}`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Quest category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <QuestCategory
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center p-3 shadow-lg">
                <img 
                  src="/ultra-quest/favicon.ico" 
                  alt="Ultra" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.textContent = 'U';
                  }}
                />
                <span className="text-white font-bold text-2xl hidden">U</span>
              </div>
            }
            title="Ultra"
            subtitle={`Browse all ${ultraQuests.length} Ultra Quests`}
            active={activeCategory === 'ultra'}
            onClick={() => setActiveCategory('ultra')}
            link="/category/ultra"
          />
          <QuestCategory
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center p-3 shadow-lg">
                <img 
                  src="/ultra-quest/ashesofmankind.png" 
                  alt="Ashes of Mankind" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.textContent = 'A';
                  }}
                />
                <span className="text-white font-bold text-2xl hidden">A</span>
              </div>
            }
            title="Ashes of Mankind"
            subtitle={`Browse all ${ashesQuests.length} Ashes of Mankind Quests`}
            active={activeCategory === 'ashes'}
            onClick={() => setActiveCategory('ashes')}
            link="/category/ashes"
          />
          <QuestCategory
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center p-3 shadow-lg">
                <img 
                  src="/ultra-quest/champion-tactis.png" 
                  alt="Champion Tactics" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.textContent = 'C';
                  }}
                />
                <span className="text-white font-bold text-2xl hidden">C</span>
              </div>
            }
            title="Champion Tactics"
            subtitle={`Browse all ${championQuests.length} Champion Tactics Quests`}
            active={activeCategory === 'champion'}
            onClick={() => setActiveCategory('champion')}
            link="/category/champion"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default QuestList;