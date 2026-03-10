import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  // On attend que la locale soit résolue (car c'est une Promise maintenant)
  let locale = await requestLocale;

  // Si pas de locale ou locale invalide, on renvoie une 404
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale, // TypeScript sait maintenant que c'est une string valide
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});