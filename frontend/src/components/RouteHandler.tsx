import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { getOriginalRoute } from '../utils/routeMapping';
import { Language } from '../types/translations.types';

function RouteHandler({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentLang } = useTranslation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langFromUrl = pathSegments[0];

    // Si c'est une langue valide
    if (langFromUrl === 'fr' || langFromUrl === 'en' || langFromUrl === 'de') {
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
      // Pas de préfixe de langue, rediriger vers /fr
      navigate('/fr' + location.pathname + location.search + location.hash, { replace: true });
    }
  }, [location, navigate, setCurrentLang]);

  return <>{children}</>;
}

export default RouteHandler; 