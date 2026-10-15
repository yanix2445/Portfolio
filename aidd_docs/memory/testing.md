# Testing

## Stratégie

- Aucun test à ce jour. Chaque scope livre ses propres tests.
- Pas d'objectif de couverture en %, mais chaque règle importante a son test.
- Un test instable se corrige tout de suite.

| Niveau | Outil | Ce qu'on teste en v1 | Où ça tourne |
| --- | --- | --- | --- |
| Statique | `tsc` + ESLint | tout le code | poste + CI à chaque PR, bloquant |
| Unitaire | Vitest | fonctions pures : adresse de réponse d'un fil, gabarits d'e-mails, liens UTM | poste + CI, bloquant |
| Intégration backend | `convex-test` dans Vitest (environnement `edge-runtime`) | `requireAdmin` (sans session ou avec un autre e-mail → refus), création d'un fil, rattachement d'une réponse reçue au bon fil, double opt-in, désinscription | poste + CI, bloquant |
| E2E + accessibilité | Playwright + `@axe-core/playwright` | parcours critiques : contact, connexion admin (mot de passe + TOTP), réponse depuis le panel, inscription, confirmation et désinscription à la veille ; audit axe sur chaque page | **poste uniquement**, avant chaque PR qui touche un parcours critique |
| Lighthouse | Lighthouse CI | les seuils Lighthouse de [project-brief.md](project-brief.md), médiane de 3 passages | CI à **chaque PR**, sur la preview Vercel, bloquant |
| Composants | — | rien en v1, les E2E couvrent | — |

## Conventions

- Tests unitaires et d'intégration à côté du code (`convex/contact/admin.test.ts`, `src/features/…/x.test.ts`). E2E dans `e2e/` à la racine.
- Les Server Components `async` se testent en E2E.
- Lighthouse CI se lance quand la preview Vercel est prête et passe sa protection avec l'en-tête `x-vercel-protection-bypass` (secret : voir [deployment.md](deployment.md)).
- Si le seuil Performance se révèle instable en CI, on en rediscute avec Yanis : jamais de baisse silencieuse.

## Browser QA

- Entrée : un build local, contre le déploiement Convex dev.
- Auth : un compte admin de test dans le déploiement dev (voir [auth.md](auth.md)).
- Environnement : clés Turnstile de test, Resend en mode test.
