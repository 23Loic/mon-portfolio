'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import CvViewer from '@/components/CvViewer';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormStatus('sending');

    const SERVICE_ID = 'service_abc123';
    const TEMPLATE_ID = 'template_10eeg2f';
    const PUBLIC_KEY = 'rNH4IiajZzlGDGOHz';
    
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setFormStatus('success');
        formRef.current?.reset();
        setEmailValue('');
        setTimeout(() => setFormStatus('idle'), 4000);
      })
      .catch(() => {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('loic.bouvil@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/loic-bouvil/',
      icon: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com/23Loic',
      icon: (
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      ),
    },
  ];

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[500px] h-[500px] absolute top-[-5%] right-[-10%] animate-float-slow" />
      </div>

      <div className="relative z-10 pt-32 pb-20 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }} className="space-y-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ color: 'var(--color-accent)' }}>
                Contact
              </span>
              <h1 className="heading-lg font-heading mb-6">
                {t('title')}<span className="text-gradient">.</span>
              </h1>
              <p className="font-body text-lg max-w-md leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('subtitle')}
              </p>
            </div>

            {/* Email */}
            <div onClick={copyEmail}
              className="group cursor-pointer py-6 flex items-center justify-between transition-all duration-500"
              style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-tag-bg)', color: 'var(--color-accent)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--color-text-tertiary)' }}>{t('emailLabel')}</p>
                  <p className="font-body text-base" style={{ color: 'var(--color-text)' }}>loic.bouvil@gmail.com</p>
                </div>
              </div>
              <span className={`font-mono text-[10px] tracking-wider uppercase transition-all duration-300 ${
                copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} style={{ color: copied ? '#4ade80' : 'var(--color-text-tertiary)' }}>
                {copied ? t('copied') : t('copy')}
              </span>
            </div>

            {/* Phone */}
            <a href="tel:+33764687402"
              className="group py-6 flex items-center gap-4 transition-all duration-500"
              style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: 'var(--color-tag-bg)', color: 'var(--color-accent)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--color-text-tertiary)' }}>{t('phoneLabel')}</p>
                <p className="font-body text-base" style={{ color: 'var(--color-text)' }}>07 64 68 74 02</p>
              </div>
            </a>

            {/* Socials */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: 'var(--color-text-tertiary)' }}>{t('socials')}</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-tertiary)' }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <CvViewer />
          </motion.div>

          {/* Right - Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] as const }} className="lg:pt-20">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                  {t('form.name')}
                </label>
                <input type="text" name="from_name" required placeholder="—"
                  className="w-full bg-transparent border-b py-4 font-body text-base focus:outline-none transition-colors duration-500 t-input" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                  {t('form.email')}
                </label>
                <input type="email" name="from_email" required placeholder="—"
                  value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full bg-transparent border-b py-4 font-body text-base focus:outline-none transition-colors duration-500 t-input" />
                <input type="hidden" name="reply_to" value={emailValue} />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.4em] uppercase block mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                  {t('form.message')}
                </label>
                <textarea name="message" rows={5} required placeholder="—"
                  className="w-full bg-transparent border-b py-4 font-body text-base focus:outline-none transition-colors duration-500 resize-none t-input" />
              </div>

              <button type="submit" disabled={formStatus !== 'idle'}
                className="group relative w-full py-5 rounded-full font-heading font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden flex items-center justify-center gap-3 border"
                style={{
                  borderColor: formStatus === 'success' ? 'rgba(74, 222, 128, 0.3)' : formStatus === 'error' ? 'rgba(248, 113, 113, 0.3)' : 'var(--color-accent)',
                  backgroundColor: formStatus === 'success' ? 'rgba(74, 222, 128, 0.1)' : formStatus === 'error' ? 'rgba(248, 113, 113, 0.1)' : 'transparent',
                  color: formStatus === 'success' ? '#4ade80' : formStatus === 'error' ? '#f87171' : 'var(--color-accent)',
                  boxShadow: formStatus === 'idle' ? `0 0 20px var(--glow-color)` : 'none',
                }}>
                {formStatus === 'idle' && (
                  <>
                    <span>{t('form.send')}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
                {formStatus === 'sending' && (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {formStatus === 'success' && <span>{t('form.success')}</span>}
                {formStatus === 'error' && <span>{t('form.error')}</span>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
