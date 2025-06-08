import React, { useState } from 'react';
import { ArrowLeft, Plus, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ashesQuests, ultraQuests, championQuests } from '../data/questsData';
import { useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';
import ImageUploadModal from '../components/ImageUploadModal';

interface CategoryCardProps {
  title: string;
  questCount: number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

function CategoryCard({ title, questCount, icon, color, onClick }: CategoryCardProps) {
  const { t } = useTranslation();
  
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${color} group shadow-lg border border-white/10`}
    >
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 h-full flex flex-col justify-between min-h-[100px] sm:min-h-[108px]">
        {/* Header avec icône */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 ${
            title === 'Ultra' 
              ? 'bg-white/95 backdrop-blur-sm border-2 border-purple-300/50 shadow-purple-500/20' 
              : title === 'Ashes of Mankind'
              ? 'bg-black/90 backdrop-blur-sm border-2 border-orange-400/50 shadow-orange-500/30'
              : title === 'Champion Tactics'
              ? 'bg-white/95 backdrop-blur-sm border-2 border-green-400/50 shadow-green-500/20'
              : 'bg-black/30 backdrop-blur-sm'
          }`}>
            {typeof icon === 'string' ? <span className="text-2xl sm:text-4xl">{icon}</span> : 
              React.cloneElement(icon as React.ReactElement, { 
                className: "w-6 h-6 sm:w-10 sm:h-10 object-contain" 
              })
            }
          </div>
          
          {/* Badge de nombre de quêtes moderne */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-full px-2 sm:px-3 py-1 shadow-lg">
            <span className="text-white font-bold text-xs sm:text-sm">{questCount}</span>
          </div>
        </div>

        {/* Titre et description */}
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-xl font-bold text-white leading-tight group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>
          <p className="text-white/80 text-xs sm:text-sm font-medium">
            {questCount} {questCount === 1 ? t('admin.quest') : t('admin.quests')}
          </p>
        </div>

        {/* Barre de progression décorative */}
        <div className="mt-3 sm:mt-4 h-1 bg-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full transition-all duration-1000 group-hover:bg-white/60"
            style={{ width: `${Math.min((questCount / 10) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Effet de dégradé au survol */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

function CreateCategoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showLogoUpload, setShowLogoUpload] = useState(false);
  const [categoryImage, setCategoryImage] = useState<string>('');
  const [categoryLogo, setCategoryLogo] = useState<string>('');
  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-gray-700">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Tag size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{t('admin.newCategory')}</h2>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">{t('admin.createNewQuestCategory')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm">
          {t('admin.categoryDescription')}
        </p>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.categoryName')}</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t('admin.categoryNamePlaceholder')}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
              />
              <span className="absolute right-2 sm:right-3 top-2 sm:top-3 text-gray-400 text-xs sm:text-sm">64</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.categoryImage')}</label>
            {categoryImage ? (
              <div className="relative bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700">
                <img 
                  src={categoryImage} 
                  alt="Category" 
                  className="w-full h-24 sm:h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setCategoryImage('')}
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xs">✕</span>
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setShowImageUpload(true)}
                className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
              >
                <div className="text-gray-400 mb-2 text-lg sm:text-2xl">📁</div>
                <p className="text-gray-400 text-sm sm:text-base">{t('admin.uploadImage')}</p>
                <p className="text-gray-500 text-xs hidden sm:block">{t('admin.recommendedImageSize')}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">{t('admin.categoryLogo')}</label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {categoryLogo ? (
                <div className="relative bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700 flex-1">
                  <img 
                    src={categoryLogo} 
                    alt="Logo" 
                    className="w-full h-20 sm:h-24 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => setCategoryLogo('')}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-xs">✕</span>
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setShowLogoUpload(true)}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-gray-500 transition-colors cursor-pointer flex-1"
                >
                  <div className="text-gray-400 mb-2 text-lg sm:text-2xl">📁</div>
                  <p className="text-gray-400 text-xs sm:text-sm">{t('admin.uploadImage')}</p>
                </div>
              )}
              <div className="text-xs text-gray-400 flex flex-col justify-center sm:w-auto w-full">
                <p className="font-medium">{t('admin.requirements')}:</p>
                <p>• 1080x1080</p>
                <p>• {t('admin.logoRequirement')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            {t('action.cancel')}
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base">
            {t('action.create')}
          </button>
        </div>
      </div>

      {/* Image Upload Modals */}
      <ImageUploadModal
        isOpen={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onImageSelect={(imageUrl) => setCategoryImage(imageUrl)}
        title={t('admin.categoryImage')}
        recommendedSize="384x216px"
      />

      <ImageUploadModal
        isOpen={showLogoUpload}
        onClose={() => setShowLogoUpload(false)}
        onImageSelect={(imageUrl) => setCategoryLogo(imageUrl)}
        title={t('admin.categoryLogo')}
        acceptedFormats={['PNG']}
        recommendedSize="1080x1080px"
      />
    </div>
  );
}

function QuestManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { getLocalizedUrl, localizedNavigate } = useLocalizedNavigation();

  const totalQuests = ashesQuests.length + ultraQuests.length + championQuests.length;
  
  // Animation pour les cartes de catégories (4 cartes au total)
  const { containerRef, getItemVisibility } = useStaggeredScrollAnimation(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <Header activeSection="nav.admin" />
      
      {/* Header */}
      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              to={getLocalizedUrl('/')} 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">{t('button.back')}</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{t('admin.questManager')}</h1>
            <p className="text-gray-400 text-sm sm:text-base">{totalQuests} {t('admin.quests')}</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{t('admin.createNewCategory')}</span>
            <span className="sm:hidden">{t('admin.newCategory')}</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {/* Create New Category Card */}
          <div 
            data-index="0"
            onClick={() => setShowCreateModal(true)}
            className={`border-2 border-dashed border-gray-600 rounded-2xl p-4 sm:p-6 text-center hover:border-purple-500 hover:bg-gray-800/50 transition-all duration-500 cursor-pointer group scroll-animate ${getItemVisibility(0) ? 'visible' : ''} shadow-lg hover:shadow-2xl backdrop-blur-sm`}
            style={{ animationDelay: '0ms' }}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[100px] sm:min-h-[108px]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg border border-gray-600 group-hover:border-purple-500">
                <Tag size={20} className="sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-300 group-hover:text-white transition-colors leading-tight text-center">
                <span className="hidden sm:inline">{t('admin.createNewCategory')}</span>
                <span className="sm:hidden">{t('admin.newCategory')}</span>
              </h3>
              <div className="mt-2 w-6 sm:w-8 h-0.5 bg-gray-600 group-hover:bg-purple-500 transition-colors rounded-full"></div>
            </div>
          </div>

          {/* Ultra Category */}
          <div 
            data-index="1"
            className={`scroll-animate ${getItemVisibility(1) ? 'visible' : ''}`}
            style={{ animationDelay: '150ms' }}
          >
            <CategoryCard
              title="Ultra"
              questCount={ultraQuests.length}
              icon={<img src="/favicon.ico" alt="Ultra" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />}
              color="bg-gradient-to-br from-purple-600 to-blue-700"
              onClick={() => localizedNavigate('/admin/category-list/ultra')}
            />
          </div>

          {/* Ashes of Mankind Category */}
          <div 
            data-index="2"
            className={`scroll-animate ${getItemVisibility(2) ? 'visible' : ''}`}
            style={{ animationDelay: '300ms' }}
          >
            <CategoryCard
              title="Ashes of Mankind"
              questCount={ashesQuests.length}
              icon={<img src="/ashesofmankind.png" alt="Ashes" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />}
              color="bg-gradient-to-br from-orange-600 to-red-700"
              onClick={() => localizedNavigate('/admin/category-list/ashes')}
            />
          </div>

          {/* Champion Tactics Category */}
          <div 
            data-index="3"
            className={`scroll-animate ${getItemVisibility(3) ? 'visible' : ''}`}
            style={{ animationDelay: '450ms' }}
          >
            <CategoryCard
              title="Champion Tactics"
              questCount={championQuests.length}
              icon={<img src="/champion-tactis.png" alt="Champion" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />}
              color="bg-gradient-to-br from-green-600 to-teal-700"
              onClick={() => localizedNavigate('/admin/category-list/champion')}
            />
          </div>
        </div>
        </div>
      </div>

      <CreateCategoryModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />

      <Footer />
    </div>
  );
}

export default QuestManager; 