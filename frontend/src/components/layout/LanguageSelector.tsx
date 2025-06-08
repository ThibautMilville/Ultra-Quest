import React from 'react'
import LanguageButton from './LanguageButton'
import { LanguageSelectorProps } from '../../types/header.types'

const LanguageSelector = ({
  isOpen, 
  setIsOpen, 
  currentLang, 
  handleLanguageChange, 
  getCurrentFlag, 
  langMenuRef
}: LanguageSelectorProps) => (
  <div className='relative' ref={langMenuRef}>
    <button
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(!isOpen)
      }}
      className='flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 rounded-lg p-2'
      aria-label='Select language'
      aria-expanded={isOpen}
      aria-controls='language-menu'
      type='button'>
      {getCurrentFlag()}
    </button>
    {isOpen && (
      <div 
        id='language-menu' 
        className='absolute mt-2 w-12 bg-black/90 backdrop-blur-sm rounded-xl shadow-lg py-2 border border-gray-700 z-50' 
        role='menu' 
        aria-orientation='vertical' 
        aria-labelledby='language-menu' 
        style={{transform: 'translateX(50%)', right: '50%'}}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {['en', 'fr', 'de'].map(lang => (
          <LanguageButton 
            key={lang} 
            lang={lang as 'en' | 'fr' | 'de'} 
            isActive={currentLang === lang} 
            onClick={handleLanguageChange} 
          />
        ))}
      </div>
    )}
  </div>
)

export default LanguageSelector 