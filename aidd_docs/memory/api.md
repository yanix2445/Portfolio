# API

## Style

- Pas d'API REST maison : le backend est un ensemble de fonctions Convex (query, mutation, action) que le front appelle par `api.*`.
- Le rôle se lit dans le nom : `api.<feature>.public.<fn>` (ouvert à tous) ou `api.<feature>.admin.<fn>` (propriétaire seul). Exemples : `api.contact.public.submit`, `api.contact.admin.reply`.
- Routes HTTP uniquement dans `convex/http.ts` : Better Auth, `/resend-webhook` (statuts + `email.received`), désinscription en un clic.
- Côté Next.js, une seule route serveur : le relais `/api/auth/[...all]`.

## Ressources

- `contact` : envoi du formulaire ; liste des fils, lecture d'un fil, réponse.
- `newsletter` : inscription, confirmation, désinscription ; liste, enregistrement et envoi des numéros.
- `auth` : servi par Better Auth.

## Contrats

- Un `public.ts` est ouvert à tous : il valide chaque argument et vérifie le jeton Turnstile.
- Un `admin.ts` commence chaque fonction par `requireAdmin` : voir [auth.md](auth.md).
