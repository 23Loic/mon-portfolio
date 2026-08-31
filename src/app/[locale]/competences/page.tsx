'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { competences, getProject, type CompetenceId } from '@/data/portfolio';

type Evidence = { slug: string; text: string };

const statusColor: Record<string, string> = {
  acquired: 'var(--color-accent)',
  consolidating: 'var(--color-text-secondary)',
  developing: 'var(--color-text-tertiary)',
};

export default function CompetencesPage() {
  const t = useTranslations('Competences');
  const tp = useTranslations('Projects');
  const [active, setActive] = useState<CompetenceId>('realiser');

  const current = competences.find((c) => c.id === active)!;
  const evidence = t.raw(`items.${active}.evidence`) as Evidence[];

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[520px] h-[520px] absolute top-[5%] right-[0%] animate-float-slow" />
        <div className="orb orb-secondary w-[380px] h-[380px] absolute bottom-[10%] left-[-5%] animate-float-slower" />
      </div>

      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-6 md:px-10">

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }}
          className="mb-14"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--color-accent)' }}>
            {t('kicker')}
          </span>
          <h1 className="heading-lg font-heading mb-4">
            {t('heading')} <span className="text-gradient">{t('headingAccent')}</span>
          </h1>
          <p className="font-body text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          {/* Colonne de navigation */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 flex flex-col gap-1">
              {competences.map((c, i) => {
                const isActive = c.id === active;
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className="text-left rounded-xl px-4 py-4 border transition-all duration-300"
                    style={{
                      borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                      backgroundColor: isActive ? 'var(--color-card-hover)' : 'transparent',
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-[10px] tracking-[0.2em]"
                        style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                      >
                        {c.code}
                      </span>
                      <span
                        className="font-heading font-semibold text-sm leading-snug"
                        style={{ color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)' }}
                      >
                        {t(`items.${c.id}.name`)}
                      </span>
                    </div>
                    <span
                      className="mt-2 inline-block font-mono text-[9px] tracking-[0.2em] uppercase"
                      style={{ color: statusColor[c.status] }}
                    >
                      ● {t(`status.${c.status}`)}
                    </span>
                  </motion.button>
                );
              })}

              <p className="font-body text-xs mt-5 leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>
                {t('disclaimer')}
              </p>
            </div>
          </div>

          {/* Détail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as const }}
                className="space-y-10"
              >
                {/* Énoncé */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent)' }}>
                    {current.code} · {t('levelLabel')}
                  </span>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mt-3 mb-4" style={{ color: 'var(--color-text)' }}>
                    {t(`items.${active}.statement`)}
                  </h2>
                  <p className="font-body text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {t(`items.${active}.covers`)}
                  </p>
                </div>

                {/* Preuves */}
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--color-text-tertiary)' }}>
                    {t('evidenceLabel')}
                  </h3>
                  <div className="space-y-3">
                    {evidence.map((e, i) => {
                      const project = getProject(e.slug);
                      return (
                        <Link
                          key={e.slug + i}
                          href={`/projects/${e.slug}`}
                          className="block rounded-xl p-5 border transition-all duration-300 group"
                          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <span className="font-heading font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                              {tp(`items.${e.slug}.title`)}
                            </span>
                            <span
                              className="font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              {t('seeProject')} →
                            </span>
                          </div>
                          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            {e.text}
                          </p>
                          {project?.number && (
                            <span className="font-mono text-[9px] tracking-[0.2em] mt-3 inline-block" style={{ color: 'var(--color-text-tertiary)' }}>
                              {project.number}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Auto-évaluation */}
                <div className="rounded-xl p-6 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card-hover)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                      {t('selfLabel')}
                    </h3>
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-full border"
                      style={{ color: statusColor[current.status], borderColor: 'var(--color-border)' }}
                    >
                      {t(`status.${current.status}`)}
                    </span>
                  </div>
                  <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {t(`items.${active}.self`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
