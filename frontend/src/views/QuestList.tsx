import React, { useState, useRef, useEffect } from 'react';
import { Timer, TowerControl as GameController, Gift, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import CategorySlider from '../components/CategorySlider';
import { challenges, ashesQuests, ultraQuests, championQuests, featuredQuest, gameImages } from '../data/questsData';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';
import { createQuestSlug } from '../utils/slugUtils';
import { translateDuration } from '../utils/timeUtils';
import ClaimRewardsButton from '../components/ClaimRewardsButton';

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
  const { t } = useTranslation();
  const { getLocalizedUrl } = useLocalizedNavigation();
  
  const getIconColor = () => {
    if (title === 'Ashes of Mankind') return 'text-orange-400';
    if (title === 'Ultra') return 'text-purple-400';
    if (title === 'Champion Tactics') return 'text-green-400';
    return 'text-blue-400';
  };

  const getCategoryLogo = () => {
    if (title === 'Ashes of Mankind') return '/ashesofmankind.png';
    if (title === 'Ultra') return '/favicon.ico';
    if (title === 'Champion Tactics') return '/champion-tactis.png';
    return '/favicon.ico';
  };

  const getCategoryGradient = () => {
    if (title === 'Ashes of Mankind') return 'from-orange-600 to-red-600';
    if (title === 'Ultra') return 'from-purple-600 to-blue-600';
    if (title === 'Champion Tactics') return 'from-green-600 to-emerald-600';
    return 'from-blue-600 to-cyan-600';
  };

  // Sort quests to show completed ones first
  const sortedQuests = [...quests].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return 0;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const questsToShow = 3;
  const maxIndex = Math.max(0, sortedQuests.length - questsToShow);

  const nextQuests = () => {
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevQuests = () => {
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const visibleQuests = sortedQuests.slice(currentIndex, currentIndex + questsToShow);

  return (
    <section 
      ref={rowAnimation.elementRef as React.RefObject<HTMLElement>}
      className={`container mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-animate-right ${rowAnimation.isVisible ? 'visible' : ''}`}
    >
      {/* Section Header with Logo and Design Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Category Logo */}
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center p-2 ${
              title === 'Ultra' 
                ? 'bg-white/90 backdrop-blur-sm border border-purple-500/30' 
                : title === 'Ashes of Mankind'
                ? 'bg-gradient-to-br from-orange-500 to-red-600'
                : 'bg-gradient-to-br from-green-500 to-emerald-600'
            }`}>
              <img 
                src={getCategoryLogo()} 
                alt={title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = title[0];
                }}
              />
              <span className={`font-bold text-xl hidden ${
                title === 'Ultra' ? 'text-purple-600' : 'text-white'
              }`}>{title[0]}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-bold text-white">{title}</h2>
          </div>

          {/* Navigation Arrows */}
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
        
        {/* Modern Design Bar */}
        <div className="relative h-1 bg-gray-800/30 rounded-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient()} modern-bar-fade`}></div>
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${getCategoryGradient()} animate-pulse opacity-20`}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visibleQuests.map((quest, index) => (
          <Link 
            key={`${quest.id}-${currentIndex}`} 
            to={getLocalizedUrl(`/quest/${quest.id}`)}
            className={`quest-card group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500/50 transition-all duration-500 hover:scale-105 flex flex-col h-[380px] ${isAnimating ? 'quest-card-enter' : ''}`}
          >
            <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
              <img 
                src={quest.image} 
                alt={quest.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium shadow-lg border border-gray-500/20">
                  {t('quest.endsIn')} {translateDuration(quest.endsIn, t)}
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
            
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2">
                {quest.title}
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2 flex-grow">{quest.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
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
                  <ClaimRewardsButton 
                    quest={quest}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                      title === 'Ashes of Mankind' 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : title === 'Champion Tactics'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    onSuccess={() => {
                      // Rewards claimed for quest
                    }}
                    onError={(error) => {
                      console.error(`Failed to claim rewards for quest ${quest.title}:`, error)
                    }}
                  />
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
  const { t } = useTranslation();
  const { getLocalizedUrl } = useLocalizedNavigation();
  
  // Challenges traduits
  const translatedChallenges = [
    {
      id: 'daily-1',
      title: t('challenge.daily.title'),
      gems: 10,
      lvlup: 1,
      endsIn: '3H',
      progress: 1,
      maxProgress: 2,
      type: 'daily' as const
    },
    {
      id: 'weekly-1',
      title: t('challenge.weekly.title'),
      gems: 10,
      lvlup: 1,
      endsIn: '2D 17H',
      progress: 6,
      maxProgress: 10,
      type: 'weekly' as const
    }
  ];
  
  // Quêtes Ashes traduites (les 5 premières)
  const translatedAshesQuests = ashesQuests.map((quest, index) => {
    if (index < 5) {
      return {
        ...quest,
        title: t(`quest.ashes.${index + 1}.title` as any),
        subtitle: t(`quest.ashes.${index + 1}.subtitle` as any),
        description: t(`quest.ashes.${index + 1}.description` as any)
      };
    }
    return quest;
  });

  // Quêtes Ultra traduites (les 6 premières)
  const translatedUltraQuests = ultraQuests.map((quest, index) => {
    if (index < 5) {
      return {
        ...quest,
        title: t(`quest.ultra.${index + 1}.title` as any),
        subtitle: t(`quest.ultra.${index + 1}.subtitle` as any),
        description: t(`quest.ultra.${index + 1}.description` as any)
      };
    } else if (quest.id === 'ultra-6') {
      return {
        ...quest,
        title: t('quest.ultra.6.title' as any),
        subtitle: t('quest.ultra.6.subtitle' as any),
        description: t('quest.ultra.6.description' as any)
      };
    }
    return quest;
  });

  // Quêtes Champion traduites (les 3 premières)
  const translatedChampionQuests = championQuests.map((quest, index) => {
    if (index < 3) {
      return {
        ...quest,
        title: t(`quest.champion.${index + 1}.title` as any),
        subtitle: t(`quest.champion.${index + 1}.subtitle` as any),
        description: t(`quest.champion.${index + 1}.description` as any)
      };
    }
    return quest;
  });
  
  // Animations au scroll
  const heroAnimation = useScrollAnimation();
  const challengesAnimation = useScrollAnimation();
  const categoriesAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <Header activeSection="nav.home" />

      {/* Category Slider */}
      <section 
        ref={heroAnimation.elementRef as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 sm:px-6 py-8 scroll-animate ${heroAnimation.isVisible ? 'visible' : ''}`}
      >
        <CategorySlider />
      </section>

      {/* Daily & Weekly Challenges */}
      <section 
        ref={challengesAnimation.elementRef as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 sm:px-6 py-8 sm:py-16 scroll-animate-left ${challengesAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {translatedChallenges.map((challenge, index) => (
            <div key={challenge.id} className={`challenge-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 ${
              challenge.type === 'daily' 
                ? 'modern-daily-gradient'
                : 'modern-weekly-gradient'
            }`}>
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 opacity-30 ${
                challenge.type === 'daily' 
                  ? 'animated-daily-overlay'
                  : 'animated-weekly-overlay'
              }`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`text-xs font-medium uppercase tracking-wider mb-4 ${
                  challenge.type === 'daily' ? 'text-purple-200' : 'text-blue-200'
                }`}>
                  {challenge.type === 'daily' ? t('quest.type.daily') : t('quest.type.weekly')}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white leading-tight">
                  {challenge.title}
                </h3>
                
                <div className="flex items-end justify-between">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30">
                      <Gift size={16} className="text-white" />
                      <span className="text-white font-medium text-sm">{challenge.gems} {t('quest.gems')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30">
                      <Timer size={16} className="text-white" />
                      <span className="text-white font-medium text-sm">{challenge.lvlup} {t('quest.uniq')}</span>
                    </div>
                    <div className="text-xs bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30 text-white">
                      {t('quest.endsIn')} {translateDuration(challenge.endsIn, t)}
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Container with fixed aspect ratio */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm shadow-lg border border-white/20 relative">
                      {/* Progress ring - positioned absolutely with fixed size */}
                      <svg 
                        className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20" 
                        viewBox="0 0 36 36"
                        style={{ 
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.2)"
                          strokeWidth="2"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray={`${(challenge.progress / challenge.maxProgress) * 100}, 100`}
                          strokeLinecap="round"
                          style={{ 
                            transform: 'rotate(-90deg)', 
                            transformOrigin: '18px 18px'
                          }}
                        />
                      </svg>
                      {/* Number centered absolutely */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-white z-10">{challenge.progress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ultra Quests Row - Premier */}
      <QuestRow 
        title="Ultra" 
        quests={translatedUltraQuests} 
        categoryLink={getLocalizedUrl("/category/ultra")}
      />

      {/* Ashes of Mankind Quests Row */}
      <QuestRow 
        title="Ashes of Mankind" 
        quests={translatedAshesQuests} 
        categoryLink={getLocalizedUrl("/category/ashes")}
      />

      {/* Champion Tactics Quests Row */}
      <QuestRow 
        title="Champion Tactics" 
        quests={translatedChampionQuests} 
        categoryLink={getLocalizedUrl("/category/champion")}
      />

      {/* Quest Categories */}
      <section 
        ref={categoriesAnimation.elementRef as React.RefObject<HTMLElement>}
        className={`container mx-auto px-4 sm:px-6 py-8 sm:py-16 scroll-animate ${categoriesAnimation.isVisible ? 'visible' : ''}`}
      >
        {/* Section Title with Centered Design Bar */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            {t('home.allCategories')}
          </h2>
          
          {/* Centered Design Bar */}
          <div className="relative h-1 bg-gray-800/30 rounded-full overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 centered-bar-fade"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse opacity-20"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <QuestCategory
            icon={
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-3 shadow-lg border border-purple-500/30">
                <img 
                  src="/favicon.ico" 
                  alt="Ultra" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.textContent = 'U';
                  }}
                />
                <span className="text-purple-600 font-bold text-2xl hidden">U</span>
              </div>
            }
            title="Ultra"
            subtitle={t('category.browse', { count: translatedUltraQuests.length, category: 'Ultra' })}
            active={activeCategory === 'ultra'}
            onClick={() => setActiveCategory('ultra')}
            link={getLocalizedUrl("/category/ultra")}
          />
          <QuestCategory
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center p-3 shadow-lg">
                <img 
                  src="/ashesofmankind.png" 
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
            subtitle={t('category.browse', { count: translatedAshesQuests.length, category: 'Ashes of Mankind' })}
            active={activeCategory === 'ashes'}
            onClick={() => setActiveCategory('ashes')}
            link={getLocalizedUrl("/category/ashes")}
          />
          <QuestCategory
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center p-3 shadow-lg">
                <img 
                  src="/champion-tactis.png" 
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
            subtitle={t('category.browse', { count: translatedChampionQuests.length, category: 'Champion Tactics' })}
            active={activeCategory === 'champion'}
            onClick={() => setActiveCategory('champion')}
            link={getLocalizedUrl("/category/champion")}
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default QuestList;