import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { Language } from '../types/translations.types';
import { getLocalizedRoute, getOriginalRoute } from '../utils/routeMapping';

export function useLocalizedNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentLang } = useTranslation();

  // Détecter la langue actuelle depuis l'URL
  const getCurrentLang = (): Language => {
    const pathSegments = location.pathname.split('/');
    const langFromUrl = pathSegments[1];
    if (langFromUrl === 'fr' || langFromUrl === 'en' || langFromUrl === 'de') {
      return langFromUrl as Language;
    }
    return 'fr'; // langue par défaut
  };

  const currentLang = getCurrentLang();

  // Fonction pour naviguer avec le préfixe de langue actuel
  const localizedNavigate = (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const translatedPath = getLocalizedRoute(cleanPath, currentLang);
    const localizedPath = `/${currentLang}${translatedPath}`;
    navigate(localizedPath);
  };

  // Fonction pour changer de langue en gardant la même page
  const changeLanguage = (newLang: Language) => {
    setCurrentLang(newLang);
    
    // Obtenir le chemin actuel sans le préfixe de langue
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLangFromUrl = pathSegments[0];
    
    let localizedPath = '';
    if (currentLangFromUrl === 'fr' || currentLangFromUrl === 'en' || currentLangFromUrl === 'de') {
      // Enlever le préfixe de langue actuel
      localizedPath = '/' + pathSegments.slice(1).join('/');
    } else {
      // Pas de préfixe de langue, garder le chemin tel quel
      localizedPath = location.pathname;-1
    }
    
    // D'abord convertir le chemin localisé vers le chemin original
    const originalPath = getOriginalRoute(localizedPath, currentLang);
    
    // Puis traduire le chemin original vers la nouvelle langue
    const translatedPath = getLocalizedRoute(originalPath, newLang);
    const newPath = `/${newLang}${translatedPath}`;
    navigate(newPath);
  };

  // Fonction pour obtenir l'URL localisée
  const getLocalizedUrl = (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const translatedPath = getLocalizedRoute(cleanPath, currentLang);
    return `/${currentLang}${translatedPath}`;
  };

  return {
    localizedNavigate,
    changeLanguage,
    getLocalizedUrl,
    currentLang
  };
} 