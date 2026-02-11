# TimeTravel Agency

MVP React moderne pour une agence fictive de voyages temporels de luxe. UI sombre premium, navigation fluide, chatbot IA intégré, quiz de recommandation et pages destinations complètes.

## Stack
- Vite + React + TypeScript
- TailwindCSS
- React Router
- Framer Motion
- API OpenAI côté serveur

## Features
- Home immersive avec hero vidéo fictive, sections premium et animations au scroll
- Grille de destinations avec filtres et pages détail
- Quiz interactif et recommandation personnalisée
- Chat IA intégré via `/api/chat`
- UI dark premium avec accents dorés
- Mobile-first responsive

## IA & Transparence
- Appel Mistral AI côté serveur uniquement
- Aucun secret côté client
- Rate limit simple en mémoire
- Validation taille message
- Modèle configurable via `MISTRAL_MODEL`

## Installation
```bash
npm install
```

## Variables d'environnement
Créer un fichier `.env` :
```
MISTRAL_API_KEY=sk-xxxx
MISTRAL_MODEL=mistral-small-latest
```

## Lancer en local
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Assets
- Hero images: `src/assets/paris-hero.jpg`, `src/assets/cretace-hero.jpg`, `src/assets/florence-hero.jpg`
- Optional video: place a file at `public/video/hero.mp4` to enable the hero background video

## Déploiement Vercel
- Importer le projet Vite
- Ajouter les variables d'environnement
- Vercel détecte automatiquement `api/chat.ts`
- Déployer

## Crédits
- Assets placeholders SVG créés pour ce projet

## Prompts utilisés
Voir `PROMPTS.md`

