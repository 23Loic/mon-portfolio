'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';
import CvViewer from "@/components/CvViewer";

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  // Simulation d'envoi de formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // On simule un délai réseau de 2 secondes
    setTimeout(() => {
      setFormStatus('success');
      // Reset après 3 secondes
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  // Fonction pour copier l'email
  const copyEmail = () => {
    navigator.clipboard.writeText("loic.bouvil@gmail.com"); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-orange-500/30">
      <Navbar />

      {/* Fond avec Aura (Réutilisation de l'effet Home) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- COLONNE GAUCHE : INFOS --- */}
          <div className="space-y-12 animate-fadeInLeft">
            
            {/* Titre */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                {t.rich('title', {
                  br: () => <br />,
                  span: (chunks) => <span className="text-orange-500">{chunks}</span>
                })}
              </h1>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                {t('subtitle')}
              </p>
              <div className="mt-8">
                <CvViewer />
              </div>
            </div>
            

            {/* Carte Email Interactive */}
            <div 
              onClick={copyEmail}
              className="group cursor-pointer p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium tracking-wider uppercase mb-1">{t('emailLabel')}</p>
                  <p className="text-xl font-semibold text-white">loic.bouvil@gmail.com</p>
                </div>
                
                {/* Indicateur "Copié" */}
                <div className={`absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 transition-all duration-300 ${copied ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                  {t('copied')}
                </div>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">{t('socials')}</h3>
              <div className="flex gap-4">
                {[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/loic-bouvil/', icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /> }, // Ajoutez le path complet
                  { name: 'GitHub', url: 'https://github.com/23Loic', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> }
                ].map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      {social.icon}
                      {social.name === 'LinkedIn' && <rect x="2" y="9" width="4" height="12" />}
                      {social.name === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* --- COLONNE DROITE : FORMULAIRE --- */}
          <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl animate-fadeInRight">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input Nom */}
              <div className="group">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                  {t('form.name')}
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 placeholder-transparent"
                />
              </div>

              {/* Input Email */}
              <div className="group">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                  {t('form.email')}
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300"
                />
              </div>

              {/* Textarea Message */}
              <div className="group">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-orange-500 transition-colors">
                  {t('form.message')}
                </label>
                <textarea 
                  rows={4}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 resize-none"
                />
              </div>

              {/* Bouton Envoyer */}
              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative
                  ${formStatus === 'success' ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-orange-500 hover:text-white'}
                `}
              >
                {formStatus === 'idle' && (
                  <>
                    <span>{t('form.send')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
                
                {formStatus === 'sending' && (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('form.sending')}
                  </>
                )}

                {formStatus === 'success' && (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {t('form.success')}
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; animation-delay: 0.2s; opacity: 0; }
        
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: .1; }
        }
      `}</style>
    </main>
  );
}