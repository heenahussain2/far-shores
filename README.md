# Far Shores

A planetary travel guide: explore real planets as imagined holiday destinations.

## Run locally

Use Node 24.x and npm. From this folder:

```powershell
npm ci
npm run dev
```

Open http://localhost:5173/. Keep the same browser, host and port to retain access to your saved catalogue. Do not open index.html directly.

```powershell
npm run test
npm run build
```

For the built version, stop the dev server and run `npm run preview`, also at localhost:5173.

## Try the guide

Browse and search eight initial planets, open profiles, and book a fictional holiday to reveal journey estimates, packing advice, and survival outlooks. Add planet creates your own destination; Edit planet updates an existing one. Only name and description are required. Missing optional details stay Unknown, and incomplete trips remain bookable with a warning.

The home cover links to the separate catalogue at `http://localhost:5173/#/destinations` with a brief page transition (disabled for reduced motion). Try partial or mixed-case search, clear a search with no matches, visit Earth for the zero-hour staycation, and book another destination twice. Browser Back returns to the catalogue with its search query preserved. No real reservation is created.

For the full demo: add a destination with a name and description, book it to see the unknown-details warning, then edit its distance, cruising speed, packing advice and survival outlook/details. Save, book again and refresh the profile. Completing those trip fields removes the warning. Try Cancel to keep the saved version.

## Browser saving

Save writes the full catalogue to localStorage before reporting success. Additions and edits stay in this browser at this origin; there are no accounts or cross-device sync. Duplicate names are allowed because destinations have stable IDs. Unsaved drafts, search and booking reveals are temporary.

If saving is blocked or storage is full, your draft stays open for retry and the saved catalogue remains unchanged. If stored data cannot be read or validated, the original planets appear in read-only mode with a visible error and Retry loading action. The app preserves that stored snapshot. Clearing browser site data removes personal additions and edits; private browsing may discard them when the session ends.

Images may use HTTP(S) URLs or a blank field for the placeholder. Unchanged bundled images are preserved; unavailable remote images fall back to the illustration. Remote images need network access.

## Content and credits

See [CONTENT_SOURCES.md](CONTENT_SOURCES.md) for factual sources, distance conventions, and image credits. Initial images are bundled; ordinary use needs no runtime astronomy service, account, or API key. `scripts/download-assets.ps1` can re-download the eight NASA images if needed. All holiday scenes, packing briefs, and survival copy are artistic interpretation, not real travel guidance.

## Project notes

Canonical product and technical plans and the build checklist live in `devpost/`. The personal learner profile and local environment files are ignored by Git. Existing curriculum folders are preserved separately from the app in `src/`.

## Travel pass

Book the package opens a separate confirmation page. Download pass saves a self-contained HTML file you can open in a browser or print. Close returns to that destination’s details. The pass page requires a booking from the details page; booking is temporary and a refresh requires booking again. Downloaded files remain available independently of browser catalogue storage.
