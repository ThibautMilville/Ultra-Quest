import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Filter, Copy, Edit, MoreHorizontal, Plus, Trash2, GripVertical, CheckCircle, FileEdit } from 'lucide-react';
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

// Utility functions moved outside components
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'text-green-400';
    case 'Pending': return 'text-yellow-400';
    case 'Ended': return 'text-gray-400';
    case 'Draft': return 'text-blue-400';
    default: return 'text-gray-400';
  }
};

const getTranslatedStatus = (status: string, t: any) => {
  switch (status) {
    case 'Active': return t('admin.status.active');
    case 'Pending': return t('admin.status.pending');
    case 'Ended': return t('admin.status.ended');
    case 'Draft': return t('admin.status.draft');
    default: return status;
  }
};

const getTranslatedQuestTitle = (questId: string, category: string, t: any) => {
  try {
    // Extract the number from the quest ID (e.g., "ashes-1" -> "1")
    const questNumber = questId.split('-')[1];
    return t(`quest.${category}.${questNumber}.title` as any);
  } catch {
    // Fallback to original title if translation not found
    return questId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
};

function QuestRow({ 
  quest, 
  onDuplicate, 
  onCompleteQuest,
  onRename,
  index, 
  onDragStart, 
  onDragOver, 
  onDrop,
  isDragOver,
  category 
}: { 
  quest: Quest; 
  onDuplicate: (quest: Quest) => void;
  onCompleteQuest: (quest: Quest) => void;
  onRename: (quest: Quest) => void;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragOver?: boolean;
  category: string;
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
        <span className="text-white font-medium">{getTranslatedQuestTitle(quest.id, category, t)}</span>
      </div>
      
      <div className={`font-medium ${getStatusColor(quest.status)}`}>
        {getTranslatedStatus(quest.status, t)}
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
          onClick={() => onRename(quest)}
          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          title={t('button.rename')}
        >
          <FileEdit size={16} className="text-gray-400" />
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
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [questOrder, setQuestOrder] = useState<Quest[]>([]);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [newQuestName, setNewQuestName] = useState('');

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

  const handleRename = (quest: Quest) => {
    setSelectedQuest(quest);
    setNewQuestName(quest.title);
    setShowRenameModal(true);
  };

  const handleRenameConfirm = () => {
    if (selectedQuest && newQuestName.trim()) {
      const updatedOrder = questOrder.map(q => 
        q.id === selectedQuest.id ? { ...q, title: newQuestName.trim() } : q
      );
      setQuestOrder(updatedOrder);
      setShowRenameModal(false);
      setSelectedQuest(null);
      setNewQuestName('');
    }
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
      <div className="relative h-60 sm:h-80 overflow-hidden">
        <img 
          src={categoryInfo.headerImage}
          alt={categoryInfo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
          <Link 
            to={getLocalizedUrl("/admin/quest-manager")} 
            className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-black/60 transition-all duration-300 shadow-lg border border-white/20"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5 text-white" />
            <span className="text-white font-medium text-sm sm:text-base">{t('button.back')}</span>
          </Link>
        </div>

        {/* Create Quest Button */}
        <div className="absolute top-4 sm:top-8 right-4 sm:right-8">
          <button 
            onClick={() => localizedNavigate('/admin/quest-editor/information')}
            className="bg-purple-600/90 backdrop-blur-sm hover:bg-purple-700 text-white px-3 sm:px-8 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 sm:gap-3 shadow-lg border border-purple-500/30 text-sm sm:text-base"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{t('button.createQuest')}</span>
            <span className="sm:hidden">{t('action.create')}</span>
          </button>
        </div>

        {/* Category Info */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8">
          <div className="flex items-center gap-3 sm:gap-6 mb-2 sm:mb-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-2 sm:p-3 ${
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
              <span className={`font-bold text-lg sm:text-2xl hidden ${
                category === 'ultra' ? 'text-purple-600' : 'text-white'
              }`}>
                {categoryInfo.title.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">{categoryInfo.title}</h1>
              <p className="text-white/90 text-sm sm:text-lg">{categoryInfo.questCount} {t('admin.quests')}</p>
            </div>
          </div>
        </div>
      </div>

              {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search size={18} className="sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('admin.searchQuests')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>
          
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-purple-500 focus:outline-none appearance-none pr-10 sm:pr-12 min-w-[140px] sm:min-w-[150px] text-sm sm:text-base w-full sm:w-auto"
            >
              <option value="By Status">{t('admin.byStatus')}</option>
              <option value="Active">{t('admin.status.active')}</option>
              <option value="Draft">{t('admin.status.draft')}</option>
              <option value="Pending">{t('admin.status.pending')}</option>
              <option value="Ended">{t('admin.status.ended')}</option>
            </select>
            <Filter size={16} className="sm:w-[18px] sm:h-[18px] absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
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
                onRename={handleRename}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragOver={dragOverIndex === index}
                category={category || 'ashes'}
              />
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredQuests.map((quest, index) => (
            <div key={quest.id} className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
              <div className="flex items-start gap-3 mb-3">
                <img 
                  src={quest.image} 
                  alt={quest.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">{getTranslatedQuestTitle(quest.id, category || 'ashes', t)}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quest.status)}`}>
                      {getTranslatedStatus(quest.status, t)}
                    </span>
                    <span className="text-gray-400 text-xs">#{index + 1}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleDuplicate(quest)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title={t('button.duplicate')}
                  >
                    <Copy size={14} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleRename(quest)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title={t('button.rename')}
                  >
                    <FileEdit size={14} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => localizedNavigate(`/admin/quest-editor/${quest.id}/information`)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    title={t('button.edit')}
                  >
                    <Edit size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">{t('admin.table.start')}:</span>
                  <span className="text-white ml-1">{quest.start}</span>
                </div>
                <div>
                  <span className="text-gray-400">{t('admin.table.end')}:</span>
                  <span className="text-white ml-1">{quest.end}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400">{t('admin.table.participation')}:</span>
                  <span className="text-white ml-1">{quest.participation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuests.length === 0 && (
          <div className="bg-gray-800 rounded-2xl p-8 sm:p-16 text-center border border-gray-700 mt-6 sm:mt-8">
            <div className="text-gray-400 mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search size={24} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{t('admin.noQuestsFound')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('admin.noQuestsDescription')}</p>
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

        {/* Rename Quest Modal */}
        {showRenameModal && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowRenameModal(false);
                setSelectedQuest(null);
                setNewQuestName('');
              }
            }}
          >
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">{t('admin.renameQuest')}</h3>
              
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">{t('admin.newQuestName')}</label>
                <input
                  type="text"
                  value={newQuestName}
                  onChange={(e) => setNewQuestName(e.target.value)}
                  placeholder={t('admin.enterNewName')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRenameConfirm();
                    } else if (e.key === 'Escape') {
                      setShowRenameModal(false);
                    }
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowRenameModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {t('action.cancel')}
                </button>
                <button 
                  onClick={handleRenameConfirm}
                  disabled={!newQuestName.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {t('action.save')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default AdminCategoryList; 