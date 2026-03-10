import Image from 'next/image';

type ProjectCardProps = {
  title: string;
  category: string;
  imageUrl: string;
  year: number;
};

export default function ProjectCard({ title, category, imageUrl, year }: ProjectCardProps) {
  return (
    <div className="group relative block bg-black rounded-3xl overflow-hidden">
      <Image src={imageUrl} alt={title} width={800} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      
      {/* Superposition sombre qui apparaît au survol */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500" />
      
      {/* Année (toujours visible) */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-sm">
        {year}
      </div>
      
      {/* Contenu textuel (positionné en bas) */}
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-gray-300">{category}</p>
      </div>

      {/* Bouton qui apparaît au centre au survol */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black">
          VOIR LE PROJET
        </button>
      </div>
    </div>
  );
}