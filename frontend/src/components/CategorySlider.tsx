import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  color: string;
  logo?: string;
}



function CategorySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  // Get translated slide data
  const getTranslatedSlides = (): SlideData[] => [
    {
      id: 'ultra',
      title: 'Ultra',
      subtitle: t('slider.ultra.subtitle'),
      description: t('slider.ultra.description'),
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
      link: '/category/ultra',
      color: 'from-purple-600 to-blue-600',
      logo: '/favicon.ico'
    },
    {
      id: 'ashes',
      title: 'Ashes of Mankind',
      subtitle: t('slider.ashes.subtitle'),
      description: t('slider.ashes.description'),
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1200',
      link: '/category/ashes',
      color: 'from-orange-600 to-red-600',
      logo: '/ashesofmankind.png'
    },
    {
      id: 'champion',
      title: 'Champion Tactics',
      subtitle: t('slider.champion.subtitle'),
      description: t('slider.champion.description'),
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
      link: '/category/champion',
      color: 'from-green-600 to-emerald-600',
      logo: '/champion-tactis.png'
    }
  ];

  const translatedSlides = getTranslatedSlides();

  // Auto-play functionality with progress tracking
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % translatedSlides.length);
          return 0;
        }
        return prev + 2; // Increment by 2% every 100ms for 5 second duration
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  // Reset progress when slide changes manually
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % translatedSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + translatedSlides.length) % translatedSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = translatedSlides[currentSlide];

  return (
    <div className="relative group">
      {/* Navigation Arrows - Hidden on mobile, visible on desktop hover */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 bg-black/60 backdrop-blur-sm p-4 rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg z-30 text-white hover:scale-110 opacity-0 group-hover:opacity-100 hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 bg-black/60 backdrop-blur-sm p-4 rounded-full hover:bg-black/80 transition-all duration-300 shadow-lg z-30 text-white hover:scale-110 opacity-0 group-hover:opacity-100 hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slider Container */}
      <div className="relative h-[300px] sm:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={currentSlideData.image} 
            alt={currentSlideData.title}
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end p-4 sm:p-8 z-10">
          <div className="container mx-auto">
            <div className="max-w-2xl">
              {/* Logo */}
              {currentSlideData.logo && (
                <div className="mb-2 sm:mb-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center p-2 ${
                    currentSlideData.id === 'ultra' 
                      ? 'bg-white/90 backdrop-blur-sm border border-purple-500/30' 
                      : currentSlideData.id === 'ashes'
                      ? 'bg-gradient-to-br from-orange-500 to-red-600'
                      : 'bg-gradient-to-br from-green-500 to-emerald-600'
                  }`}>
                    <img 
                      src={currentSlideData.logo} 
                      alt={currentSlideData.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.textContent = currentSlideData.title[0];
                      }}
                    />
                    <span className={`font-bold text-xl hidden ${
                      currentSlideData.id === 'ultra' ? 'text-purple-600' : 'text-white'
                    }`}>{currentSlideData.title[0]}</span>
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4 bg-gradient-to-r ${currentSlideData.color} text-white shadow-lg`}>
                {currentSlideData.subtitle}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currentSlideData.title}
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-xl text-gray-300 mb-4 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {currentSlideData.description}
              </p>

              {/* CTA Button */}
              <Link 
                to={currentSlideData.link}
                className={`inline-block bg-gradient-to-r ${currentSlideData.color} hover:opacity-90 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base`}
              >
                {t('home.exploreQuests')}
              </Link>
            </div>
          </div>
        </div>

        {/* Pagination Dots - More discrete on mobile */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-10">
          {translatedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white/90 sm:bg-white scale-110 sm:scale-125 shadow-md sm:shadow-lg' 
                  : 'bg-white/30 sm:bg-white/50 hover:bg-white/50 sm:hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar - Always visible */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div 
            className={`h-full bg-gradient-to-r ${currentSlideData.color} transition-all duration-300 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Slide indicator */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/40 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm z-10">
          {currentSlide + 1} / {translatedSlides.length}
        </div>
      </div>
    </div>
  );
}

export default CategorySlider; 