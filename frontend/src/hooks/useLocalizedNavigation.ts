import { useTranslation } from '../contexts/TranslationContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getLocalizedRoute } from '../utils/routeMapping';

export const useLocalizedNavigation = () => {
  const { currentLang: language } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Tracker la page actuelle pour la navigation
  useEffect(() => {
    const currentPath = location.pathname;
    const previousPage = sessionStorage.getItem('currentPage');
    
    if (previousPage && previousPage !== currentPath) {
      sessionStorage.setItem('previousPage', previousPage);
    }
    
    sessionStorage.setItem('currentPage', currentPath);
  }, [location.pathname]);

  const getLocalizedUrl = (path: string): string => {
    // Vérifications de sécurité
    if (!path) {
      return language === 'fr' ? '/' : `/${language}`;
    }
    
    if (!language) {
      return path;
    }
    
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // If path is empty (home page), return language prefix
    if (!cleanPath) {
      return language === 'fr' ? '/' : `/${language}`;
    }
    
    try {
      // Use the route mapping to translate the path
      const localizedRoute = getLocalizedRoute(path, language);
      
      // Add language prefix
      const finalUrl = language === 'fr' ? localizedRoute : `/${language}${localizedRoute}`;
      
      return finalUrl;
    } catch (error) {
      // Fallback: retourner le path original avec le préfixe de langue
      return language === 'fr' ? path : `/${language}${path}`;
    }
  };

  const navigateWithTracking = (path: string) => {
    const localizedPath = getLocalizedUrl(path);
    navigate(localizedPath);
  };

  return { 
    getLocalizedUrl,
    navigateWithTracking,
    localizedNavigate: navigateWithTracking
  };
}; 