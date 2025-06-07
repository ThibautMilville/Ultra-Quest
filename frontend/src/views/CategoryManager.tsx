import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Copy, Edit, MoreHorizontal, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { ashesQuests, ultraQuests, championQuests } from '../data/questsData';

interface Quest {
  id: string;
  title: string;
  status: 'Draft' | 'Active' | 'Pending' | 'Ended';
  start: string;
  end: string;
  participation: number;
  image: string;
}

function QuestRow({ quest }: { quest: Quest }) {
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
    <div className="grid grid-cols-6 gap-4 items-center py-4 px-6 hover:bg-gray-800/50 transition-colors border-b border-gray-700/50">
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
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Copy size={16} className="text-gray-400" />
        </button>
        <Link 
          to="/admin/quest-editor/information"
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Edit size={16} className="text-gray-400" />
        </Link>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

function CategoryManager() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('By Status');

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
          headerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop&crop=center'
        };
      case 'ultra':
        return {
          title: 'Ultra',
          questCount: ultraQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop&crop=center'
        };
      case 'champion':
        return {
          title: 'Champion Tactics',
          questCount: championQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=400&fit=crop&crop=center'
        };
      default:
        return {
          title: 'Ashes of Mankind',
          questCount: ashesQuests.length,
          headerImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop&crop=center'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      <Header activeSection="Admin" />
      
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <h1 className="text-lg font-medium text-white">Quest Category</h1>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={categoryInfo.headerImage}
          alt={categoryInfo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link 
            to="/admin/quest-manager" 
            className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/60 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft size={16} className="text-white" />
            <span className="text-white font-medium">Back</span>
          </Link>
        </div>

        {/* Create Quest Button */}
        <div className="absolute top-6 right-6">
          <Link 
            to="/admin/quest-editor/information"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Create a new Quest
          </Link>
        </div>

        {/* Category Info */}
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-white mb-2">{categoryInfo.title}</h1>
          <p className="text-white/80">{categoryInfo.questCount} quests</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1">
        <div className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none appearance-none pr-10"
            >
              <option>By Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Pending</option>
              <option>Ended</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Quest Table */}
        <div className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 items-center py-4 px-6 bg-gray-800 border-b border-gray-700">
            <div className="text-gray-400 font-medium">Name</div>
            <div className="text-gray-400 font-medium">Status</div>
            <div className="text-gray-400 font-medium">Start</div>
            <div className="text-gray-400 font-medium">End</div>
            <div className="text-gray-400 font-medium">Participation</div>
            <div className="text-gray-400 font-medium">Actions</div>
          </div>

          {/* Quest Rows */}
          <div>
            {filteredQuests.map((quest) => (
              <QuestRow key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CategoryManager; 