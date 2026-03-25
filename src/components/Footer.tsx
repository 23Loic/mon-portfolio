'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import CvViewer from './CvViewer';

export default function Footer() {
  const t = useTranslations('Navbar');

  return (
    <footer className="relative z-10" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left - Logo + copyright */}
          <div className="flex flex-col gap-2">
            <span className="font-heading font-bold text-sm tracking-[0.2em] uppercase" style={{ color: 'var(--color-text)' }}>
              LOÏC BOUVIL
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
              © {new Date().getFullYear()} — Bondy, France
            </span>
          </div>

          {/* Center - Nav links */}
          <div className="flex items-center gap-6">
            {[
              { href: '/about', label: t('about') },
              { href: '/projects', label: t('projects') },
              { href: '/contact', label: t('contactMe') },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 link-underline"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right - Socials + CV */}
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/in/loic-bouvil/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 link-underline"
              style={{ color: 'var(--color-text-tertiary)' }}>
              LinkedIn
            </a>
            <a href="https://github.com/23Loic" target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 link-underline"
              style={{ color: 'var(--color-text-tertiary)' }}>
              GitHub
            </a>
            <CvViewer />
          </div>

        </div>
      </div>
    </footer>
  );
}
