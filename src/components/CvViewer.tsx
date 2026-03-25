'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

export default function CvViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Cv');

  const pdfPath = '/cv-loic-bouvil.pdf';
  const imagePath = '/cv-loic-bouvil.jpg';

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : 'unset'; }, [isOpen]);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-3 font-heading font-semibold text-xs tracking-[0.2em] uppercase transition-colors duration-300"
        style={{ color: 'var(--color-accent)' }}>
        <span className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{ borderColor: 'var(--color-accent)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </span>
        <span>{t('viewCv')}</span>
      </button>

      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 backdrop-blur-xl animate-fade-in"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 95%, transparent)' }}
            onClick={() => setIsOpen(false)} />

          <div className="relative w-full max-w-4xl h-[90vh] flex flex-col items-center animate-scale-in pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-3 mb-4 backdrop-blur-xl border px-5 py-2.5 rounded-full"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <span className="font-heading font-semibold text-sm mr-2 hidden sm:block" style={{ color: 'var(--color-text)' }}>{t('myCv')}</span>
              <a href={pdfPath} download="CV_Loic_Bouvil.pdf"
                className="flex items-center gap-2 px-4 py-1.5 text-xs font-heading font-bold tracking-wider uppercase rounded-full transition-colors duration-300"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-pill-active-text)' }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </a>
              <button onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full transition-colors duration-300"
                style={{ color: 'var(--color-text-secondary)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="pointer-events-auto flex-1 w-full flex justify-center overflow-hidden">
              <img src={imagePath} alt="CV Loïc Bouvil" className="h-full w-auto object-contain rounded-lg select-none" />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
