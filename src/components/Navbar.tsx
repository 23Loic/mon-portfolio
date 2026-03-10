// Fichier: src/components/navbar.tsx
'use client';

import { usePathname, useRouter } from '@/i18n/navigation'; // <-- IMPORTANT: Utiliser notre routeur custom
import { Link } from '@/i18n/navigation'; // <-- IMPORTANT: Utiliser notre Link custom
import { useTranslations, useLocale } from 'next-intl';

export default function Navbar() {
  // On récupère le chemin actuel pour savoir si on doit afficher le bouton retour
  const pathname = usePathname();
  const router = useRouter();
  
  // On récupère la locale actuelle (fr ou en) pour colorer le bon bouton
  const currentLocale = useLocale();

  // On initialise les traductions
  const t = useTranslations('Navbar');

  // Logique du bouton retour (inchangée)
  // Note: pathname avec notre router custom n'inclut pas le préfixe /fr ou /en, c'est plus propre
  const showReturnButton = pathname !== '/' && pathname !== '/menu';

  // Fonction pour changer de langue
  const switchLocale = (newLocale: string) => {
    // On remplace l'URL actuelle par la même URL mais dans la nouvelle langue
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 p-8 transition-colors duration-500 pointer-events-none">
      
      <div className="container mx-auto flex justify-between items-center pointer-events-auto">
        
        {/* --- PARTIE GAUCHE : LOGO --- */}
        <Link href="/" className="group flex items-center gap-4 cursor-pointer">
          <div className="text-xl font-bold tracking-wider text-white transition-colors duration-300 group-hover:text-gray-200">
            LOÏC BOUVIL
          </div>
          <div className="h-1 w-1 rounded-full bg-orange-500 transition-transform duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
          <div className="text-sm font-medium tracking-[0.2em] text-orange-400 uppercase transition-colors duration-300 group-hover:text-orange-300">
            {t('portfolio')} {/* "PORTFOLIO" traduit */}
          </div>
        </Link>

        {/* --- PARTIE DROITE --- */}
        <div className="flex items-center gap-6">
          
          {/* BOUTON CONTACT */}
          <Link href="/contact">
            <button className="group relative px-6 py-2 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              {/* Fond Glassmorphism */}
              <div className="absolute inset-0 bg-white/5 border border-white/20 rounded-full transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500"></div>
              
              {/* Conteneur Texte + Icône */}
              <span className="relative z-10 text-sm font-semibold text-gray-200 tracking-wide transition-colors duration-300 group-hover:text-white flex items-center justify-center">
                
                <span>{t('contactMe')}</span> {/* "Me Contacter" traduit */}
                
                {/* Icône animée */}
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 flex items-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>

              </span>
            </button>
          </Link>

          {/* SÉPARATEUR */}
          <div className="h-4 w-[1px] bg-white/20"></div>

          {/* SWITCH LANGUE FONCTIONNEL */}
          <div className="flex items-center border border-white/20 backdrop-blur-md rounded-full p-1 bg-black/20">
            
            {/* Bouton FR */}
            <button 
              onClick={() => switchLocale('fr')}
              className={`px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                currentLocale === 'fr' 
                  ? 'text-black bg-white shadow-sm hover:scale-105' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              FR
            </button>
            
            {/* Bouton EN */}
            <button 
              onClick={() => switchLocale('en')}
              className={`px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                currentLocale === 'en' 
                  ? 'text-black bg-white shadow-sm hover:scale-105' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>

          </div>

          {/* BOUTON RETOUR */}
          <div className={`${showReturnButton ? 'opacity-100 visible' : 'opacity-0 invisible w-0'} transition-all duration-300`}>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-md ml-2"
              aria-label={t('back')} // Accessibilité
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}