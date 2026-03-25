'use client';

import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations('Navbar');
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === '/';

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contactMe') },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-[100] pointer-events-none"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6">
          <div className="flex justify-between items-center pointer-events-auto">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-heading font-bold text-sm tracking-[0.2em] uppercase transition-colors" style={{ color: 'var(--color-text)' }}>
                LOÏC BOUVIL
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)', boxShadow: '0 0 20px var(--glow-color)' }} />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 link-underline"
                  style={{ color: pathname === link.href ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              {/* Lang Switch */}
              <div className="flex items-center rounded-full p-0.5 backdrop-blur-xl" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                {['fr', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLocale(lang)}
                    className="relative px-3 py-1 text-xs font-mono font-medium rounded-full transition-all duration-300 uppercase"
                    style={{ color: currentLocale === lang ? 'var(--color-pill-active-text)' : 'var(--color-text-tertiary)' }}
                  >
                    {currentLocale === lang && (
                      <motion.div
                        layoutId="langPill"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: 'var(--color-pill-active-bg)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{lang}</span>
                  </button>
                ))}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 rounded-full border flex flex-col items-center justify-center gap-[5px] transition-all duration-300"
                style={{ borderColor: 'var(--color-border)' }}
                aria-label="Menu"
              >
                <span className="w-4 h-[1.5px] transition-colors" style={{ backgroundColor: 'var(--color-text-secondary)' }} />
                <span className="w-3 h-[1.5px] transition-colors" style={{ backgroundColor: 'var(--color-text-secondary)' }} />
              </button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-2">
              {[
                { href: '/', label: t('home'), num: '00' },
                { href: '/about', label: t('about'), num: '01' },
                { href: '/projects', label: t('projects'), num: '02' },
                { href: '/contact', label: t('contactMe'), num: '03' },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.15, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 py-3"
                  >
                    <span className="font-mono text-xs" style={{ color: 'var(--color-accent)', opacity: 0.5 }}>
                      {link.num}
                    </span>
                    <span
                      className="font-heading font-bold text-3xl tracking-tight transition-colors duration-300"
                      style={{ color: pathname === link.href ? 'var(--color-accent)' : 'var(--color-text)' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <div className="p-6 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                loic.bouvil@gmail.com
              </span>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/loic-bouvil/" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                  LinkedIn
                </a>
                <a href="https://github.com/23Loic" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
