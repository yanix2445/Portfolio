# VCS

## Setup

- Dépôt : [`yanix2445/Portfolio`](https://github.com/yanix2445/Portfolio) sur GitHub, public, lié au projet Vercel `portfolio`.
- Branche principale : `main`.
- `main` protégée par le ruleset `main` : tout passe par une PR, fusion en squash uniquement, historique linéaire, ni force push ni suppression, aucun contournement. Aucune approbation exigée (un seul développeur).
- Chaque PR ouvre une Preview Vercel avec son propre backend Convex.
- Une PR est bloquée par la CI (contrôles dans [testing.md](testing.md)) : ses checks deviennent requis dans le ruleset dès qu'ils existent. Avant une PR qui touche un parcours critique, les E2E passent sur le poste.

## Branches

- Une branche par scope ou par changement, partie de `main` à jour, supprimée après fusion.
- Nom : `<type>/<sujet>`, en anglais et en kebab-case, `<type>` pris dans la liste des commits. Exemples : `chore/scaffold`, `feat/contact-form`.

## Commits

- Conventional Commits, en anglais : `<type>(<scope>): <description>`.
- Types : `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.
- `<scope>` optionnel : la feature (`contact`, `newsletter`, `auth`) ou la zone (`convex`, `ui`, `deps`).
- Description à l'impératif, en minuscules, sans point final. Première ligne de 72 caractères au plus.
- Le titre de la PR suit le même format : la fusion en squash en fait le message du commit sur `main`.

## Commit Strategy

AI should auto commit: `never`. L'IA ne commite et ne pousse qu'avec l'accord explicite de Yanis.
