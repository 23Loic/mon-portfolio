'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import CvViewer from "@/components/CvViewer";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('Menu.about'); // Assure-toi d'avoir les traductions
  const [activeTab, setActiveTab] = useState<'bio' | 'skills' | 'timeline'>('bio');

  // Données factices pour l'exemple (à mettre dans tes JSON idéalement)
  const skills = [
    { name: "Frontend", items: ["React", "Next.js", "Tailwind", "TypeScript"] },
    { name: "Backend", items: ["Node.js", "Python", "PostgreSQL", "API REST"] },
    { name: "Tools", items: ["Git", "Docker", "Figma", "VS Code"] },
  ];

  const timeline = [
    { year: "2024 - Présent", role: "Alternant Développeur", company: "Linedata", desc: "Développement Fullstack, participation aux rituels agiles..." },
    { year: "2023 - 2026", role: "Master Informatique", company: "ESGI", desc: "Spécialisation Architecture Logicielle" },
    { year: "2023", role: "Stage Développeur", company: "Start-up X", desc: "Création d'une landing page..." },
  ];

  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-orange-500/30">
      <Navbar />

      {/* Fond d'ambiance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-12 relative z-10">
        
        {/* --- EN-TÊTE --- */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Plus qu'un simple <span className="text-orange-500">Code.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Découvrez qui je suis, ce que je maîtrise et d'où je viens.
          </p>
          
          {/* Bouton CV centré */}
          <div className="mt-8">
            <CvViewer />
          </div>
        </div>

        {/* --- NAVIGATION DES ONGLETS --- */}
        <div className="flex justify-center mb-12">
          <div className="p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 inline-flex gap-2">
            {[
              { id: 'bio', label: 'Mon Histoire' },
              { id: 'skills', label: 'Compétences' },
              { id: 'timeline', label: 'Parcours' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Fond Orange animé qui se déplace */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-orange-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- CONTENU DYNAMIQUE --- */}
        <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* 1. ONGLET BIO */}
            {activeTab === 'bio' && (
              <motion.div
                key="bio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">L'humain derrière le code</h2>
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                  <p>
                    Passionné par l'informatique depuis mon plus jeune âge, j'ai toujours cherché à comprendre comment fonctionnaient les choses derrière l'écran.
                  </p>
                  <p>
                    Aujourd'hui, je ne me contente plus de comprendre : <strong className="text-orange-500">je construis</strong>. En tant qu'étudiant et alternant, je combine la rigueur académique avec les défis du monde réel chez Linedata.
                  </p>
                  <p>
                    Mon objectif ? Créer des expériences web fluides, performantes et utiles, tout en continuant à apprendre chaque jour de nouvelles technologies.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2. ONGLET COMPÉTENCES */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {skills.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="text-orange-500 font-bold mb-4 uppercase tracking-wider text-sm">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-orange-500/50 transition-colors cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 3. ONGLET PARCOURS */}
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 pl-4 border-l border-white/10"
              >
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    {/* Point sur la ligne */}
                    <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-2 border-orange-500" />
                    
                    <span className="text-sm text-orange-500 font-mono mb-1 block">{item.year}</span>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.company}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}