import React, { useState } from 'react';
import { Timer, TowerControl as GameController, Gift, ChevronLeft, ChevronRight, ExternalLink, Home, Download, Gamepad2, Trophy, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

function NavigationLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <a href="github.com" className={`nav-link text-sm font-medium ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
      {children}
    </a>
  );
}

function QuestCard({ title, subtitle, gems, lvlup, endsIn, progress, image, completed, link }: {
  title: string;
  subtitle: string;
  gems: number;
  lvlup: number;
  endsIn: string;
  progress?: number;
  image: string;
  completed?: boolean;
  link: string;
}) {
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
        {progress !== undefined && (
          <div className="progress-circle absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-600/90 backdrop-blur flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">{progress}</span>
          </div>
        )}
        {completed && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-600/90 backdrop-blur flex items-center justify-center shadow-lg">
            <span className="text-white">✓</span>
          </div>
        )}
      </div>
    </Link>
  );
}

function QuestCategory({ icon, title, subtitle, active }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div className={`category-card flex items-center gap-4 p-4 rounded-xl cursor-pointer ${
      active ? 'active' : ''
    }`}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

export function QuestList() {
  const [activeCategory, setActiveCategory] = useState('ashes');

  return (
    <div className="min-h-screen bg-[#1A1B1C] text-white">
      {/* Navigation */}
      <nav className="bg-[#1A1B1C] border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Gift size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg">ULTRA</span>
            </div>
            <div className="flex items-center gap-8">
              <NavigationLink active><Home size={16} className="inline mr-1" /> Home</NavigationLink>
              <NavigationLink><Download size={16} className="inline mr-1" /> Install</NavigationLink>
              <NavigationLink><Gamepad2 size={16} className="inline mr-1" /> Games</NavigationLink>
              <NavigationLink><Trophy size={16} className="inline mr-1" /> Tournaments</NavigationLink>
              <NavigationLink><BookOpen size={16} className="inline mr-1" /> Blog</NavigationLink>
              <NavigationLink active>Quests</NavigationLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[400px]">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1C] to-transparent">
          <div className="hero-content container mx-auto px-6 h-full flex flex-col justify-end pb-12">
            <div className="text-sm text-gray-400 mb-2">Ashes of Mankind</div>
            <h1 className="text-4xl font-bold mb-4">Ready for battle.</h1>
            <p className="text-gray-300 mb-6">Install Ashes of Mankind</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GameController size={20} className="text-purple-400" />
                <span>10 Gems</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={20} className="text-purple-400" />
                <span>1 LvlUp</span>
              </div>
            </div>
            <Link to="/quest/game" className="mt-6 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors w-fit">
              Step in!
            </Link>
            <div className="absolute bottom-4 right-6 flex items-center gap-4">
              <div className="w-32 h-16 bg-black/40 backdrop-blur rounded-lg"></div>
              <div className="w-16 h-16 bg-black/40 backdrop-blur rounded-lg"></div>
              <div className="w-16 h-16 bg-purple-600/40 backdrop-blur rounded-lg"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Challenges Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="challenge-card bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6">
            <h3 className="font-bold mb-2">Daily Challenge</h3>
            <p className="text-2xl font-bold mb-4">Achieve 2 daily quests</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Gift size={16} />
                  <span>10 Gems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer size={16} />
                  <span>1 LvlUp</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                Ends in 3H
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">0</span>
              </div>
            </div>
          </div>

          <div className="challenge-card bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6">
            <h3 className="font-bold mb-2">Weekly Challenge</h3>
            <p className="text-2xl font-bold mb-4">Achieve 3 quests this week</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Gift size={16} />
                  <span>10 Gems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer size={16} />
                  <span>1 LvlUp</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                Ends in 2D 17H
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ashes of Mankind Quests */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Ashes of Mankind</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-[#2A2D2E] hover:bg-[#3A3D3E]">
              <ChevronLeft size={24} />
            </button>
            <button className="p-2 rounded-full bg-[#2A2D2E] hover:bg-[#3A3D3E]">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuestCard
            title="Ready for battle"
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
            link="/quest/game"
          />
          <QuestCard
            title="Ready for battle"
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
            link="/quest/game"
          />
          <QuestCard
            title="Taming the ascension"
            subtitle="Play 15h in Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            progress={1}
            image="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"
            link="/quest/game"
          />
        </div>
      </section>

      {/* Ultra Quests */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Ultra</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-[#2A2D2E] hover:bg-[#3A3D3E]">
              <ChevronLeft size={24} />
            </button>
            <button className="p-2 rounded-full bg-[#2A2D2E] hover:bg-[#3A3D3E]">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuestCard
            title="Purchase a Uniq"
            subtitle="Purchase a Uniq on the Marketplace"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80"
            link="/quest/social"
          />
          <QuestCard
            title="Ready for battle"
            subtitle="Install Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            image="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80"
            link="/quest/game"
          />
          <QuestCard
            title="Taming the ascension"
            subtitle="Play 15h in Ashes of Mankind"
            gems={10}
            lvlup={1}
            endsIn="2D 17H"
            completed
            image="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80"
            link="/quest/game"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6">Quest category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuestCategory
            icon={<GameController size={32} className="text-[#9A8866]" />}
            title="Ashes of Mankind"
            subtitle="Browse all Ashes of Mankind Quests"
            active={activeCategory === 'ashes'}
          />
          <QuestCategory
            icon={<Gift size={32} className="text-purple-600" />}
            title="Ultra"
            subtitle="Browse all Ultra Quests"
            active={activeCategory === 'ultra'}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">© 2024 Ultra Corporation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="github.com" className="text-gray-400 hover:text-white">
              <ExternalLink size={20} />
            </a>
            <a href="github.com" className="text-gray-400 hover:text-white">
              <Timer size={20} />
            </a>
            <a href="github.com" className="text-gray-400 hover:text-white">
              <Gift size={20} />
            </a>
            <a href="github.com" className="text-gray-400 hover:text-white text-sm">Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
}