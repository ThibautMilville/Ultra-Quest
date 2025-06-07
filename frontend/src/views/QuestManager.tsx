import React, { useState } from 'react';
import { ArrowLeft, Plus, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ashesQuests, ultraQuests, championQuests } from '../data/questsData';

interface CategoryCardProps {
  title: string;
  questCount: number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

function CategoryCard({ title, questCount, icon, color, onClick }: CategoryCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${color} group`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center">
          {typeof icon === 'string' ? <span className="text-2xl">{icon}</span> : icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/80">{questCount} Quests</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

function CreateCategoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
              <h2 className="text-xl font-bold text-white">New category</h2>
              <p className="text-gray-400 text-sm">Create a new quest category</p>
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
          You will create a new Quest category that will be able to regroup quests you'll 
          create inside. The category will be visible by the users on the ultra.io website
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Category name</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter a bold title that captures the essence of your quest!"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-gray-400 text-sm">64</span>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Category image</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
              <div className="text-gray-400 mb-2">📁</div>
              <p className="text-gray-400">Upload an image</p>
              <p className="text-gray-500 text-xs">Recommended size: 384x216px</p>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Category logo</label>
            <div className="flex gap-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer flex-1">
                <div className="text-gray-400 mb-2">📁</div>
                <p className="text-gray-400 text-sm">Upload an image</p>
              </div>
              <div className="text-xs text-gray-400 flex flex-col justify-center">
                <p>Requirements:</p>
                <p>• 1080x1080</p>
                <p>• Monochrome white png on transparent background</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const totalQuests = ashesQuests.length + ultraQuests.length + championQuests.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <Header activeSection="Admin" />
      
      {/* Header */}
      <div className="flex-1">
        <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Quest manager</h1>
            <p className="text-gray-400">{totalQuests} quests</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            Create a new Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Category Card */}
          <div 
            onClick={() => setShowCreateModal(true)}
            className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-gray-500 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-600 transition-colors">
              <Tag size={20} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
              Create a new category
            </h3>
          </div>

          {/* Ultra Category */}
          <CategoryCard
            title="Ultra"
            questCount={ultraQuests.length}
            icon={<img src="/ultra-quest/favicon.ico" alt="Ultra" className="w-6 h-6 object-contain" />}
            color="bg-gradient-to-br from-purple-600 to-blue-700"
            onClick={() => navigate('/admin/category-list/ultra')}
          />

          {/* Ashes of Mankind Category */}
          <CategoryCard
            title="Ashes of Mankind"
            questCount={ashesQuests.length}
            icon={<img src="/ultra-quest/ashesofmankind.png" alt="Ashes" className="w-6 h-6 object-contain" />}
            color="bg-gradient-to-br from-orange-600 to-red-700"
            onClick={() => navigate('/admin/category-list/ashes')}
          />

          {/* Champion Tactics Category */}
          <CategoryCard
            title="Champion Tactics"
            questCount={championQuests.length}
            icon={<img src="/ultra-quest/champion-tactis.png" alt="Champion" className="w-6 h-6 object-contain" />}
            color="bg-gradient-to-br from-green-600 to-teal-700"
            onClick={() => navigate('/admin/category-list/champion')}
          />
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