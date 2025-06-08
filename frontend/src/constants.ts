// Configuration de l'application
export const APP_CONFIG = {
  API_URL: import.meta.env.VITE_APP_API_URL || '/api',
  ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  DEFAULT_LANGUAGE: 'fr' as const,
  SUPPORTED_LANGUAGES: ['fr', 'en', 'de'] as const,
};

// Log de debug en développement
if (import.meta.env.DEV) {
  
}
