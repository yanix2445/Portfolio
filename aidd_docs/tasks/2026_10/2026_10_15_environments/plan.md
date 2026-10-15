---
objective: "Le déploiement dev Convex tourne en UE, chaque branche poussée obtient sa preview Vercel avec son propre backend Convex, et `main` déploie sur le backend Convex de prod."
status: in-progress
---

# Plan: Scope 4 — Environnements

## Overview

| Field      | Value                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| **Goal**   | Brancher les trois environnements (local, preview, prod) sur un backend Convex chacun, en région UE       |
| **Source** | `aidd_docs/ROADMAP.md` (scope 4) + `aidd_docs/INSTALL.md` (Environments, External services, Install steps 4 et 5) |

## Phases

| #   | Phase                               | File                         |
| --- | ----------------------------------- | ---------------------------- |
| 1   | Backend Convex de dev               | [`phase-1.md`](./phase-1.md) |
| 2   | Previews et prod branchées          | [`phase-2.md`](./phase-2.md) |
| 3   | Mémoire, fusion et prod vérifiée    | [`phase-3.md`](./phase-3.md) |

## Resources

| Source | Verified |
| ------ | -------- |
| Registre npm, lu par `pnpm view` (15/10/2026) | `convex` 1.46.0 (dernière). Dépend de `esbuild` 0.27.0, qui a un script `postinstall` (`node install.js`) |
| Code de la CLI `convex` 1.46.0 (`src/cli/`) | `env default set <NAME> <value> --type preview` existe. `deploy` avec une clé Preview nomme la preview d'après `VERCEL_GIT_COMMIT_REF` et la réutilise si elle existe. `env set --preview-name <branche>` passe avec une clé Preview. Région d'un nouveau déploiement : celle par défaut de l'équipe, sinon une question (US proposé en premier). `convex dev` sur un projet neuf pose dans l'ordre : nouveau projet ou existant, équipe, nom du projet, cloud ou local, région, « Set up Convex AI files? ». Les AI files écrivent une section dans `CLAUDE.md` et `AGENTS.md`, `convex/_generated/ai/`, et lancent `npx --yes skills@latest add get-convex/agent-skills --yes --copy --agent claude-code --agent codex`. `.env.local` est déjà couvert par `.env*` dans `.gitignore` |
| https://docs.convex.dev/production/regions | Région fixée par déploiement, **non modifiable** ensuite. Région par défaut réglable dans les paramètres de l'équipe. `eu` = `aws-eu-west-1` |
| https://docs.convex.dev/production/hosting/vercel | Clé Production générée depuis le déploiement prod (qui doit donc exister), limitée à Production dans Vercel. Clé Preview générée dans les paramètres du projet, limitée à Preview. Valeurs par défaut des variables au niveau du projet |
| https://vercel.com/docs/environment-variables/system-environment-variables (maj 15/07/2026) | `VERCEL_ENV`, `VERCEL_GIT_COMMIT_REF`, `VERCEL_BRANCH_URL` disponibles au build. `VERCEL_BRANCH_URL` = `*-git-*.vercel.app`, sans `https://` |
| https://vercel.com/docs/project-configuration/vercel-json (maj 14/08/2026) | `"framework": "nextjs"` et `buildCommand` remplacent les réglages du projet |
| Projet Vercel `portfolio` (lecture seule, MCP) | `framework: null`, `nodeVersion: 24.x`, `ssoProtection: all_except_custom_domains` (Standard Protection + Vercel Authentication : déjà l'état cible) |

## Decisions

| Decision | Why |
| -------- | --- |
| Preset Next.js et Build Command dans un `vercel.json` versionné | Choix de Yanis. Relu dans la PR et testé sur la preview de cette PR avant d'atteindre la prod |
| `SITE_URL` des previews posée en fin de build, seulement si `VERCEL_ENV=preview`, sur la preview nommée `VERCEL_GIT_COMMIT_REF`, valeur `https://$VERCEL_BRANCH_URL` | Mécanisme d'INSTALL, vérifié dans le code de la CLI. L'URL de branche est stable ; l'URL propre à chaque déploiement ne correspondra pas (à traiter au scope Auth si besoin) |
| Seule `SITE_URL` est posée (dev, prod, previews). Les autres variables et leurs valeurs par défaut preview arrivent avec leur scope (7, 9) | Choix de Yanis. Aucun secret sans code qui le lit. `convex env default` est vérifié, utilisé plus tard |
| AI files Convex installés par `convex dev` | Choix de Yanis. Exception acceptée : la CLI Convex lance elle-même `npx --yes`, une fois, hors des commandes du projet |
| Région UE pour dev, previews et prod | RGPD. Un premier projet (`portfolio-4231d`) est sorti en US East : Yanis l'a supprimé et recréé `portfolio` en Europe (Ireland). Une région ne se change pas après création : la vérifier dans le dashboard avant toute clé |
| Les clés de déploiement sont générées dans le dashboard Convex et collées dans Vercel par Yanis, en « Sensitive » | Aucun secret ne passe par l'IA. L'IA vérifie seulement leur présence et leur portée |
| La PR du scope sert de PR de test | Elle porte `vercel.json` : sa preview prouve le backend par branche, sa fusion prouve celui de `main` |
