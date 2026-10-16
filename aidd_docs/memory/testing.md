# Testing

## Stratégie

- Chaque scope livre ses propres tests. Commandes : [coding-assertions.md](coding-assertions.md).
- Pas d'objectif de couverture en %, mais chaque règle importante a son test.
- Un test instable se corrige tout de suite.

| Niveau | Outil | Ce qu'on teste en v1 | Où ça tourne |
| --- | --- | --- | --- |
| Statique | `tsc` + ESLint | tout le code | poste + CI à chaque PR, bloquant |
| Unitaire | Vitest | fonctions pures : adresse de réponse d'un fil, gabarits d'e-mails, liens UTM | poste + CI, bloquant |
| Intégration backend | `convex-test` dans Vitest (environnement `edge-runtime`) | `requireAdmin` (sans session ou avec un autre e-mail → refus), création d'un fil, rattachement d'une réponse reçue au bon fil, double opt-in, désinscription | poste + CI, bloquant |
| E2E + accessibilité | Playwright (Chromium) + `@axe-core/playwright` | parcours critiques : contact, connexion admin (mot de passe + TOTP), réponse depuis le panel, inscription, confirmation et désinscription à la veille ; audit axe sur chaque page | **poste uniquement**, avant chaque PR qui touche un parcours critique |
| Lighthouse | Lighthouse CI | les seuils Lighthouse de [project-brief.md](project-brief.md), médiane de 3 passages | CI à **chaque PR**, sur la preview Vercel, bloquant |
| Composants | — | rien en v1, les E2E couvrent | — |

## État (scope 5)

- Intégration : `convex/backend.test.ts`, exemple sans fonction Convex (écrire puis relire, base vide à chaque test). À remplacer par les tests de `requireAdmin` au scope 7.
- E2E : `e2e/home.spec.ts` (titre de l'accueil visible, aucune violation axe).
- Unitaire : aucun test, aucune fonction pure n'existe. Vitest ne lit que `convex/**/*.test.ts` ; le niveau unitaire (`src/`, environnement Node) s'ajoute au scope 10 avec la première fonction pure. Écart assumé avec la ROADMAP.
- Lighthouse : `/` seulement. Chaque nouvelle page publique ajoute son URL dans `lighthouserc.js`.

## Conventions

- Tests unitaires et d'intégration à côté du code (`convex/contact/admin.test.ts`, `src/features/…/x.test.ts`). E2E dans `e2e/` à la racine, fichiers `*.spec.ts`.
- Un test Convex commence par `/// <reference types="vite/client" />` et passe `import.meta.glob("./**/*.ts")` à `convexTest({ modules })`. Les fichiers `*.test.ts` ne partent jamais dans Convex (la CLI ignore les noms à plusieurs points).
- Les Server Components `async` se testent en E2E.
- `pnpm test:e2e` construit et démarre un build de production sur le port 3000. Un serveur déjà lancé sur ce port (`pnpm dev`) fait échouer le run : l'arrêter d'abord.
- CI : `.github/workflows/ci.yml` (job `quality` : lint, `next typegen` + `tsc`, Vitest) sur chaque PR ; `.github/workflows/lighthouse.yml` (job `lighthouse`) quand Vercel signale une preview prête (`deployment_status`). Les deux sont des contrôles requis du ruleset `main` (voir [vcs.md](vcs.md)).
- Lighthouse CI passe la protection de la preview avec les en-têtes `x-vercel-protection-bypass` (secret : voir [deployment.md](deployment.md)) et `x-vercel-skip-toolbar`. Il ignore deux audits impossibles à mesurer sur une preview protégée : `is-crawlable` (Vercel y envoie `x-robots-tag: noindex`) et `robots-txt` (Lighthouse télécharge `/robots.txt` sans l'en-tête et lit la page de connexion Vercel). Les deux se vérifient en prod.
- Aucun rapport Lighthouse n'est publié ni gardé en artefact : un rapport contient les en-têtes envoyés, donc le secret. Le journal de `lhci assert` donne la catégorie en échec.
- Si le seuil Performance se révèle instable en CI, on en rediscute avec Yanis : jamais de baisse silencieuse.

## Browser QA

- Entrée : un build local, contre le déploiement Convex dev.
- Auth : un compte admin de test dans le déploiement dev (voir [auth.md](auth.md)).
- Environnement : clés Turnstile de test, Resend en mode test.
