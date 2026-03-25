'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import CvViewer from '@/components/CvViewer';

const allSkills = [
  'Python', 'Java', 'SQL', 'React', 'Next.js', 'Angular', 'TypeScript',
  'Neo4j', 'PostGIS', 'Docker', 'Git', 'Linux', 'Oracle', 'PL/SQL',
  'Power BI', 'Pandas', 'C++', 'PHP', 'Agno', 'pgvector', 'Bash',
  'HTML/CSS', 'JavaScript', 'Web Scraping', 'Excel', 'NoSQL', 'RAG',
];

export default function AboutPage() {
  const t = useTranslations('About');
  const [activeTab, setActiveTab] = useState<'bio' | 'skills' | 'timeline'>('bio');

  const skillCategories = ['data', 'dev', 'tools', 'systems', 'ai'] as const;
  const timelineKeys = ['t1', 't2', 't3', 't4', 't5'] as const;

  const tabs = [
    { id: 'bio' as const, label: t('tabs.bio') },
    { id: 'skills' as const, label: t('tabs.skills') },
    { id: 'timeline' as const, label: t('tabs.timeline') },
  ];

  const contentVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] absolute top-[10%] right-[-5%] animate-float-slow" />
        <div className="orb orb-secondary w-[400px] h-[400px] absolute bottom-[5%] left-[-5%] animate-float-slower" />
      </div>

      <div className="relative z-10 pt-32 pb-20">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}>
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--color-accent)' }}>
              {t('tabs.bio')}
            </span>
            <h1 className="heading-lg font-heading mb-4">
              {t('heading')} <span className="text-gradient">{t('headingAccent')}</span>
            </h1>
            <p className="font-body text-lg max-w-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {t('subtitle')}
            </p>
            <CvViewer />
          </motion.div>
        </div>

        {/* Marquee */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="py-5 mb-16" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...allSkills, ...allSkills].map((skill, i) => (
                <span key={i} className="inline-flex items-center gap-6 mx-4">
                  <span className="font-heading font-semibold text-sm tracking-wide cursor-default whitespace-nowrap transition-colors duration-300"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-tertiary)')}>
                    {skill}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-accent)', opacity: 0.3 }}>✦</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-1 mb-12 p-1 rounded-full w-fit" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-2.5 rounded-full text-xs font-heading font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                style={{ color: activeTab === tab.id ? 'var(--color-pill-active-text)' : 'var(--color-text-tertiary)' }}>
                {activeTab === tab.id && (
                  <motion.div layoutId="activeAboutTab" className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'var(--color-pill-active-bg)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          <div className="min-h-[450px]">
            <AnimatePresence mode="wait">

              {/* BIO */}
              {activeTab === 'bio' && (
                <motion.div key="bio" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-7 space-y-6">
                      <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2" style={{ color: 'var(--color-text)' }}>
                        {t('bio.title')}
                      </h2>
                      <div className="space-y-5 font-body text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        <p>{t('bio.p1')}</p>
                        <p>{t('bio.p2')}</p>
                        <p style={{ color: 'var(--color-text)', fontWeight: 500 }}>{t('bio.p3')}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col gap-6">
                      {[
                        { label: 'Formation', value: 'BUT Informatique — Data' },
                        { label: 'Alternance', value: 'Linedata (2025-2026)' },
                        { label: 'Localisation', value: 'Bondy, France' },
                        { label: 'Langues', value: 'Français, Anglais (B2)' },
                      ].map((stat, i) => (
                        <div key={i} className="flex justify-between items-baseline py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>{stat.label}</span>
                          <span className="font-body text-sm" style={{ color: 'var(--color-text-secondary)' }}>{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div className="mt-12 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
                      {t('hobbies.title')}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border font-body text-sm transition-all duration-300 cursor-default t-skill"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span className="text-base">{t(`hobbies.items.${i}.icon`)}</span>
                          {t(`hobbies.items.${i}.label`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SKILLS */}
              {activeTab === 'skills' && (
                <motion.div key="skills" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skillCategories.map((catKey, idx) => (
                      <motion.div key={catKey} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08, duration: 0.5 }}>
                        <h3 className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: 'var(--color-accent)' }}>
                          {t(`skills.${catKey}.name`)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {t(`skills.${catKey}.items`).split(', ').map((item: string) => (
                            <span key={item}
                              className="px-3 py-1.5 text-xs font-body rounded-lg border transition-all duration-300 cursor-default t-skill"
                              style={{ color: 'var(--color-text-secondary)' }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TIMELINE */}
              {activeTab === 'timeline' && (
                <motion.div key="timeline" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="space-y-0">
                    {timelineKeys.map((key, idx) => (
                      <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 -mx-4 px-4 rounded-lg t-card-hover transition-colors duration-300"
                        style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <div className="md:col-span-3">
                          <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--color-accent)' }}>
                            {t(`timeline.${key}.year`)}
                          </span>
                        </div>
                        <div className="md:col-span-4">
                          <h3 className="font-heading font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                            {t(`timeline.${key}.role`)}
                          </h3>
                          <p className="font-body text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            {t(`timeline.${key}.company`)}
                          </p>
                        </div>
                        <div className="md:col-span-5">
                          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            {t(`timeline.${key}.desc`)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
