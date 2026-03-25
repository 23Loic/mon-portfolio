'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'about', href: '/about', number: '01' },
  { id: 'projects', href: '/projects', number: '02' },
];

export default function Menu() {
  const t = useTranslations('Menu');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {menuItems.map((item) => {
        const isHovered = hoveredId === item.id;
        const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

        return (
          <Link
            href={item.href}
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`group relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? 'flex-[1.8]' : isOtherHovered ? 'flex-[0.6]' : 'flex-1'
            }`}
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: item.id === 'about'
                  ? 'linear-gradient(to bottom right, var(--menu-gradient-from), transparent)'
                  : 'linear-gradient(to bottom left, var(--menu-gradient-from), transparent)',
              }}
            />

            {/* Center border */}
            <div
              className={`absolute ${item.id === 'about' ? 'right-0' : 'left-0'} top-0 bottom-0 w-px`}
              style={{ background: 'var(--color-border)' }}
            />

            {/* Giant number */}
            <div
              className={`absolute font-heading font-bold text-[20vw] md:text-[15vw] leading-none transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${item.id === 'about' ? 'top-8 left-8' : 'bottom-8 right-8'}`}
              style={{ color: isHovered ? 'var(--color-border)' : 'var(--color-card)' }}
            >
              {item.number}
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center z-10">
              <motion.div
                className={`h-px mb-6 transition-all duration-500 ${isHovered ? 'w-16 opacity-100' : 'w-8 opacity-40'}`}
                style={{ backgroundColor: 'var(--color-accent)' }}
              />

              <span
                className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4 transition-all duration-500"
                style={{ color: isHovered ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
              >
                {t(`${item.id}.subtitle`)}
              </span>

              <h2
                className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight transition-all duration-500"
                style={{ color: isHovered ? 'var(--color-text)' : 'var(--color-text-secondary)' }}
              >
                {t(`${item.id}.title`)}
              </h2>

              <div className={`max-w-sm mt-6 overflow-hidden transition-all duration-700 ${
                isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {t(`${item.id}.description`)}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 font-heading font-semibold text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent)' }}>
                  {t('explorer')}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
