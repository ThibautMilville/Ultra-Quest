import React, { useEffect } from 'react';
import { ArrowLeft, Gift, Timer, Check, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ultraQuests } from '../data/questsData';
import { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

function UltraQuestCategory() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Trier les quêtes pour mettre les completed en premier
  const sortedQuests = [...ultraQuests].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return 0;
  });

  // Animation au scroll pour les cartes
  const { containerRef, getItemVisibility } = useStaggeredScrollAnimation(sortedQuests.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header activeSection="Quests" />
      
      {/* Hero Header with Ultra theme */}
      <header className="relative h-[250px] sm:h-[400px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
          alt="Ultra Gaming"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-full hover:bg-black/60 transition-all duration-200 shadow-lg hover-lift-sm"
          >
            <ArrowLeft size={16} className="text-white sm:w-5 sm:h-5" />
            <span className="text-white font-medium text-sm sm:text-base">Back</span>
          </Link>
        </div>

        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-4 shadow-lg">
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
                <span className="text-white font-bold text-3xl hidden">U</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-5xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ultra
                </h1>
                <p className="text-sm sm:text-xl text-gray-300">The future of gaming - {ultraQuests.length} innovative quests</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quests Grid */}
      <section 
        ref={containerRef as React.RefObject<HTMLElement>}
        className="container mx-auto px-4 sm:px-6 py-8 sm:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {sortedQuests.map((quest, index) => (
            <div 
              key={quest.id}
              data-index={index}
              className={`quest-card group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 scroll-animate ${getItemVisibility(index) ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
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
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {quest.title}
                </h3>
                <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">{quest.subtitle}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1 sm:gap-2 bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full border border-gray-500/30">
                      <Gift size={14} className="text-purple-400 sm:w-4 sm:h-4" />
                      <span className="text-white text-xs sm:text-sm font-medium">{quest.gems}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full border border-gray-500/30">
                      <Timer size={14} className="text-purple-400 sm:w-4 sm:h-4" />
                      <span className="text-white text-xs sm:text-sm font-medium">{quest.lvlup}</span>
                    </div>
                  </div>
                </div>

                {quest.completed ? (
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25 hover-lift-sm">
                    <Gift size={18} />
                    Claim rewards
                  </button>
                ) : (
                  <Link 
                    to={`/quest/${quest.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25 hover-lift-sm"
                  >
                    <Play size={18} />
                    Start Quest
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default UltraQuestCategory; 