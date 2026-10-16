# Coding Assertions

Toutes les commandes passent par pnpm, jamais npm ni npx. Les contrôles bloquants et l'endroit où ils tournent sont dans [testing.md](testing.md).

| But | Commande |
| --- | --- |
| Installer | `pnpm install` |
| Lancer en local | `pnpm dev` (http://localhost:3000) et, dans un second terminal, `pnpm exec convex dev` |
| Lint | `pnpm lint` |
| Types | `pnpm exec next typegen && pnpm exec tsc --noEmit` (sans `typegen`, un clone neuf échoue sur `LayoutProps`) |
| Build | `pnpm build` |
| Tests Vitest (intégration Convex) | `pnpm test` (une passe, sans surveillance) |
| E2E + axe | `pnpm test:e2e` (build de production sur le port 3000, à libérer avant) |
| Navigateur des E2E, une fois par poste | `pnpm exec playwright install chromium` (~300 Mo dans `~/Library/Caches/ms-playwright`) |
| Lighthouse CI en local (facultatif) | `pnpm build && pnpm start`, puis `PREVIEW_URL=http://localhost:3000/ VERCEL_AUTOMATION_BYPASS_SECRET=local pnpm exec lhci collect && pnpm exec lhci assert` (la valeur du secret est factice en local) |

pnpm n'installe pas une version publiée depuis moins d'un jour (`minimumReleaseAge`, 1440 min par défaut depuis pnpm 11) : il prend la précédente. Si pnpm écrit une exception `minimumReleaseAgeExclude` dans `pnpm-workspace.yaml`, la retirer une fois le délai passé.
