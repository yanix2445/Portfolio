# Coding Assertions

Toutes les commandes passent par pnpm, jamais npm ni npx. Les contrôles bloquants et l'endroit où ils tournent sont dans [testing.md](testing.md).

| But | Commande |
| --- | --- |
| Installer | `pnpm install` |
| Lancer en local | `pnpm dev` (http://localhost:3000) et, dans un second terminal, `pnpm exec convex dev` |
| Lint | `pnpm lint` |
| Types | `pnpm exec next typegen && pnpm exec tsc --noEmit` (sans `typegen`, un clone neuf échoue sur `LayoutProps`) |
| Build | `pnpm build` |

Les commandes de tests (Vitest, Playwright, Lighthouse CI) arrivent au scope Tests et CI.
