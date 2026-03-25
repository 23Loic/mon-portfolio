'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const t = useTranslations('Home');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setMousePos({
        x: (e.clientX / clientWidth - 0.5) * 2,
        y: (e.clientY / clientHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] as const } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, delay: 1.2 } }
  };

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden flex flex-col pt-24">
      {/* Orbs */}
      <div
        className="orb orb-primary w-[600px] h-[600px] absolute top-[-10%] left-[-5%] animate-float-slow"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
      <div
        className="orb orb-secondary w-[500px] h-[500px] absolute bottom-[-15%] right-[-10%] animate-float-slower"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] as const }}
        className="absolute top-1/2 left-0 w-full h-px origin-left"
        style={{ background: 'linear-gradient(to right, transparent, var(--color-border), transparent)' }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 md:space-y-8">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
              {t('location')}
            </span>
          </motion.div>

          <div>
            <motion.h1 variants={fadeUp} className="heading-xl font-heading" style={{ color: 'var(--color-text)' }}>
              LOÏC
            </motion.h1>
            <motion.h1 variants={fadeUp} className="heading-xl font-heading text-gradient">
              BOUVIL
            </motion.h1>
          </div>

          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {t('description')}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              onClick={() => router.push('/projects')}
              className="group relative inline-flex items-center gap-4 mt-4"
            >
              <span
                className="relative w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500"
                style={{
                  borderColor: 'var(--color-accent)',
                  boxShadow: `0 0 20px var(--glow-color)`,
                }}
              >
                <svg
                  className="w-5 h-5 transition-colors duration-300 group-hover:translate-x-0.5"
                  style={{ color: 'var(--color-accent)' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="font-heading font-semibold text-sm tracking-[0.25em] uppercase transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
                {t('enterButton')}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative z-10 px-6 md:px-10 pb-8 max-w-[1400px] mx-auto w-full">
        <div className="flex justify-between items-center pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
            © {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
            {t('scrollHint')}
          </span>
        </div>
      </motion.div>
    </main>
  );
}
