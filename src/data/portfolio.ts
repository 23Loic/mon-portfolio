// Données structurelles du portfolio.
// Les textes vivent dans messages/fr.json et messages/en.json ;
// ce fichier ne contient que la structure, les liens et le mapping compétences ↔ projets.

export type CompetenceId =
  | 'realiser'
  | 'optimiser'
  | 'administrer'
  | 'gerer'
  | 'conduire'
  | 'collaborer';

export type ProjectSlug = 'aerowise' | 'campus' | 'linedata' | 'meteo' | 'portfolio';

export type ProjectCategory = 'web' | 'data' | 'pro';

export type Project = {
  slug: ProjectSlug;
  number: string;
  category: ProjectCategory;
  /** Lien vers le dépôt. Laisser undefined pour un projet non publiable. */
  repo?: string;
  /** Lien vers une démonstration en ligne. */
  demo?: string;
  /** true = code non public (contexte entreprise ou données sensibles). */
  confidential?: boolean;
  /** Compétences que ce projet sert à démontrer. */
  competences: CompetenceId[];
};

// TODO Loïc : remplacer par les URL exactes des dépôts.
// Tant qu'elles pointent vers le profil GitHub, le jury clique et ne trouve rien.
const GITHUB = 'https://github.com/23Loic';

export const projects: Project[] = [
  {
    slug: 'aerowise',
    number: '01',
    category: 'data',
    repo: GITHUB, // TODO : URL du dépôt AeroWise
    competences: ['optimiser', 'gerer', 'conduire', 'realiser'],
  },
  {
    slug: 'linedata',
    number: '02',
    category: 'pro',
    confidential: true,
    competences: ['realiser', 'optimiser', 'administrer', 'gerer', 'collaborer'],
  },
  {
    slug: 'campus',
    number: '03',
    category: 'pro',
    confidential: true,
    competences: ['gerer', 'conduire', 'realiser'],
  },
  {
    slug: 'portfolio',
    number: '04',
    category: 'web',
    repo: `${GITHUB}/mon-portfolio`,
    demo: 'https://lbouvil-portfolio.vercel.app/fr',
    competences: ['realiser', 'administrer'],
  },
  {
    slug: 'meteo',
    number: '05',
    category: 'web',
    repo: GITHUB, // TODO : URL du dépôt Météo
    competences: ['realiser', 'gerer'],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export type Competence = {
  id: CompetenceId;
  code: string;
  /** Projets qui servent de preuve, dans l'ordre où on veut les montrer. */
  evidence: ProjectSlug[];
  status: 'acquired' | 'consolidating' | 'developing';
};

// Énoncés de niveau 3 du parcours AGED : voir messages/*.json.
// À vérifier dans le livret de l'étudiant de l'IUT de Créteil-Vitry avant la soutenance.
export const competences: Competence[] = [
  { id: 'realiser', code: 'C1', evidence: ['portfolio', 'linedata', 'meteo'], status: 'acquired' },
  { id: 'optimiser', code: 'C2', evidence: ['aerowise', 'linedata'], status: 'consolidating' },
  { id: 'administrer', code: 'C3', evidence: ['linedata', 'portfolio'], status: 'consolidating' },
  { id: 'gerer', code: 'C4', evidence: ['campus', 'linedata', 'aerowise'], status: 'acquired' },
  { id: 'conduire', code: 'C5', evidence: ['aerowise', 'campus', 'linedata'], status: 'consolidating' },
  { id: 'collaborer', code: 'C6', evidence: ['linedata', 'aerowise'], status: 'developing' },
];

export const projectsByCompetence = (id: CompetenceId) =>
  projects.filter((p) => p.competences.includes(id));
