import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
}

function Header({ activeSection }: HeaderProps) {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Install', path: '/install' },
    { name: 'Games', path: '/games' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Blog', path: '/blog' },
    { name: 'Quests', path: '/' },
    { name: 'Admin', path: '/admin/quest-manager' }
  ];

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <img 
                src="/ultra-quest/favicon.ico" 
                alt="Ultra" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = 'U';
                }}
              />
              <span className="text-white font-bold text-base sm:text-lg hidden">U</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">Ultra Quest</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  activeSection === item.name ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 hover:scale-105 text-sm sm:text-base">
              <Wallet size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 