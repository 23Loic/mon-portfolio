// Fichier: src/app/menu/page.tsx
'use client';

import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu"; // Ton composant avec les rectangles

export default function MenuPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Menu />
    </main>
  );
}