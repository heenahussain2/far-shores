# Far Shores

A planetary travel guide: explore real planets as imagined holiday destinations.

## Run locally

Use Node 24.x and npm. From this folder:

```powershell
npm ci
npm run dev
```

Open http://localhost:5173/. The fixed host and port preserve the same browser-storage origin as later slices add saving. Do not open index.html directly.

```powershell
npm run test
npm run build
```

For the built version, stop the dev server and run `npm run preview`, also at localhost:5173.

## Current build checkpoint

Slice 1: browse and search eight planets, open profiles, and book a fictional holiday to reveal journey estimates, packing copy, and survival outlooks. Add/edit and persistence follow in slices 2–3; this checkpoint reads bundled data only.

The home cover links to the separate catalogue at `http://localhost:5173/#/destinations` with a brief page transition (disabled for reduced motion). Try partial or mixed-case search, clear a search with no matches, visit Earth for the zero-hour staycation, and book another destination twice. Browser Back returns to the catalogue with its search query preserved. No real reservation is created.

## Content and credits

See [CONTENT_SOURCES.md](CONTENT_SOURCES.md) for factual sources, distance conventions, and image credits. Initial images are bundled; ordinary use needs no runtime astronomy service, account, or API key. `scripts/download-assets.ps1` can re-download the eight NASA images if needed. All holiday scenes, packing briefs, and survival copy are artistic interpretation, not real travel guidance.

## Project notes

Canonical product and technical plans and the build checklist live in `devpost/`. The personal learner profile and local environment files are ignored by Git. Existing curriculum folders are preserved separately from the app in `src/`.
