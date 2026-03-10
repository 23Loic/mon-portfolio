'use client';

import { useState } from 'react';
// On créera ces composants d'aperçu plus tard
// import AboutPreview from './previews/AboutPreview';
// import ProjectsPreview from './previews/ProjectsPreview';
// import ContactPreview from './previews/ContactPreview';

const sections = ['à propos', 'projets', 'contact'];

export default function InteractiveMenu() {
  const [activeSection, setActiveSection] = useState('projets');

  const renderPreview = () => {
    switch (activeSection) {
      case 'à propos':
        return <div>Aperçu de la section À Propos</div>; // <AboutPreview />
      case 'projets':
        return <div>Aperçu de la section Projets</div>; // <ProjectsPreview />
      case 'contact':
        return <div>Aperçu de la section Contact</div>; // <ContactPreview />
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Barre de navigation des sections */}
      <div className="flex justify-center items-center space-x-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-6 py-2 rounded-full text-lg transition-all duration-300 ${
              activeSection === section 
                ? 'bg-white text-black font-semibold' 
                : 'bg-gray-700 text-white'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Zone d'aperçu */}
      <div className="mt-12 text-center">
        {renderPreview()}
      </div>
    </div>
  );
}