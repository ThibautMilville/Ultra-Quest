import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LanguageRedirectProps {
  targetLang?: string;
}

function LanguageRedirect({ targetLang = 'fr' }: LanguageRedirectProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Rediriger vers l'URL avec le préfixe de langue
    const newPath = `/${targetLang}${location.pathname}${location.search}${location.hash}`;
    navigate(newPath, { replace: true });
  }, [navigate, location, targetLang]);

  return null; // Ce composant ne rend rien
}

export default LanguageRedirect; 