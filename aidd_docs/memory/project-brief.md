# Project Brief

## Ce que c'est

- Le portfolio d'un étudiant BTS SIO SISR (parcours, projets, épreuves, veille technologique), sur `yanis-harrat.com`, avec un contact direct pour les recruteurs et le jury.
- Un espace admin privé, un seul compte (le propriétaire), pour suivre chaque prise de contact comme un fil de conversation et envoyer la veille aux abonnés.

## Pourquoi il existe

- Être trouvé et contacté : site vitrine rapide et bien référencé.
- Reconstruit de zéro depuis le 15/10/2026. Aucun code à ce jour. Le site reste hors ligne jusqu'à la v1 complète.

## Vocabulaire

| Terme | Sens |
| --- | --- |
| Fil | une prise de contact et tous ses échanges : message initial, réponses de Yanis, réponses du recruteur |
| Veille | la lettre de veille technologique envoyée aux abonnés |
| Numéro | un envoi de la veille, rédigé dans l'admin |
| Abonné | un inscrit à la veille, confirmé par double opt-in |
| Propriétaire | Yanis, `yanis@yanis-harrat.com`, seul compte admin |
| Fenêtre d'inscription | le court moment où `AUTH_SIGNUP_OPEN` permet de créer le compte admin |
| Scope | une étape de `aidd_docs/ROADMAP.md`, traitée en une session |

## Fonctionnalités v1

- Pages publiques : accueil, parcours, projets, épreuves, contact (avec lien Cal.com), veille.
- Contact : formulaire → fil dans l'admin + notification dans la boîte Infomaniak. Réponse depuis l'admin. Les réponses du recruteur reviennent dans le fil et sont notifiées dans Infomaniak.
- Veille : inscription en double opt-in, désinscription en un clic, rédaction et envoi groupé depuis l'admin.
- Admin : mot de passe puis TOTP, ou passkey seule.
- Hors v1 : pièces jointes entrantes (seuls les noms sont affichés), plusieurs comptes, app native, mode hors ligne, suivi d'ouverture des e-mails.

## Contraintes

- Public : recruteurs et jury BTS, moins de 5 000 visiteurs/mois. Web responsive, pas d'app native.
- Performance réelle (p75, mobile et desktop) : LCP ≤ 2,0 s, INP ≤ 150 ms, CLS ≤ 0,05.
- Lighthouse mobile : Performance ≥ 95, SEO 100, Accessibilité 100, Bonnes pratiques 100.
- Budget 0 € : plans gratuits, passage au payant seulement si une limite est atteinte.
- RGPD obligatoire, recommandations ANSSI comme référentiel volontaire, pas de couche de sécurité maison.
- Un seul développeur, niveau TypeScript/React débutant avancé.
