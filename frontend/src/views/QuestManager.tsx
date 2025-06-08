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
      className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${color} group shadow-lg border border-white/10`}
    >
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 h-full flex flex-col justify-between min-h-[108px]">
        {/* Header avec icône */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 ${
            title === 'Ultra' 
              ? 'bg-white/95 backdrop-blur-sm border-2 border-purple-300/50 shadow-purple-500/20' 
              : title === 'Ashes of Mankind'
              ? 'bg-black/90 backdrop-blur-sm border-2 border-orange-400/50 shadow-orange-500/30'
              : title === 'Champion Tactics'
              ? 'bg-white/95 backdrop-blur-sm border-2 border-green-400/50 shadow-green-500/20'
              : 'bg-black/30 backdrop-blur-sm'
          }`}>
            {typeof icon === 'string' ? <span className="text-4xl">{icon}</span> : 
              React.cloneElement(icon as React.ReactElement, { 
                className: "w-10 h-10 object-contain" 
              })
            }
          </div>
          
          {/* Badge de nombre de quêtes moderne */}
          <div className="relative">
            <div className="bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20 transition-all duration-300 group-hover:from-white/35 group-hover:to-white/25 group-hover:scale-110 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                <span className="text-white font-bold text-lg tracking-wide">{questCount}</span>
              </div>
            </div>
            {/* Effet de lueur */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </div>
        </div>
        
        {/* Titre et description */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm font-medium">
            {questCount} {t('admin.quests')}
          </p>
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <Tag size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t('admin.newCategory')}</h2>
              <p className="text-gray-400 text-sm">{t('admin.createNewQuestCategory')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 mb-6 text-sm">
          {t('admin.categoryDescription')}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">{t('admin.categoryName')}</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder={t('admin.categoryNamePlaceholder')}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-gray-400 text-sm">64</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">{t('admin.categoryImage')}</label>
            {categoryImage ? (
              <div className="relative bg-gray-900 rounded-lg p-4 border border-gray-700">
                <img 
                  src={categoryImage} 
                  alt="Category" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setCategoryImage('')}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div 
                onClick={() => setShowImageUpload(true)}
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
              >
                <div className="text-gray-400 mb-2">📁</div>
                <p className="text-gray-400">{t('admin.uploadImage')}</p>
                <p className="text-gray-500 text-xs">{t('admin.recommendedImageSize')}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-white font-medium mb-2">{t('admin.categoryLogo')}</label>
            <div className="flex gap-4">
              {categoryLogo ? (
                <div className="relative bg-gray-900 rounded-lg p-4 border border-gray-700 flex-1">
                  <img 
                    src={categoryLogo} 
                    alt="Logo" 
                    className="w-full h-24 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => setCategoryLogo('')}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setShowLogoUpload(true)}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer flex-1"
                >
                  <div className="text-gray-400 mb-2">📁</div>
                  <p className="text-gray-400 text-sm">{t('admin.uploadImage')}</p>
                </div>
              )}
              <div className="text-xs text-gray-400 flex flex-col justify-center">
                <p>{t('admin.requirements')}:</p>
                <p>• 1080x1080</p>
                <p>• {t('admin.logoRequirement')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {t('action.cancel')}
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors">
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
        <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to={getLocalizedUrl('/')} 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('button.back')}</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t('admin.questManager')}</h1>
            <p className="text-gray-400">{totalQuests} {t('admin.quests')}</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            {t('admin.createNewCategory')}
          </button>
        </div>

        {/* Categories Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Create New Category Card */}
          <div 
            data-index="0"
            onClick={() => setShowCreateModal(true)}
            className={`border-2 border-dashed border-gray-600 rounded-2xl p-6 text-center hover:border-purple-500 hover:bg-gray-800/50 transition-all duration-500 cursor-pointer group scroll-animate ${getItemVisibility(0) ? 'visible' : ''} shadow-lg hover:shadow-2xl backdrop-blur-sm`}
            style={{ animationDelay: '0ms' }}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[108px]">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg border border-gray-600 group-hover:border-purple-500">
                <Tag size={24} className="text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">
                {t('admin.createNewCategory')}
              </h3>
              <div className="mt-2 w-8 h-0.5 bg-gray-600 group-hover:bg-purple-500 transition-colors rounded-full"></div>
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
              icon={<img src="/favicon.ico" alt="Ultra" className="w-6 h-6 object-contain" />}
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
              icon={<img src="/ashesofmankind.png" alt="Ashes" className="w-6 h-6 object-contain" />}
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
              icon={<img src="/champion-tactis.png" alt="Champion" className="w-6 h-6 object-contain" />}
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