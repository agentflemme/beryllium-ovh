# beryllium-ovh

Portail public SvelteKit (Svelte 5) de supervision et d'information pour une infrastructure
auto-hébergée gérée selon le principe de **remboursement de frais au franc le franc**
(sans but lucratif).

- **Statut en direct** des nœuds (Beszel) et des tunnels/sites (Pangolin), agrégés via un
  proxy serveur — **aucun secret n'est jamais exposé au navigateur**.
- **Mentions légales** (`/legal`) : statut non diffusible (art. R. 123-232 C. com.),
  transparence des coûts (≈ 170 W @ 0,22 €/kWh, bastion VPS, domaine), clause de dons.
- **CGU / AUP** (`/tos`) : obligation de moyens (best effort, zéro SLA), sauvegardes
  hors-site à la charge de l'utilisateur, exclusion de responsabilité, AUP conforme LCEN.

## Stack

- SvelteKit 2 / Svelte 5 (runes), Vite 7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `@sveltejs/adapter-node` — les pages légales sont *prerendered* (statiques), `/` et
  `/api/status` sont dynamiques
- Aucune base de données : les données sont soit statiques, soit récupérées en direct
  via les APIs Beszel / Pangolin côté serveur

## Développement

```sh
nix develop          # fournit Node.js 24
npm install
cp .env.example .env # puis renseigner vos identifiants
npm run dev
```

## Variables d'environnement

| Variable | Description |
| --- | --- |
| `BESZEL_URL` | URL du hub Beszel, ex. `http://127.0.0.1:8090` |
| `BESZEL_EMAIL` | Identifiant admin Beszel |
| `BESZEL_PASSWORD` | Mot de passe admin Beszel |
| `PORT` / `HOST` | Écoute du serveur adapter-node (défaut `3000`) |

Les variables lues via `$env/static/private` (avec repli sur `$env/dynamic/private`)
restent **côté serveur uniquement** : `src/routes/api/status/+server.js` renvoie un JSON
sanitisé (`success`, `timestamp`, `nodes[]`, `monitors[]`) et ne divulgue ni mot de passe,
ni token, ni clé API.

L'endpoint garde le dernier instantané en mémoire (15 s « frais » / 5 min « stale »,
avec un seul rafraîchissement en arrière-plan — stale-while-revalidate) : une lenteur de
Beszel (authentification bcrypt) ne bloque donc jamais les requêtes suivantes. La page
`/status` s'affiche immédiatement avec des squelettes de chargement (« skeleton ») et
récupère la télémétrie côté client dès qu'elle est disponible.

## Animations

- Transitions d'entrée à chaque changement de page (wrapper re-keyé dans
  `src/routes/+layout.svelte`, classe `.page-enter`).
- Entrée en cascade du hero et apparition au défilement des sections
  (`use:reveal` — `src/lib/actions/reveal.js`).
- Squelettes de chargement sur `/status`, survol des cartes (`.lift`), menu
  déroulant animé — le tout désactivé si `prefers-reduced-motion: reduce`.

## Build & exécution

```sh
npm run build   # sortie dans build/
npm start       # node build (adapter-node)
```

Avec le flake Nix :

```sh
nix build       # buildNpmPackage → $out (build/ copié dans le résultat)
```

## Personnalisation

- Domaine, e-mail de contact, constantes de coût : `src/lib/config.js`
- Heuristique de type de nœud (Bare Metal / VPS Tunnel) : fonction
  `guessNodeType()` dans `src/routes/api/status/+server.js`
- Thème : palette `@theme` dans `src/app.css`


