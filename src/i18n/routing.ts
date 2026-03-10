import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // La liste de vos langues
  locales: ['en', 'fr'],
  
  // La langue par défaut si aucune n'est détectée
  defaultLocale: 'fr'
});