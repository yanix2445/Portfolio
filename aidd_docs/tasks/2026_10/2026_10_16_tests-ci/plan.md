---
objective: "Chaque PR passe par lint, types, Vitest et Lighthouse CI sur sa preview Vercel, et une PR qui casse un test ou passe sous un seuil Lighthouse ne peut pas être fusionnée ; les E2E Playwright + axe passent sur le poste."
status: in-progress
---

# Plan: Scope 5 — Tests et CI

## Overview

| Field      | Value |
| ---------- | ----- |
| **Goal**   | Installer les outils de test, un exemple par niveau existant, la CI GitHub Actions et Lighthouse CI sur la preview, puis rendre ces contrôles bloquants |
| **Source** | `aidd_docs/ROADMAP.md` (scope 5) + `aidd_docs/INSTALL.md` (Testing, Stack summary, risques) + `aidd_docs/memory/testing.md` |

## Phases

| #   | Phase                                        | File                         |
| --- | -------------------------------------------- | ---------------------------- |
| 1   | Vitest et convex-test                        | [`phase-1.md`](./phase-1.md) |
| 2   | E2E Playwright et axe sur le poste           | [`phase-2.md`](./phase-2.md) |
| 3   | CI GitHub Actions et Lighthouse sur la preview | [`phase-3.md`](./phase-3.md) |
| 4   | Contrôles requis, démonstration, mémoire, fusion | [`phase-4.md`](./phase-4.md) |

## Resources

| Source | Verified |
| ------ | -------- |
| Registre npm, lu par `pnpm view` (16/10/2026) | `vitest` 5.0.5 publiée, **5.0.4 installée** (pnpm ≥ 11 attend 1 jour avant d'installer une version, `minimumReleaseAge` = 1440 min, https://pnpm.io/settings/dependency-resolution ; 5.0.5 date du 15/10 14:29 UTC) (Node ≥ 22.12 ; `vite` ≥ 6.4 devient une dépendance pair **obligatoire** ; `@types/node` en pair optionnel `^22 \|\| >=24`), `vite` 8.3.4, `convex-test` 0.0.62 (pair : `convex ^1.43.0`, aucun pair Vitest), `@edge-runtime/vm` 5.0.0, `@playwright/test` 1.64.1, `@axe-core/playwright` 4.14.0, `@lhci/cli` 0.15.1 (Lighthouse 12.6.1), `@types/node` 24.19.2. Moteurs : `convex` Node ≥ 20, `next` ≥ 20.9 |
| Code de `convex-test` 0.0.62 (`dist/index.js`) | N'importe pas Vitest : seul `import.meta.glob` (fonction de Vite) charge les modules, et il cherche `_generated` dans la liste fournie. Compatible avec Vitest 5 |
| Code de la CLI `convex` 1.46.0 (`dist/esm/bundler/index.js`) | Un fichier dont le nom contient plusieurs points (`x.test.ts`) est ignoré au déploiement : les tests ne partent jamais dans Convex |
| `convex/_generated/ai/guidelines.md` + https://docs.convex.dev/testing/convex-test | `convex-test` + Vitest + `@edge-runtime/vm`, `environment: "edge-runtime"`, tests sous `convex/`, `import.meta.glob("./**/*.ts")` passé à `convexTest`, `/// <reference types="vite/client" />` dans les tests qui l'utilisent. Pas de crons, messages d'erreur différents du vrai backend |
| https://vitest.dev/guide/migration | Vitest 5 : Vite est un pair obligatoire, Node ≥ 22.12, la config n'est plus cherchée dans les dossiers parents |
| `node_modules/next/dist/docs/01-app/02-guides/testing/` (vitest.md, playwright.md) | Server Components `async` en E2E ; E2E recommandés contre un build de production ; `webServer` de Playwright pour lancer le serveur |
| https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation (maj 16/09/2026) | Tous les plans ; en-tête `x-vercel-protection-bypass` ; plusieurs secrets possibles ; Vercel pose aussi `VERCEL_AUTOMATION_BYPASS_SECRET` dans ses déploiements ; régénérer le secret invalide les anciens déploiements |
| https://vercel.com/docs/vercel-toolbar/managing-toolbar (maj 11/08/2026) | L'en-tête `x-vercel-skip-toolbar` coupe la Toolbar pour l'automatisation |
| https://vercel.com/docs/deployment-protection/automated-agent-access | Exemple officiel : workflow `on: deployment_status`, `if: state == 'success'`, URL dans `deployment_status.target_url` |
| Preview de la PR #4 lue par le MCP Vercel (16/10/2026) | `x-robots-tag: noindex` sur toute preview => l'audit Lighthouse `is-crawlable` y échoue forcément |
| GitHub API, dépôt `yanix2445/Portfolio` | Vercel crée un GitHub Deployment `Preview` ou `Production` par build prêt, avec **un seul** statut `success` (et son URL). Ruleset `main` (id 25186980) : aucune règle `required_status_checks` à ce jour |
| https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md | Fichiers lus : `lighthouserc.js` entre autres. `aggregationMethod` par défaut = `optimistic` (la meilleure passe gagne) : `median` à forcer. `collect.settings.extraHeaders` en JSON. Cibles d'envoi : `lhci`, `temporary-public-storage`, `filesystem` |
| https://github.com/pnpm/action-setup | v6 prend en charge pnpm 12 et lit la version dans `packageManager` |

## Decisions

| Decision | Why |
| -------- | --- |
| Vitest 5 + `vite` 8 en dépendance directe + `@types/node` monté de 20 à 24 | Choix de Yanis. `convex-test` est compatible (code lu). `vite` est exigé par Vitest 5 et fournit les types `vite/client` des tests Convex. Node 24 est la version de Vercel et de la CI |
| Vitest ne teste que `convex/` pour l'instant ; le niveau unitaire (`src/`, environnement Node) arrive au scope 10 avec la première vraie fonction pure | Choix de Yanis : aucune fonction pure n'existe, pas d'exemple factice. Écart assumé avec la ROADMAP (« un exemple de chaque niveau ») |
| Exemple d'intégration sans fonction Convex : il écrit et relit dans le backend de test (`t.run`) et prouve qu'un test démarre sur une base vide | Aucune fonction Convex métier dans ce scope. Il valide la chaîne Vitest + `edge-runtime` + liste des modules. Il est remplacé par les tests de `requireAdmin` au scope 7 |
| E2E sur Chromium seul, contre un build de production local (`pnpm build && pnpm start`, port 3000, jamais un serveur déjà lancé) | Choix de Yanis. Recommandation Next.js (build de production). Un `pnpm dev` déjà lancé fait échouer Playwright avec un message clair au lieu d'être testé à sa place |
| Lighthouse CI déclenché par `deployment_status` (preview `Preview` prête), 3 passages, médiane, seuils 0,95 / 1 / 1 / 1, audit `is-crawlable` ignoré | Choix de Yanis pour `is-crawlable` : Vercel envoie `noindex` sur toute preview, l'indexation sera vérifiée en prod au scope 17. Médiane forcée car l'agrégation par défaut ne garde que la meilleure passe |
| Lighthouse passe la protection avec `x-vercel-protection-bypass` + `x-vercel-skip-toolbar`, et **aucun rapport n'est envoyé** (ni stockage public, ni artefact) | Le rapport Lighthouse peut contenir les en-têtes envoyés, donc le secret. Le journal de `lhci assert` suffit à lire un échec |
| CI : un seul job `quality` sur `pull_request` (lint, `next typegen` + `tsc`, Vitest), Node 24, actions tierces épinglées par SHA, droits en lecture seule | Une seule installation, un seul contrôle requis lisible. L'épinglage par SHA empêche qu'une action modifiée à distance tourne dans la CI |
| Contrôles requis dans le ruleset `main` : `quality` et `lighthouse` | Critère du scope : une PR qui casse un test ou un seuil est bloquée |
