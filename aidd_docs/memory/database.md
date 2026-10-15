# Database

## Setup

- Convex, région UE `aws-eu-west-1` (Dublin), pour le RGPD. Schéma dans `convex/schema.ts`.
- Projet `portfolio`, équipe `black-rise` : dev `good-goshawk-727`, prod `valuable-seahorse-421`, une preview par branche créée par le build.
- La région se fixe à la création et ne se change plus : la vérifier dans le dashboard (page General du déploiement). Une URL UE contient `eu-west-1`. Un premier projet est sorti en US malgré la région d'équipe visée, et a dû être recréé.
- Un backend Convex par environnement : voir [deployment.md](deployment.md).

## Entités principales

- `contact` : une conversation (le fil) possède ses messages.
- `newsletter` : les abonnés et les numéros de veille.
- Les composants `betterAuth` (compte admin) et `resend` (e-mails envoyés) ont leurs propres tables.

## Conventions

- Le schéma du composant Better Auth est généré : voir [auth.md](auth.md).
- `convex/crons.ts` purge les e-mails terminés du composant Resend.
