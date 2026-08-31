'use client';

import { use } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { getProject, competences } from '@/data/portfolio';

type Props = { params: Promise<{ slug: string }> };

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] as const },
});

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = use(params);
  const t = useTranslations('Projects');
  const tc = useTranslations('Competences');
  const project = getProject(slug);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-body mb-6" style={{ color: 'var(--color-text-secondary)' }}>{t('notFound')}</p>
          <Link href="/projects" className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-accent)' }}>
            ← {t('backToProjects')}
          </Link>
        </div>
      </main>
    );
  }

  const key = `items.${project.slug}`;
  const choices = t.raw(`${key}.choices`) as string[];
  const traces = t.raw(`${key}.traces`) as string[];
  const tags = t(`${key}.tags`).split(', ');

  const Section = ({ label, children, delay = 0 }: { label: string; children: React.ReactNode; delay?: number }) => (
    <motion.section {...fade(delay)} className="mb-12">
      <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
        {label}
      </h2>
      {children}
    </motion.section>
  );

  const paragraph = (text: string) => (
    <p className="font-body text-base leading-relaxed max-w-3xl" style={{ color: 'var(--color-text-secondary)' }}>
      {text}
    </p>
  );

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[520px] h-[520px] absolute top-[-5%] right-[10%] animate-float-slow" />
      </div>

      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-6 md:px-10">

        <motion.div {...fade(0)} className="mb-10">
          <Link
            href="/projects"
            className="font-mono text-[10px] tracking-[0.25em] uppercase link-underline"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            ← {t('backToProjects')}
          </Link>
        </motion.div>

        {/* Titre */}
        <motion.div {...fade(0.05)} className="mb-12">
          <span className="font-heading font-bold text-4xl md:text-5xl block mb-4" style={{ color: 'var(--color-border)' }}>
            {project.number}
          </span>
          <h1 className="heading-lg font-heading mb-3">{t(`${key}.title`)}</h1>
          <p className="font-body text-lg leading-relaxed max-w-2xl mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            {t(`${key}.subtitle`)}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-all duration-300"
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
              >
                {t('viewRepo')} ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-all duration-300"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                {t('viewDemo')} ↗
              </a>
            )}
            {project.confidential && (
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
                {t('confidential')}
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Corps */}
          <div className="lg:col-span-8">
            <Section label={t('contextLabel')} delay={0.1}>{paragraph(t(`${key}.context`))}</Section>
            <Section label={t('roleLabel')} delay={0.14}>{paragraph(t(`${key}.role`))}</Section>

            <Section label={t('choicesLabel')} delay={0.18}>
              <ul className="space-y-4 max-w-3xl">
                {choices.map((c, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-[10px] pt-1.5 shrink-0" style={{ color: 'var(--color-accent)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section label={t('difficultiesLabel')} delay={0.22}>{paragraph(t(`${key}.difficulties`))}</Section>
            <Section label={t('resultsLabel')} delay={0.26}>{paragraph(t(`${key}.results`))}</Section>

            <Section label={t('tracesLabel')} delay={0.3}>
              <ul className="space-y-2 max-w-3xl">
                {traces.map((tr, i) => (
                  <li
                    key={i}
                    className="font-body text-sm py-3"
                    style={{ color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}
                  >
                    {tr}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Colonne latérale */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-10">
              <motion.div {...fade(0.16)}>
                <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
                  {t('stackLabel')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded-full t-tag border">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fade(0.2)}>
                <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
                  {t('competencesLabel')}
                </h2>
                <div className="flex flex-col gap-2">
                  {project.competences.map((cid) => {
                    const c = competences.find((x) => x.id === cid);
                    return (
                      <Link
                        key={cid}
                        href="/competences"
                        className="flex items-baseline gap-3 rounded-lg px-3 py-3 border transition-all duration-300"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <span className="font-mono text-[10px]" style={{ color: 'var(--color-accent)' }}>{c?.code}</span>
                        <span className="font-body text-xs leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                          {tc(`items.${cid}.name`)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
