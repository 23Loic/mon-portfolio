'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPE DE DONNÉES ---
// Tu pourras déplacer ça dans un JSON plus tard si tu veux
type Project = {
  id: number;
  title: string;
  category: 'web' | 'mobile' | 'data';
  description: string;
  tags: string[];
  videoUrl: string; // Chemin vers le fichier dans public/
  link?: string;    // Lien GitHub ou Live (Optionnel)
};

// --- DONNÉES FACTICES (À REMPLACER) ---
const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    category: "web",
    description: "Une interface d'administration complète avec graphiques en temps réel et gestion de stocks.",
    tags: ["Next.js", "Tailwind", "Recharts"],
    videoUrl: "/projects/demo-1.mp4", // Mets une vidéo ici
    link: "https://github.com/..."
  },
  {
    id: 2,
    title: "Task Manager App",
    category: "mobile",
    description: "Application de gestion de tâches avec synchronisation cloud et mode hors-ligne.",
    tags: ["React Native", "Firebase"],
    videoUrl: "/projects/demo-2.mp4",
    link: "https://github.com/..."
  },
  {
    id: 3,
    title: "AI Image Generator",
    category: "data",
    description: "Générateur d'images basé sur l'API OpenAI avec une interface fluide.",
    tags: ["Python", "FastAPI", "React"],
    videoUrl: "/projects/demo-3.mp4",
  },
  {
    id: 4,
    title: "Portfolio v1",
    category: "web",
    description: "Mon tout premier portfolio réalisé en HTML/CSS pur.",
    tags: ["HTML", "SASS", "JS"],
    videoUrl: "/projects/demo-4.mp4",
  }
];

export default function ProjectsPage() {
  const t = useTranslations('Menu.projects'); // Pense à ajouter les traductions si besoin
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'data'>('all');

  // Filtrage des projets
  const filteredProjects = projectsData.filter(p => 
    filter === 'all' ? true : p.category === filter
  );

  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-orange-500/30">
      <Navbar />

      {/* Fond d'ambiance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* --- EN-TÊTE --- */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Mes <span className="text-orange-500">Réalisations.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une sélection de mes travaux récents. Survolez les cartes pour voir les projets en action.
          </p>

          {/* --- FILTRES --- */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Tout voir' },
              { id: 'web', label: 'Web Dev' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'data', label: 'Data / IA' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${
                  filter === f.id 
                    ? 'bg-orange-500 border-orange-500 text-white' 
                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRILLE DE PROJETS --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl"
              >
                {/* 1. LA VIDÉO EN ARRIÈRE-PLAN */}
                <div className="absolute inset-0 z-0">
                  {/* Si tu n'as pas encore les vidéos, remplace <video> par une <img> temporaire */}
                  <img 
                    src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070" 
                    className="w-full h-full object-cover ..." 
                    />
                  {/* Overlay dégradé pour que le texte reste lisible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* 2. LE CONTENU (TEXTE) */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold px-2 py-1 bg-orange-500/90 text-white rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Titre & Description */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 group-hover:text-gray-200 transition-colors">
                    {project.description}
                  </p>

                  {/* Bouton Lien (Apparaît au hover) */}
                  {project.link && (
                    <div className="mt-6 h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                      <a 
                        href={project.link} 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-orange-500 pb-1 hover:text-orange-500 transition-colors"
                      >
                        Voir le projet
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </a>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  );
}