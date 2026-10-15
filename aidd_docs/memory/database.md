# Database

## Setup

- Convex, région UE `aws-eu-west-1` (Dublin), pour le RGPD. Schéma dans `convex/schema.ts`.
- Un backend Convex par environnement : voir [deployment.md](deployment.md).

## Entités principales

- `contact` : une conversation (le fil) possède ses messages.
- `newsletter` : les abonnés et les numéros de veille.
- Les composants `betterAuth` (compte admin) et `resend` (e-mails envoyés) ont leurs propres tables.

## Conventions

- Le schéma du composant Better Auth est généré : voir [auth.md](auth.md).
- `convex/crons.ts` purge les e-mails terminés du composant Resend.
