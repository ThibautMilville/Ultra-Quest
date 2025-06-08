import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Filter, Copy, Edit, MoreHorizontal, Plus, Trash2, GripVertical, CheckCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ashesQuests, ultraQuests, championQuests } from '../data/questsData';
import DuplicateQuestModal from './DuplicateQuestModal';
import { useTranslation } from '../contexts/TranslationContext';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';

interface Quest {
  id: string;
  title: string;
  status: 'Draft' | 'Active' | 'Pending' | 'Ended';
  start: string;
  end: string;
  participation: number;
  image: string;
}

function QuestRow({ 
  quest, 
  onDuplicate, 
  onCompleteQuest,
  index, 
  onDragStart, 
  onDragOver, 
  onDrop,
  isDragOver 
}: { 
  quest: Quest; 
  onDuplicate: (quest: Quest) => void;
  onCompleteQuest: (quest: Quest) => void;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragOver?: boolean;
}) {
  const navigate = useNavigate();
  const { localizedNavigate } = useLocalizedNavigation();
  const [showActions, setShowActions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Pending': return 'text-yellow-400';
      case 'Ended': return 'text-gray-400';
      case 'Draft': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getTranslatedStatus = (status: string) => {
    switch (status) {
      case 'Active': return t('admin.status.active');
      case 'Pending': return t('admin.status.pending');
      case 'Ended': return t('admin.status.ended');
      case 'Draft': return t('admin.status.draft');
      default: return status;
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  return (
    <div 
      className={`grid grid-cols-7 gap-4 items-center py-4 px-6 hover:bg-gray-700/30 transition-all duration-200 border-b border-gray-700/50 last:border-b-0 ${
        isDragging ? 'opacity-50 bg-gray-700/50 scale-95' : ''
      } ${
        isDragOver ? 'border-t-2 border-t-purple-500 bg-purple-500/10' : ''
      }`}
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, index);
      }}
             onDragEnd={() => setIsDragging(false)}
       onDragOver={(e) => onDragOver(e, index)}
       onDrop={(e) => onDrop(e, index)}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <GripVertical size={16} className="text-gray-500 cursor-grab active:cursor-grabbing" />
          <span className="text-gray-400 font-mono text-sm min-w-[2rem]">#{index + 1}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <img 
          src={quest.image} 
          alt={quest.title}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-white font-medium">{quest.title}</span>
      </div>
      
      <div className={`font-medium ${getStatusColor(quest.status)}`}>
        {getTranslatedStatus(quest.status)}
      </div>
      
      <div className="text-gray-400">
        {quest.start}
      </div>
      
      <div className="text-gray-400">
        {quest.end}
      </div>
      
      <div className="text-white font-medium">
        {quest.participation}
      </div>
      
      <div className="flex items-center gap-2 justify-end relative">
        <button 
          onClick={() => onDuplicate(quest)}
          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          title={t('button.duplicate')}
        >
          <Copy size={16} className="text-gray-400" />
        </button>
        <button 
          onClick={() => localizedNavigate(`/admin/quest-editor/${quest.id}/information`)}
          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          title={t('button.edit')}
        >
          <Edit size={16} className="text-gray-400" />
        </button>
        <button 
          onClick={() => setShowActions(!showActions)}
          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          title={t('admin.moreActions')}
        >
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
        
        {/* Actions Dropdown */}
        {showActions && (
          <div 
            ref={dropdownRef}
            className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-[150px]"
          >
            <button 
              onClick={() => {
                onDuplicate(quest);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Copy size={14} />
              {t('button.duplicate')}
            </button>
            <button 
              onClick={() => {
                localizedNavigate(`/admin/quest-editor/${quest.id}/information`);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Edit size={14} />
              {t('button.edit')}
            </button>
            {quest.status !== 'Ended' && (
              <button 
                onClick={() => {
                  onCompleteQuest(quest);
                  setShowActions(false);
                }}
                className="w-full px-4 py-2 text-left text-green-400 hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
              >
                <CheckCircle size={14} />
                {t('button.completeQuest')}
              </button>
            )}
            <button 
              onClick={() => {
                // Handle delete
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Trash2 size={14} />
              {t('button.delete')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminCategoryList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { localizedNavigate, getLocalizedUrl } = useLocalizedNavigation();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('By Status');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [questOrder, setQuestOrder] = useState<Quest[]>([]);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDuplicate = (quest: Quest) => {
    setSelectedQuest(quest);
    setShowDuplicateModal(true);
  };

  const handleCompleteQuest = (quest: Quest) => {
    // Update quest status to 'Ended'
    const updatedOrder = questOrder.map(q => 
      q.id === quest.id ? { ...q, status: 'Ended' as const } : q
    );
    setQuestOrder(updatedOrder);
  };

  // Get quests based on category
  const getQuestsForCategory = () => {
    switch (category) {
      case 'ashes':
        return ashesQuests;
      case 'ultra':
        return ultraQuests;
      case 'champion':
        return championQuests;
      default:
        return ashesQuests;
    }
  };

  const getCategoryInfo = () => {
    switch (category) {
      case 'ashes':
        return {
          title: 'Ashes of Mankind',
          questCount: ashesQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop&crop=center',
          logo: '/ashesofmankind.png'
        };
      case 'ultra':
        return {
          title: 'Ultra',
          questCount: ultraQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop&crop=center',
          logo: '/favicon.ico'
        };
      case 'champion':
        return {
          title: 'Champion Tactics',
          questCount: championQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=400&fit=crop&crop=center',
          logo: '/champion-tactis.png'
        };
      default:
        return {
          title: 'Ashes of Mankind',
          questCount: ashesQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop&crop=center',
          logo: '/ashesofmankind.png'
        };
    }
  };

  const categoryInfo = getCategoryInfo();
  const quests = getQuestsForCategory();

  // Convert quests to admin format
  const adminQuests: Quest[] = quests.map((quest, index) => ({
    id: quest.id,
    title: quest.title,
    status: quest.completed ? 'Ended' : index % 4 === 0 ? 'Draft' : index % 3 === 0 ? 'Pending' : 'Active',
    start: index % 2 === 0 ? 'Jan 15, 2025' : '-',
    end: index % 2 === 0 ? 'Jan 21, 2025' : '-',
    participation: quest.completed ? Math.floor(Math.random() * 300) + 100 : index % 2 === 0 ? 147 : 0,
    image: quest.image
  }));

  // Initialize quest order
  useEffect(() => {
    if (questOrder.length === 0) {
      setQuestOrder(adminQuests);
    }
  }, [adminQuests]);

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newOrder = [...questOrder];
    const draggedItem = newOrder[draggedIndex];
    
    // Remove dragged item
    newOrder.splice(draggedIndex, 1);
    
    // Insert at new position
    newOrder.splice(dropIndex, 0, draggedItem);
    
    setQuestOrder(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const getTranslatedFilterOption = (option: string) => {
    switch (option) {
      case 'By Status': return t('admin.byStatus');
      case 'Active': return t('admin.status.active');
      case 'Draft': return t('admin.status.draft');
      case 'Pending': return t('admin.status.pending');
      case 'Ended': return t('admin.status.ended');
      default: return option;
    }
  };

  const filteredQuests = questOrder.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'By Status' || quest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

      return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header activeSection="nav.admin" />

      {/* Category Header */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={categoryInfo.headerImage}
          alt={categoryInfo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link 
            to={getLocalizedUrl("/admin/quest-manager")} 
            className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-black/60 transition-all duration-300 shadow-lg border border-white/20"
          >
            <ArrowLeft size={20} className="text-white" />
            <span className="text-white font-medium">{t('button.back')}</span>
          </Link>
        </div>

        {/* Create Quest Button */}
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => localizedNavigate('/admin/quest-editor/information')}
            className="bg-purple-600/90 backdrop-blur-sm hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 shadow-lg border border-purple-500/30"
          >
            <Plus size={20} />
            {t('button.createQuest')}
          </button>
        </div>

        {/* Category Info */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-6 mb-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-3 ${
              category === 'ultra' 
                ? 'bg-white/90 backdrop-blur-sm border border-purple-500/30' 
                : category === 'ashes'
                ? 'bg-gradient-to-br from-orange-500 to-red-600'
                : 'bg-gradient-to-br from-green-500 to-emerald-600'
            }`}>
              <img 
                src={categoryInfo.logo} 
                alt={categoryInfo.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLSpanElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span className={`font-bold text-2xl hidden ${
                category === 'ultra' ? 'text-purple-600' : 'text-white'
              }`}>
                {categoryInfo.title.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{categoryInfo.title}</h1>
              <p className="text-white/90 text-lg">{categoryInfo.questCount} {t('admin.quests')}</p>
            </div>
          </div>
        </div>
      </div>

              {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('admin.searchQuests')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>
          
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-xl px-6 py-4 text-white focus:border-purple-500 focus:outline-none appearance-none pr-12 min-w-[150px]"
            >
              <option value="By Status">{t('admin.byStatus')}</option>
              <option value="Active">{t('admin.status.active')}</option>
              <option value="Draft">{t('admin.status.draft')}</option>
              <option value="Pending">{t('admin.status.pending')}</option>
              <option value="Ended">{t('admin.status.ended')}</option>
            </select>
            <Filter size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
          {/* Table Header */}
          <div className="bg-gray-750 border-b border-gray-700">
            <div className="grid grid-cols-7 gap-4 items-center py-5 px-6">
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">{t('admin.table.order')}</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">{t('admin.table.name')}</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">{t('admin.table.status')}</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">{t('admin.table.start')}</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">{t('admin.table.end')}</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">{t('admin.table.participation')}</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide text-right">{t('admin.table.actions')}</div>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {filteredQuests.map((quest, index) => (
              <QuestRow 
                key={quest.id} 
                quest={quest} 
                index={index}
                onDuplicate={handleDuplicate}
                onCompleteQuest={handleCompleteQuest}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragOver={dragOverIndex === index}
              />
            ))}
          </div>
        </div>

        {filteredQuests.length === 0 && (
          <div className="bg-gray-800 rounded-2xl p-16 text-center border border-gray-700 mt-8">
            <div className="text-gray-400 mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t('admin.noQuestsFound')}</h3>
              <p className="text-gray-400">{t('admin.noQuestsDescription')}</p>
            </div>
          </div>
        )}
        </div>
        </div>

        <Footer />
        
        <DuplicateQuestModal 
          isOpen={showDuplicateModal}
          onClose={() => setShowDuplicateModal(false)}
          questTitle={selectedQuest?.title || ''}
        />
      </div>
  );
}

export default AdminCategoryList; 