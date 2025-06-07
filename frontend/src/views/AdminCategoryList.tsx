import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Search, Filter, Copy, Edit, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ashesQuests, ultraQuests, championQuests } from '../data/questsData';
import DuplicateQuestModal from './DuplicateQuestModal';

interface Quest {
  id: string;
  title: string;
  status: 'Draft' | 'Active' | 'Pending' | 'Ended';
  start: string;
  end: string;
  participation: number;
  image: string;
}

function QuestRow({ quest, onDuplicate }: { quest: Quest; onDuplicate: (quest: Quest) => void }) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="grid grid-cols-6 gap-4 items-center py-4 px-6 hover:bg-gray-700/30 transition-colors border-b border-gray-700/50 last:border-b-0">
      <div className="flex items-center gap-3">
        <img 
          src={quest.image} 
          alt={quest.title}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <span className="text-white font-medium">{quest.title}</span>
      </div>
      
      <div className={`font-medium ${getStatusColor(quest.status)}`}>
        {quest.status}
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
          title="Duplicate quest"
        >
          <Copy size={16} className="text-gray-400" />
        </button>
        <button 
          onClick={() => navigate('/admin/quest-editor/information')}
          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          title="Edit quest"
        >
          <Edit size={16} className="text-gray-400" />
        </button>
        <button 
          onClick={() => setShowActions(!showActions)}
          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
          title="More actions"
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
              Duplicate
            </button>
            <button 
              onClick={() => {
                navigate('/admin/quest-editor/information');
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Edit size={14} />
              Edit
            </button>
            <button 
              onClick={() => {
                // Handle delete
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Trash2 size={14} />
              Delete
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('By Status');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const handleDuplicate = (quest: Quest) => {
    setSelectedQuest(quest);
    setShowDuplicateModal(true);
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
          logo: '/ultra-quest/ashesofmankind.png'
        };
      case 'ultra':
        return {
          title: 'Ultra',
          questCount: ultraQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop&crop=center',
          logo: '/ultra-quest/favicon.ico'
        };
      case 'champion':
        return {
          title: 'Champion Tactics',
          questCount: championQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=400&fit=crop&crop=center',
          logo: '/ultra-quest/champion-tactis.png'
        };
      default:
        return {
          title: 'Ashes of Mankind',
          questCount: ashesQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop&crop=center',
          logo: '/ultra-quest/ashesofmankind.png'
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

  const filteredQuests = adminQuests.filter(quest =>
    quest.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

      return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header activeSection="Admin" />

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
            to="/admin/quest-manager" 
            className="flex items-center gap-3 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-black/70 transition-all duration-300 shadow-lg border border-white/10"
          >
            <ArrowLeft size={20} className="text-white" />
            <span className="text-white font-medium">Back</span>
          </Link>
        </div>

        {/* Create Quest Button */}
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => navigate('/admin/quest-editor/information')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-3 shadow-lg"
          >
            <Plus size={20} />
            Create a new Quest
          </button>
        </div>

        {/* Category Info */}
        <div className="absolute bottom-8 left-8">
          <h1 className="text-5xl font-bold text-white mb-4">{categoryInfo.title}</h1>
          <p className="text-white/90 text-lg">{categoryInfo.questCount} quests</p>
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
              placeholder="Search for Quests..."
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
              <option>By Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Pending</option>
              <option>Ended</option>
            </select>
            <Filter size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
          {/* Table Header */}
          <div className="bg-gray-750 border-b border-gray-700">
            <div className="grid grid-cols-6 gap-4 items-center py-5 px-6">
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">Name</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">Status</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">Start</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">End</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide">Participation</div>
              <div className="text-gray-300 font-semibold text-sm uppercase tracking-wide text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {filteredQuests.map((quest) => (
              <QuestRow key={quest.id} quest={quest} onDuplicate={handleDuplicate} />
            ))}
          </div>
        </div>

        {filteredQuests.length === 0 && (
          <div className="bg-gray-800 rounded-2xl p-16 text-center border border-gray-700 mt-8">
            <div className="text-gray-400 mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No quests found</h3>
              <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for</p>
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