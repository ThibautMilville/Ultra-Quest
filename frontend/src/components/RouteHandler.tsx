import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { getOriginalRoute } from '../utils/routeMapping';
import { Language } from '../types/translations.types';
import { APP_CONFIG } from '../constants';

function RouteHandler({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentLang } = useTranslation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    try {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const langFromUrl = pathSegments[0];

      // Si c'est une langue valide
      if (APP_CONFIG.SUPPORTED_LANGUAGES.includes(langFromUrl as any)) {
        setCurrentLang(langFromUrl as Language);
        
        // Vérifier si la route traduite existe et correspond à la langue
        const restOfPath = '/' + pathSegments.slice(1).join('/');
        const originalRoute = getOriginalRoute(restOfPath, langFromUrl as Language);
        
        // Si la route traduite ne correspond pas à la langue, rediriger
        if (restOfPath !== originalRoute) {
          // La route est déjà traduite, pas besoin de rediriger
          return;
        }
      } else {
        // Pas de préfixe de langue, rediriger vers la langue par défaut
        const newPath = `/${APP_CONFIG.DEFAULT_LANGUAGE}${location.pathname}${location.search}${location.hash}`;
        navigate(newPath, { replace: true });
      }
    } catch (error) {
      console.error('Erreur dans RouteHandler:', error);
      // En cas d'erreur, rediriger vers la page d'accueil
      navigate(`/${APP_CONFIG.DEFAULT_LANGUAGE}`, { replace: true });
    }
  }, [location, navigate, setCurrentLang]);

  return <>{children}</>;
}

export default RouteHandler; 