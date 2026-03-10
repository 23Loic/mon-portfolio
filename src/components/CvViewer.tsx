'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CvViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- CONFIGURATION DES CHEMINS ---
  const pdfPath = "/cv-loic-bouvil.pdf"; // Pour le téléchargement
  const imagePath = "/cv-loic-bouvil.jpg"; // Pour l'affichage (Exportez votre CV en JPG)

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* BOUTON D'OUVERTURE */}
      <button 
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-bold transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>Voir mon CV</span>
      </button>

      {/* MODALE PORTAL */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          {/* OVERLAY SOMBRE */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* CONTENEUR */}
          <div className="relative w-full max-w-5xl h-[90vh] flex flex-col items-center animate-zoomIn pointer-events-none">
            
            {/* EN-TÊTE FLOTTANT (Z-Index élevé pour être cliquable) */}
            <div className="pointer-events-auto flex items-center gap-3 mb-4 bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-2xl">
              
              <span className="text-white font-semibold mr-2 hidden sm:block">Mon CV</span>

              {/* Bouton Télécharger (Télécharge le PDF, pas l'image !) */}
              <a 
                href={pdfPath}
                download="CV_Loic_Bouvil.pdf"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span>Télécharger PDF</span>
              </a>

              {/* Bouton Fermer */}
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* IMAGE (Cliquable pour fermer si on veut, ou juste affichage) */}
            <div className="pointer-events-auto flex-1 w-full flex justify-center overflow-hidden">
              <img 
                src={imagePath} 
                alt="CV Preview" 
                className="h-full w-auto object-contain rounded-lg shadow-2xl select-none"
                // object-contain : assure que tout le CV est visible sans être coupé
              />
            </div>

          </div>
        </div>,
        document.body
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoomIn { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </>
  );
}