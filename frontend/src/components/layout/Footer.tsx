import React from 'react';
import { Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} Ultra Corporation. All rights reserved. All trademarks or product names are the property of their respective owners.
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <MessageCircle size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 