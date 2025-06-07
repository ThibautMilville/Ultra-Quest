import { useState } from 'react';
import { ChevronLeft, ChevronRight, Timer, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Quest {
  id: string;
  title: string;
  subtitle: string;
  gems: number;
  lvlup: number;
  endsIn: string;
  image: string;
  completed?: boolean;
  link: string;
}

interface QuestSliderProps {
  title: string;
  quests: Quest[];
  itemsPerPage?: number;
}

export function QuestSlider({ title, quests, itemsPerPage = 3 }: QuestSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, quests.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleQuests = quests.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-colors ${
              currentIndex === 0 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-[#2A2D2E] hover:bg-[#3A3D3E] text-gray-400 hover:text-white'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-full transition-colors ${
              currentIndex >= maxIndex 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-[#2A2D2E] hover:bg-[#3A3D3E] text-gray-400 hover:text-white'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleQuests.map((quest) => (
          <QuestCard key={quest.id} {...quest} />
        ))}
      </div>
      
      {/* Pagination dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-purple-600' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function QuestCard({ title, subtitle, gems, lvlup, endsIn, image, completed, link }: Quest) {
  return (
    <Link to={link} className="quest-card relative overflow-hidden rounded-xl group cursor-pointer">
      <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end">
        <div className="absolute top-4 right-4 text-xs text-gray-300 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
          Ends in {endsIn}
        </div>
        <h3 className="text-xl font-bold text-white mt-2 group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-300 mb-3">{subtitle}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Gift size={16} className="text-purple-400" />
            <span className="text-sm text-white">{gems} Gems</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer size={16} className="text-purple-400" />
            <span className="text-sm text-white">{lvlup} LvlUp</span>
          </div>
        </div>
        {completed && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-600/90 backdrop-blur flex items-center justify-center shadow-lg">
            <span className="text-white text-sm">✓</span>
          </div>
        )}
      </div>
    </Link>
  );
} 