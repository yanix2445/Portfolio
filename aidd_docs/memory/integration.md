# Integration

Carte des services : [ecosystem.md](ecosystem.md).

## Services externes

- **E-mails, exception stricte** (validée le 15/10/2026) :
  - **Envoi** : uniquement par le composant `@convex-dev/resend` (`convex/lib/resend.ts`).
  - **Réception** : uniquement par Resend Receiving : webhook signé vers `convex/http.ts`, traité dans `convex/contact/inbound.ts`, texte lu avec le SDK officiel `resend`. Le composant ne sait pas recevoir, et le SDK ne sert à rien d'autre.
- **Cloudflare Turnstile** : script officiel chargé depuis Cloudflare, sans paquet tiers. Jeton vérifié dans Convex (`convex/lib/turnstile.ts`, Siteverify). Protège le quota Resend et la réputation du domaine.
- **Vercel Web Analytics + Speed Insights** : mesure sans cookie. Les liens de la veille portent `?utm_source=veille`.
- **Infomaniak** : reste la boîte mail de Yanis. Les notifications y arrivent.

## Conventions d'appel

- Tout mail adressé au recruteur part de `Yanis Harrat <yanis@yanis-harrat.com>`, avec une adresse de réponse propre au fil : `c-<id>@reply.yanis-harrat.com`. Le sous-domaine `reply.` a son MX chez Resend, la racine reste chez Infomaniak.
- Réception : signature du webhook vérifiée, mail accepté seulement si l'adresse correspond à un fil existant, résultat SPF/DKIM/DMARC affiché, texte brut uniquement (pas de HTML, donc pas d'injection), pièces jointes ignorées.
- La notification « nouvelle réponse » contient le texte et le lien du fil. On répond depuis le panel, pour que le fil reste complet.
- Suivi des ouvertures et des clics Resend **désactivé** : un pixel de suivi exige un consentement préalable (CNIL).
- Quota Resend gratuit : 100 e-mails/jour, envois et réceptions compris. Une veille envoyée à plus de ~90 abonnés devra être étalée.
