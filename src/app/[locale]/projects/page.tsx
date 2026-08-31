'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { projects, competences, type ProjectCategory } from '@/data/portfolio';

export default function ProjectsPage() {
  const t = useTranslations('Projects');
  const tc = useTranslations('Competences');
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = projects.filter((p) => filter === 'all' || p.category === filter);

  const filters = [
    { id: 'all' as const, label: t('filters.all') },
    { id: 'web' as const, label: t('filters.web') },
    { id: 'data' as const, label: t('filters.data') },
    { id: 'pro' as const, label: t('filters.pro') },
  ];

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[600px] h-[600px] absolute top-[-10%] right-[20%] animate-float-slow" />
      </div>

      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }} className="mb-16">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--color-accent)' }}>
            Portfolio
          </span>
          <h1 className="heading-lg font-heading mb-4">
            {t('heading')} <span className="text-gradient">{t('headingAccent')}</span>
          </h1>
          <p className="font-body text-lg max-w-lg leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            {t('subtitle')}
          </p>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className="px-5 py-2 rounded-full text-xs font-heading font-semibold tracking-[0.15em] uppercase border transition-all duration-300"
                style={{
                  backgroundColor: filter === f.id ? 'var(--color-accent)' : 'transparent',
                  borderColor: filter === f.id ? 'var(--color-accent)' : 'var(--color-border)',
                  color: filter === f.id ? 'var(--color-pill-active-text)' : 'var(--color-text-tertiary)',
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div layout key={project.slug}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredId(project.slug)} onMouseLeave={() => setHoveredId(null)}
                className="group relative">

                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="grid grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-10 -mx-4 px-4 rounded-xl transition-all duration-500"
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      backgroundColor: hoveredId === project.slug ? 'var(--color-card-hover)' : 'transparent',
                    }}>
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-heading font-bold text-3xl md:text-4xl transition-colors duration-500"
                        style={{ color: hoveredId === project.slug ? 'var(--color-accent)' : 'var(--color-border)' }}>
                        {project.number}
                      </span>
                    </div>

                    <div className="col-span-10 md:col-span-4">
                      <h3 className="font-heading font-bold text-lg md:text-xl transition-colors duration-300"
                        style={{ color: hoveredId === project.slug ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>
                        {t(`items.${project.slug}.title`)}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.competences.map((cid) => (
                          <span key={cid} className="font-mono text-[9px] tracking-[0.15em] px-1.5 py-0.5 rounded border"
                            style={{ color: 'var(--color-text-tertiary)', borderColor: 'var(--color-border)' }}>
                            {competences.find((c) => c.id === cid)?.code}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:block md:col-span-5">
                      <p className="font-body text-sm leading-relaxed transition-colors duration-300"
                        style={{ color: hoveredId === project.slug ? 'var(--color-text-secondary)' : 'var(--color-text-tertiary)' }}>
                        {t(`items.${project.slug}.description`)}
                      </p>
                    </div>

                    <div className="hidden md:flex md:col-span-2 justify-end">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
                        style={{ color: 'var(--color-accent)', opacity: hoveredId === project.slug ? 1 : 0 }}>
                        {tc('seeProject')}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>

                <AnimatePresence>
                  {hoveredId === project.slug && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }} className="overflow-hidden -mx-4 px-4">
                      <div className="flex flex-wrap gap-2 pb-6 pl-0 md:pl-[calc(8.333%+2rem)]">
                        {t(`items.${project.slug}.tags`).split(', ').map((tag: string) => (
                          <span key={tag} className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-full t-tag border">
                            {tag}
                          </span>
                        ))}
                        <p className="md:hidden w-full font-body text-sm mt-3 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                          {t(`items.${project.slug}.description`)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
