# Forms

## Approche

- Formulaires construits avec les primitives shadcn/ui : voir [design.md](design.md).
- La validation qui fait foi est celle du backend : chaque `public.ts` valide ses arguments (voir [api.md](api.md)).

## Conventions

- Chaque formulaire public (contact, inscription à la veille) porte le widget Turnstile. Le jeton est vérifié dans Convex.
- Confirmation d'inscription et désinscription : le lien de l'e-mail ouvre une page avec un bouton. Rien ne se déclenche au simple chargement, pour que les antivirus qui suivent les liens ne déclenchent rien.
