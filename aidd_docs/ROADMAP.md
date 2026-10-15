# ROADMAP — Portfolio Yanis Harrat

Un scope = une session. Chaque scope suit le flux AIDD : plan validé, puis code minimal, puis vérification, puis commit/PR avec accord. Référence technique : [INSTALL.md](INSTALL.md).

| # | Scope | Contenu | Terminé quand | Skill AIDD |
| --- | --- | --- | --- | --- |
| 0 | Cadrage | Architecture, `INSTALL.md`, cette feuille de route | `INSTALL.md` validé | `aidd-context:01-bootstrap` |
| 1 | Mémoire projet | Conventions (règles d'import, nommage, code minimal), branchement de l'IA (`CLAUDE.md`) | `aidd_docs/memory/` rempli et chargé par l'IA | `aidd-context:02-project-memory` |
| 2 | Dépôt | Dépôt GitHub, `main` protégée, conventions de branches et de commits, premier commit des docs | Le dépôt distant existe, `main` n'accepte que des PR | `aidd-vcs:00-repo-init` |
| 3 | Scaffold | Next.js 16 + TypeScript + Tailwind v4 + ESLint (pnpm), arbre `src/` minimal, icônes et hero repris | `pnpm build` passe, page d'accueil provisoire | `aidd-dev:01-plan` → `02-implement` |
| 4 | Environnements | Projet Convex UE, liaison Vercel `portfolio`, Build Command, clés de déploiement, valeurs par défaut des previews, protection des previews | Une PR de test a **son propre** backend Convex, `main` a le sien | `aidd-dev:01-plan` → `02-implement` |
| 5 | Tests et CI | Installer Vitest + `convex-test`, Playwright + axe, Lighthouse CI. Écrire un exemple de chaque niveau. GitHub Actions : lint + `tsc` + Vitest + Lighthouse CI sur la preview (secret de contournement de la protection) | Une PR qui casse un test ou passe sous un seuil Lighthouse est bloquée, et `pnpm test:e2e` passe sur le poste | `aidd-dev:06-test` + `aidd-dev:01-plan` → `02-implement` |
| 6 | Design system | Nouveau design system sur **shadcn/ui** : `shadcn init` (bibliothèque de base, style, couleur, irréversibles), thème en variables CSS, typographie, primitives nécessaires dans `shared/ui`, choix des animations (Motion et/ou GSAP) | Validé visuellement par Yanis | scope dédié |
| 7 | Auth 1 | Better Auth en Local Install : mot de passe → TOTP + codes de secours, inscription fermée hors fenêtre de création (`AUTH_SIGNUP_OPEN`), création du compte, `/admin/connexion`, layout protégé, `requireAdmin`, `/admin/securite` | Connexion complète testée, accès refusé sans session (pages **et** fonctions Convex) | `aidd-dev:01-plan` → `02-implement` → `06-test` |
| 8 | Auth 2 | Passkey (plugin officiel, vérification de l'utilisateur obligatoire) | Connexion par passkey seule testée | idem |
| 9 | Services e-mail et anti-robot | Resend (clés préfixées, suivi coupé, domaine `reply.`, webhook), widget Turnstile unique, DNS `reply` + suppression de `dev` | Domaines vérifiés, variables Convex posées | `aidd-dev:01-plan` → `02-implement` |
| 10 | Contact 1 — envoi | Formulaire public + Turnstile → fil créé → notification Infomaniak + accusé de réception | Message de test reçu dans Infomaniak, fil visible en base | idem + `06-test` |
| 11 | Contact 2 — panel | Liste des fils, fil complet, réponse depuis le panel (adresse de réponse propre au fil) | Réponse reçue par le recruteur de test, visible dans le fil | idem |
| 12 | Contact 3 — réception | Resend Receiving : webhook signé, rattachement au fil, texte brut, notification « nouvelle réponse » | La réponse du recruteur de test apparaît dans le fil et dans Infomaniak | idem |
| 13 | Veille 1 — abonnés | Inscription en double opt-in, désinscription en un clic | Parcours inscription → confirmation → désinscription testé | idem |
| 14 | Veille 2 — envoi | Rédaction, aperçu et envoi groupé depuis l'admin, liens UTM | Numéro de test reçu, clics visibles dans Vercel Analytics | idem |
| 15 | Contenu et SEO | Pages publiques (accueil, parcours, projets, épreuves), métadonnées, `sitemap`, `robots`, données structurées. Plusieurs sessions possibles | Lighthouse SEO = 100 sur chaque page | idem |
| 16 | Pages légales | Mentions légales + politique de confidentialité (RGPD : contact, veille, Turnstile, Vercel Analytics) | Pages en ligne, liées en pied de page | idem |
| 17 | Mise en ligne | Domaine → `portfolio`, `www` → 308 vers l'apex, « DNS only », vérification des seuils de performance | `yanis-harrat.com` sert la v1, cibles de performance atteintes | `vercel:deploy` + `aidd-dev:03-assert` |

Chaque scope livre ses propres tests. Rien n'est supprimé ou modifié sur un service externe sans accord explicite dans la session concernée.
