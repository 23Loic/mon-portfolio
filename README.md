# Loïc Bouvil — Portfolio

Portfolio personnel construit avec Next.js 15, Tailwind CSS, Framer Motion et next-intl.

## Stack

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS 3
- **Animations** : Framer Motion
- **i18n** : next-intl (FR / EN)
- **Contact** : EmailJS
- **Fonts** : Syne, DM Sans, JetBrains Mono

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Tester le build
npm start
```

## Configuration EmailJS

1. Crée un compte sur [emailjs.com](https://www.emailjs.com/)
2. Ajoute un service email (Gmail)
3. Crée un template avec les variables : `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Remplace les 3 clés dans `src/app/[locale]/contact/page.tsx` :
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - `YOUR_PUBLIC_KEY`

## Déploiement sur Vercel

1. Push ton code sur GitHub
2. Va sur [vercel.com](https://vercel.com) et connecte ton compte GitHub
3. Importe le repository
4. Vercel détecte automatiquement Next.js → clique "Deploy"
5. Ton site est en ligne !

Pour un domaine personnalisé : Settings → Domains → Ajoute ton domaine.

## Structure

```
src/
├── app/
│   ├── globals.css          # Design system
│   └── [locale]/
│       ├── layout.tsx        # Layout principal + Navbar
│       ├── page.tsx          # Landing page
│       ├── menu/page.tsx     # Hub de navigation
│       ├── about/page.tsx    # À propos + compétences + parcours
│       ├── projects/page.tsx # Projets
│       └── contact/page.tsx  # Contact + formulaire EmailJS
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── Menu.tsx              # Menu split-screen
│   └── CvViewer.tsx          # Modale CV
├── i18n/                     # Configuration next-intl
└── middleware.ts             # Middleware i18n
messages/
├── fr.json                   # Traductions FR
└── en.json                   # Traductions EN
```
