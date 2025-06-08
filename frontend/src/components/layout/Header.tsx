import { Link } from 'react-router-dom';
import { Wallet, Menu, X, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslationWithFlags } from '../../hooks/useTranslation';
import { useLocalizedNavigation } from '../../hooks/useLocalizedNavigation';
import LanguageSelector from './LanguageSelector';
import ProfileDropdown from '../ProfileDropdown';
import { useHeaderActions } from '../../hooks/useHeaderActions';
import { Language } from '../../types/translations.types';

interface HeaderProps {
  activeSection?: string;
}

function Header({ activeSection }: HeaderProps) {
  const { t, currentLang, setCurrentLang, getCurrentFlag } = useTranslationWithFlags();
  const { getLocalizedUrl } = useLocalizedNavigation();
  
  const {
    blockchainId,
    isConnected,
    isMenuOpen,
    isProfileOpen,
    isLangMenuOpen,
    profileDropdownRef,
    mobileProfileDropdownRef,
    langMenuRef,
    handleConnect,
    handleDisconnect,
    toggleMenu,
    closeMenu,
    setIsProfileOpen,
    setIsLangMenuOpen,
  } = useHeaderActions();
  
  const navItems = [
    { name: t('nav.home'), path: getLocalizedUrl('/'), key: 'nav.home' },
    { name: t('nav.launchpad'), path: 'https://launchpad-2ycml.ondigitalocean.app/en/', key: 'nav.launchpad' },
    { name: t('nav.ultraTimes'), path: 'https://ultratimes.io/', featured: true, key: 'nav.ultraTimes' },
    { name: t('nav.contact'), path: getLocalizedUrl('/contact'), key: 'nav.contact' },
    { name: t('nav.admin'), path: getLocalizedUrl('/admin/quest-manager'), key: 'nav.admin' }
  ];

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <img 
                src="/logo-ut.png" 
                alt="UT" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = 'U';
                }}
              />
              <span className="text-white font-bold text-base sm:text-lg hidden">U</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">UT Quest</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isExternal = item.path.startsWith('http');
              
              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium transition-all duration-200 hover:text-purple-400 hover:scale-105 ${
                      item.featured 
                        ? 'text-lg text-purple-400 font-bold bg-purple-400/10 px-3 py-1 rounded-lg border border-purple-400/20' 
                        : 'text-sm'
                    } ${
                      activeSection === item.key ? 'text-purple-400' : item.featured ? 'text-purple-400' : 'text-gray-300'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-medium transition-all duration-200 hover:text-purple-400 hover:scale-105 ${
                      item.featured 
                        ? 'text-lg text-purple-400 font-bold bg-purple-400/10 px-3 py-1 rounded-lg border border-purple-400/20' 
                        : 'text-sm'
                    } ${
                      activeSection === item.key ? 'text-purple-400' : item.featured ? 'text-purple-400' : 'text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <LanguageSelector
              isOpen={isLangMenuOpen}
              setIsOpen={setIsLangMenuOpen}
              currentLang={currentLang}
              handleLanguageChange={handleLanguageChange}
              getCurrentFlag={getCurrentFlag}
              langMenuRef={langMenuRef}
            />
            
            {/* Wallet Connection */}
            {isConnected && blockchainId ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 hover:scale-105 text-sm sm:text-base"
                >
                  <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">{blockchainId.slice(0, 6)}...{blockchainId.slice(-4)}</span>
                  <span className="sm:hidden">{blockchainId.slice(0, 4)}...</span>
                </button>
                
                <ProfileDropdown
                  isOpen={isProfileOpen}
                  blockchainId={blockchainId}
                  handleDisconnect={handleDisconnect}
                  setIsOpen={setIsProfileOpen}
                  profileDropdownRef={profileDropdownRef}
                />
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 hover:scale-105 text-sm sm:text-base"
              >
                <Wallet size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">{t('wallet.connect')}</span>
                <span className="sm:hidden">{t('wallet.connectShort')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-4 py-6 bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item) => {
                const isExternal = item.path.startsWith('http');
                
                if (isExternal) {
                  return (
                    <a
                      key={item.name}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className={`font-medium transition-all duration-200 hover:text-purple-400 hover:scale-105 text-center ${
                        item.featured 
                          ? 'text-xl text-purple-400 font-bold bg-purple-400/10 px-4 py-2 rounded-xl border border-purple-400/20 w-full max-w-xs' 
                          : 'text-lg'
                      } ${
                        activeSection === item.key ? 'text-purple-400' : item.featured ? 'text-purple-400' : 'text-gray-300'
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className={`font-medium transition-all duration-200 hover:text-purple-400 hover:scale-105 text-center ${
                        item.featured 
                          ? 'text-xl text-purple-400 font-bold bg-purple-400/10 px-4 py-2 rounded-xl border border-purple-400/20 w-full max-w-xs' 
                          : 'text-lg'
                      } ${
                        activeSection === item.key ? 'text-purple-400' : item.featured ? 'text-purple-400' : 'text-gray-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }
              })}
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <LanguageSelector
                  isOpen={isLangMenuOpen}
                  setIsOpen={setIsLangMenuOpen}
                  currentLang={currentLang}
                  handleLanguageChange={handleLanguageChange}
                  getCurrentFlag={getCurrentFlag}
                  langMenuRef={langMenuRef}
                />
                
                {/* Mobile Wallet Connection */}
                {isConnected && blockchainId ? (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProfileOpen(!isProfileOpen);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105 text-base"
                    >
                      <User size={18} />
                      <span>{blockchainId.slice(0, 6)}...{blockchainId.slice(-4)}</span>
                    </button>
                    
                    <ProfileDropdown
                      isOpen={isProfileOpen}
                      blockchainId={blockchainId}
                      handleDisconnect={handleDisconnect}
                      setIsOpen={setIsProfileOpen}
                      profileDropdownRef={mobileProfileDropdownRef}
                    />
                  </div>
                ) : (
                  <button 
                    onClick={handleConnect}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105 text-base"
                  >
                    <Wallet size={18} />
                    <span>{t('wallet.connect')}</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 