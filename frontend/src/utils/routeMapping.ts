import { Language } from '../types/translations.types';

// Mapping des routes par langue
export const routeMapping: Record<Language, Record<string, string>> = {
  fr: {
    'category': 'categorie',
    'ashes': 'ashes',
    'ultra': 'ultra', 
    'champion': 'champion',
    'admin': 'admin',
    'quest-manager': 'gestion-quetes',
    'category-list': 'liste-categories',
    'quest-editor': 'editeur-quetes',
    'quest-creator': 'createur-quetes',
    'contact': 'contact',
    'social': 'social',
    'game': 'jeu',
    'quest': 'quete'
  },
  en: {
    'category': 'category',
    'ashes': 'ashes',
    'ultra': 'ultra',
    'champion': 'champion', 
    'admin': 'admin',
    'quest-manager': 'quest-manager',
    'category-list': 'category-list',
    'quest-editor': 'quest-editor',
    'quest-creator': 'quest-creator',
    'contact': 'contact',
    'social': 'social',
    'game': 'game',
    'quest': 'quest'
  },
  de: {
    'category': 'kategorie',
    'ashes': 'ashes',
    'ultra': 'ultra',
    'champion': 'champion',
    'admin': 'admin',
    'quest-manager': 'quest-manager',
    'category-list': 'kategorie-liste',
    'quest-editor': 'quest-editor',
    'quest-creator': 'quest-ersteller',
    'contact': 'kontakt',
    'social': 'sozial',
    'game': 'spiel',
    'quest': 'quest'
  }
};

// Fonction pour obtenir la route traduite
export function getLocalizedRoute(route: string, lang: Language): string {
  // Si la route est vide ou juste "/", retourner "/"
  if (!route || route === '/') {
    return '';
  }
  
  const segments = route.split('/').filter(Boolean);
  const translatedSegments = segments.map(segment => {
    // Si le segment contient un paramètre (commence par :), on le garde tel quel
    if (segment.startsWith(':')) {
      return segment;
    }
    // Sinon on le traduit
    return routeMapping[lang][segment] || segment;
  });
  
  return '/' + translatedSegments.join('/');
}

// Fonction pour obtenir la route originale depuis une route traduite
export function getOriginalRoute(localizedRoute: string, lang: Language): string {
  const segments = localizedRoute.split('/').filter(Boolean);
  const reverseMapping = Object.fromEntries(
    Object.entries(routeMapping[lang]).map(([key, value]) => [value, key])
  );
  
  const originalSegments = segments.map(segment => {
    return reverseMapping[segment] || segment;
  });
  
  return '/' + originalSegments.join('/');
} 