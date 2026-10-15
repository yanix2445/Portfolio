# Deployment

## Pipeline

- GitHub → Vercel. Preset et Build Command dans `vercel.json` : `pnpm exec convex deploy --cmd 'pnpm run build'`. Le build pousse le code Convex, puis construit Next.js en injectant `NEXT_PUBLIC_CONVEX_URL` et `NEXT_PUBLIC_CONVEX_SITE_URL`. En Preview seulement, il pose ensuite `SITE_URL` (URL de branche Vercel) sur la preview Convex de la branche.
- Une PR ou une branche poussée → Preview. Un push sur `main` → Production.
- Un seul écrivain par backend Convex : le watcher `pnpm exec convex dev` en local, le build Vercel en Preview et en Production.
- Chaque PR passe aussi par la CI GitHub Actions : lint, `tsc`, Vitest, puis Lighthouse CI sur la preview (voir [testing.md](testing.md)).

## Environnements

| | Local | Preview | Production |
| --- | --- | --- | --- |
| Lancement | `pnpm dev` + `pnpm exec convex dev` | PR ou branche poussée | push sur `main` |
| URL | `http://localhost:3000` | `*.vercel.app` de la branche, protégée par Vercel Authentication | `https://yanis-harrat.com` (`www` → 308) |
| Backend Convex | déploiement dev personnel | un par branche, créé par le build, supprimé après 5 jours | déploiement prod |
| E-mails | mode test (adresses `@resend.dev`) | mode test | envoi réel |
| Réception Resend | simulée | simulée | réelle |
| Turnstile | clés de test Cloudflare | clés de test Cloudflare | widget réel |

## Variables

Valeurs par environnement : [INSTALL.md](../INSTALL.md) (Environments).

- **Vercel / Next.js** : `CONVEX_DEPLOY_KEY` (une clé Preview, une clé Production, sensibles) et `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (publique). `CONVEX_DEPLOYMENT` existe en local uniquement.
- `CONVEX_DEPLOY_KEY` : même nom deux fois, une portée Vercel chacune (la CLI ne lit que ce nom). La clé Production se crée sur le déploiement prod. La clé Preview se crée dans les **Project Settings** du projet Convex (Preview Deploy Keys), **jamais** sur un déploiement : une clé du déploiement dev ferait écrire chaque preview sur le dev.
- `NEXT_PUBLIC_CONVEX_URL` et `NEXT_PUBLIC_CONVEX_SITE_URL` : écrites par `pnpm exec convex dev` en local, injectées par le build ailleurs, **jamais** saisies dans Vercel.
- **Convex** (par déploiement avec `pnpm exec convex env set`, défauts des previews avec `pnpm exec convex env default`) : `SITE_URL`, `BETTER_AUTH_SECRET`, `AUTH_SIGNUP_OPEN`, `RESEND_API_KEY`, `RESEND_TEST_MODE`, `RESEND_WEBHOOK_SECRET`, `RESEND_RECEIVING_API_KEY`, `TURNSTILE_SECRET_KEY`.
- Ne jamais définir `CONVEX_SITE_URL` ni `CONVEX_CLOUD_URL` : Convex les fournit.
- `BETTER_AUTH_SECRET` est distinct dans chaque environnement, jamais partagé.
- `AUTH_SIGNUP_OPEN` absente = inscription fermée. En prod, posée seulement pendant la fenêtre d'inscription.
- `RESEND_TEST_MODE=false` en prod uniquement : seule la prod envoie réellement.
- `RESEND_WEBHOOK_SECRET` et `RESEND_RECEIVING_API_KEY` : prod uniquement. La clé de réception a un accès complet sur un compte Resend partagé avec un autre domaine : elle ne vit **que** dans Convex prod.
- **GitHub** : secret `VERCEL_AUTOMATION_BYPASS_SECRET` (« Protection Bypass for Automation » de Vercel), qui laisse Lighthouse CI passer la protection des previews.
- `.env.local` est écrit par `pnpm exec convex dev` et n'est jamais versionné.

## Mise en ligne

- Le site reste hors ligne jusqu'à la v1 complète. Ensuite : domaine `yanis-harrat.com` sur le projet Vercel `portfolio`, `www` → 308 vers l'apex, DNS Cloudflare en « DNS only ».
- Cloudflare : ne toucher qu'aux éléments listés dans INSTALL.md (External services). Le widget Turnstile `polaris` et les enregistrements DNS Infomaniak, `send`, `resend._domainkey`, `20260929._domainkey`, `_dmarc`, `tacklink`, `old` et `linktree` sont hors limites.
