# Design

## Système

- **shadcn/ui obligatoire** pour toute primitive UI, sur Tailwind CSS, thème en variables CSS.
- Les choix de `shadcn init` (bibliothèque de base, style, couleur de base, variables CSS) sont irréversibles : ils se font au scope Design system, pas avant.
- `components.json` : alias `ui` → `@/shared/ui`, `utils` → `@/shared/lib/utils`.

## Règles UI

1. Toute primitive UI (Button, Dialog, Input, etc.) vient de shadcn/ui, ajoutée par `shadcn add`. On n'écrit jamais une primitive à la main.
2. Un composant custom est construit à partir de composants shadcn/ui.
3. Une couche perso (variante, comportement, habillage) vit dans un composant custom qui **encapsule** la primitive : générique dans `src/shared/components/`, propre à une feature dans la feature.
4. Les primitives générées (`src/shared/ui/*`) ne sont **jamais modifiées** à la main.

## Tokens

- Tailwind et le thème dans `src/app/globals.css`, en variables CSS.

## Accessibilité

- Barre : les seuils Lighthouse de [project-brief.md](project-brief.md), plus un audit axe sur chaque page (voir [testing.md](testing.md)).
- Toute animation respecte `prefers-reduced-motion` et se charge en différé, pour ne pas dégrader le LCP et l'INP.
