// Fichier: src/app/[locale]/page.tsx
'use client';

import { useEffect, useState } from 'react';
// IMPORTANT: On importe Navbar avec un chemin relatif ou l'alias s'il est configuré
import Navbar from "@/components/Navbar"; 
// IMPORTANT: On utilise VOTRE routeur i18n
import { useRouter } from '@/i18n/navigation'; 
// IMPORTANT: Pour les traductions
import { useTranslations } from 'next-intl';

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Hook de traduction
  const t = useTranslations('Home');

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnterClick = () => {
    // Le routeur gère automatiquement le préfixe (/fr/menu ou /en/menu)
    router.push('/menu');
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white overflow-hidden relative">
      {/* --- FOND ET AURA (Inchangés) --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-300 ease-out"
        style={{ 
          // Assurez-vous que l'image est bien dans public/2.jpg
          backgroundImage: "url('/2.jpg')",
          transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px) scale(1.05)`
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className={`absolute left-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none z-10 animate-pulse-slow transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`} />

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="relative z-20 h-screen flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-8 flex-1 flex items-center">
          <div className="max-w-2xl pl-4 border-l-2 border-orange-500/30"> 
            
            {/* NOUVEAU : Localisation */}
            <div className={`flex items-center gap-2 text-gray-400 mb-4 transition-all duration-700 delay-100 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
              </svg>
              <span className="text-sm uppercase tracking-wider font-medium">{t('location')}</span>
            </div>

            {/* TITRE RÉDUIT */}
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-all duration-700 delay-200 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {t.rich('title', {
                br: () => <br />,
                span: (chunks) => <span className="text-gray-300">{chunks}</span>
              })}
            </h1>
            
            {/* Description */}
            <p className={`text-lg text-gray-300 max-w-lg leading-relaxed mb-10 transition-all duration-700 delay-300 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {t('description')}
            </p>
            
            {/* ANCIEN BOUTON AVEC NOUVELLES COULEURS ORANGE */}
            <div className={`transition-all duration-700 delay-500 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <button 
                onClick={handleEnterClick}
                className="group relative px-8 py-4 border-2 border-orange-400 text-orange-400 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 animate-pulse-subtle-orange"
              >
                {/* Le texte devient blanc au survol */}
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  {t('enterButton')}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Le fond qui se remplit est maintenant orange */}
                <span className="absolute inset-0 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.5; }
          50% { transform: translateY(-50%) scale(1.1); opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        @keyframes pulseShadowOrange {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); } 
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6); }
        }
        
        .animate-pulse-subtle-orange {
          animation: pulseShadowOrange 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}