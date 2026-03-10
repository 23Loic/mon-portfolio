'use client';

import { Link } from '@/i18n/navigation'; // <-- Utilisation du Link i18n
import { useTranslations } from 'next-intl';

// On ne garde que les données structurelles (images, liens, ids)
const menuItems = [
  {
    id: 'about',
    imageSrc: "/6.jpg", 
    href: "/about"
  },
  {
    id: 'projects',
    imageSrc: "/5.jpg",
    href: "/projets"
  }
];

export default function Menu() {
  const t = useTranslations('Menu');

  return (
    <section className="h-[calc(100vh-80px)] md:h-screen w-full flex flex-col md:flex-row bg-black animate-fadeIn">
      {menuItems.map((item) => (
        <Link 
          href={item.href} 
          key={item.id}
          className="group relative flex-1 h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-0 bg-zinc-900"
        >
          {/* 1. L'IMAGE DE FOND */}
          {item.imageSrc && (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${item.imageSrc}')` }}
            />
          )}

          {/* 2. LE FILTRE SOMBRE */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/80 transition-colors duration-500" />

          {/* 3. LE CONTENU */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
            
            {/* Sous-titre (traduit via l'ID) */}
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-2 opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              {t(`${item.id}.subtitle`)}
            </span>

            {/* Titre Principal (traduit via l'ID) */}
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-4 transition-transform duration-500 group-hover:-translate-y-2">
              {t(`${item.id}.title`)}
            </h2>

            {/* Description avec effet de déroulement */}
            <div className="max-w-md overflow-hidden grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
              <div className="min-h-0">
                <div className="pt-4 border-t border-white/20">
                  <p className="text-gray-300 text-lg leading-relaxed font-light">
                    {t(`${item.id}.description`)}
                  </p>
                  <div className="mt-6 inline-flex items-center text-white font-semibold group/btn">
                    {t('explorer')}
                    <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}