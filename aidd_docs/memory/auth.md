# Auth

## Authentification

- Better Auth via `@convex-dev/better-auth`, en **Local Install** dans `convex/betterAuth/` (exigé par la passkey). Plugins officiels uniquement.
- Deux parcours au choix : mot de passe puis TOTP (+ codes de secours), **ou** passkey seule avec vérification de l'utilisateur obligatoire.
- Pas de « passkey puis TOTP » : Better Auth ne le propose pas sans code maison, et la passkey est déjà un facteur multiple.
- Le navigateur passe par le relais `src/app/api/auth/[...all]/route.ts`. Client dans `src/features/auth/auth-client.ts`, session côté serveur dans `src/features/auth/auth-server.ts` (`server-only`).
- Inscription fermée (`disableSignUp`) tant que `AUTH_SIGNUP_OPEN` n'est pas posée sur le déploiement Convex. Aucune page d'inscription dans le site.
- Compte admin créé une fois par déploiement : ouvrir la fenêtre, créer le compte tout de suite avec l'e-mail du propriétaire, refermer, puis vérifier qu'un seul compte existe. Procédure exacte : [INSTALL.md](../INSTALL.md) (Environments).

## Autorisation

Un seul rôle privilégié, le propriétaire. Isolation à trois niveaux :

1. **URL** : `src/app/admin/(protege)/layout.tsx` vérifie la session côté serveur, sinon redirige vers `/admin/connexion`, seule page admin ouverte.
2. **Écrans** : règle d'import n° 4 de [architecture.md](architecture.md).
3. **Backend, la vraie barrière** : toute fonction d'un `convex/<feature>/admin.ts` commence par `await requireAdmin(ctx)` (`convex/lib/requireAdmin.ts`). `requireAdmin` exige une session **et** l'e-mail du propriétaire `yanis@yanis-harrat.com` : un compte créé par quelqu'un d'autre n'a aucun droit.

## Pièges

- `convex/betterAuth/schema.ts` est généré par `pnpm exec auth generate` : ne jamais l'éditer.
- La version de `better-auth` est imposée par la plage du composant, et `@better-auth/passkey` suit la même version que `better-auth` (voir INSTALL.md).
