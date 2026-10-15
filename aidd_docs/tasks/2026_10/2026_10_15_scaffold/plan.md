---
objective: "Le dépôt contient un scaffold Next.js 16 + TypeScript + Tailwind v4 + ESLint géré par pnpm, qui build, passe le lint et affiche une page d'accueil provisoire en local."
status: in-progress
---

# Plan: Scope 3 — Scaffold

## Overview

| Field      | Value                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------- |
| **Goal**   | Poser le socle Next.js minimal du portfolio, sans aucune feature, prêt pour les scopes 4 à 6   |
| **Source** | `aidd_docs/ROADMAP.md` (scope 3) + `aidd_docs/INSTALL.md` (Stack summary, Folder structure)    |

## Phases

| #   | Phase                         | File                         |
| --- | ----------------------------- | ---------------------------- |
| 1   | Scaffold et page provisoire   | [`phase-1.md`](./phase-1.md) |
| 2   | Mémoire et note de passation  | [`phase-2.md`](./phase-2.md) |
| 3   | Livraison (commit, PR, merge) | [`phase-3.md`](./phase-3.md) |

## Resources

| Source | Verified |
| ------ | -------- |
| Registre npm, lu par `pnpm view` (15/10/2026) | `next` 16.4.1, `create-next-app` 16.4.1, `react`/`react-dom` 19.3.1, `tailwindcss` 4.3.3, `@tailwindcss/turbopack` 4.3.3 (créé le 31/07/2026), `typescript` 5.9.3 (7.0.2 existe), `eslint` 9.39.5 (10.12.0 existe) |
| Code de `create-next-app` 16.4.1 (`dist/index.js`) | Refuse un dossier contenant `README.md`, `AGENTS.md`, `CLAUDE.md` ou `aidd_docs/`. Tailwind passe par `@tailwindcss/turbopack` sans PostCSS ; `packageManager` et `pnpm-workspace.yaml` (`allowBuilds`, pnpm ≥ 11) sont écrits |
| Code de `next` 16.4.1 (`dist/server/lib/start-server.js`, `generate-agent-files.js`) | `next dev` ajoute un bloc balisé en fin d'`AGENTS.md` quand il détecte un agent IA, et le remet s'il est retiré ; `agentRules: false` le désactiverait |
| Code de `update_memory.js` (plugin AIDD 2.8.1) | Ne remplace que le contenu entre `aidd_project_memory:start` et `:end` : le reste de `CLAUDE.md` et `AGENTS.md` est conservé |
| https://vercel.com/docs/package-managers (maj 11/08/2026) | pnpm détecté par le lockfile ; `lockfileVersion: '9.0'` (celui que pnpm 12.4.2 écrit, testé) → pnpm 9 ou 10. Autre version : Corepack (`ENABLE_EXPERIMENTAL_COREPACK=1` + `packageManager`) |
| https://vercel.com/docs/builds/configure-a-build (maj 28/08/2026) | Preset « Other » : dossier de sortie `public` s'il existe. Le preset se règle dans le projet ou par `framework` dans `vercel.json` |
| Projet Vercel `portfolio` (lecture seule, MCP) | `framework: null`, `nodeVersion: 24.x`, protection SSO sur tout sauf domaines perso |
| CLI `shadcn` 4.21.5 (`dist/`) | Aucune référence à `postcss.config` ni à `@tailwindcss/postcss` / `@tailwindcss/turbopack` : l'intégration Tailwind choisie ne bloque pas le scope 6 |

## Decisions

| Decision | Why |
| -------- | --- |
| Squelette généré par Yanis avec `pnpm dlx create-next-app` (réglages un par un), repris tel quel comme base | Choix de Yanis après l'annulation d'un premier essai. Le squelette fait foi |
| React Compiler activé (`reactCompiler: true`, `babel-plugin-react-compiler` 1.0.0, dernière version publiée) | Choix de Yanis dans le squelette |
| Cache Components désactivé | Choix de Yanis dans le squelette |
| Tailwind par `@tailwindcss/turbopack`, sans PostCSS, INSTALL.md mis à jour | Ce que le générateur écrit pour Tailwind avec Turbopack. Choix de Yanis |
| Contenu de démo remplacé : page provisoire en français, icônes et hero repris, SVG et polices Geist retirés, `globals.css` réduit à `@import "tailwindcss"` | Choix de Yanis. La typographie et le thème se décident au scope Design system |
| Bloc Next.js « lire `node_modules/next/dist/docs/` » dans `AGENTS.md` (écrit par `next dev`) et recopié dans `CLAUDE.md`, contenu AIDD gardé | Choix de Yanis. `update_memory.js` ne réécrit que son propre bloc ; `next dev` ne tient à jour que `AGENTS.md` |
| Page d'accueil dans `src/app/(public)/page.tsx` | Emplacement final de la Folder structure, rien à déplacer au scope Contenu |
| `react`/`react-dom` 19.3.1 | Règle d'INSTALL : dernière version du même majeur (le générateur fige 19.3.0) |
| `packageManager: "pnpm@12.4.2"`, pas de champ `engines` | Règle pnpm uniquement. pnpm 12.4.2 écrit `lockfileVersion: '9.0'` (testé) : sans Corepack, Vercel installera avec pnpm 9 ou 10. Version réelle relevée dans le log de la preview ; Corepack au scope 4 |
| Preset Vercel laissé vide jusqu'au scope 4 | Aucun service externe touché au scope 3. Choix de Yanis |
