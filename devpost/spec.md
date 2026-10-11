---
doc: spec
status: approved
---

# Planetary Travel Guide — Technical Spec

Review refinement: Planet optionally includes `sights: { title: string; description: string }[]`. The form offers three pairs, requiring both parts of any supplied card. Existing version-1 snapshots may omit sights; `getSights` supplies initial-planet defaults only for an absent field. Explicit `[]` preserves intentional clearing. New saves include the field. Profile cards show an Unknown empty state. Seed highlights live in `src/data/sights.ts`; factual sources are in CONTENT_SOURCES.md.

## How This Works, In Plain Language
React builds the catalogue, profiles, entry forms, and fictional booking reveal from one collection of planet records. TypeScript describes those records so every part of the app agrees on what a planet contains.

The app starts with eight bundled planet profiles and images. When you save an addition or edit, a small storage layer writes the updated catalogue into this browser's localStorage. The interface only reports success after that write succeeds. When you return using the same browser and address, the app loads your saved catalogue.

Journey time comes from the planet's editable distance and cruising speed. The booking reveal uses that same calculation, plus the planet's packing advice and deadpan survival outlook. Missing details stay unknown.

Vite runs the app locally and builds its static files. No backend, accounts, API keys, or live astronomy calls are needed to use the first version. The storage layer can later be replaced by an API-backed implementation, while preserving most UI components; migration, authentication, and server conflict handling would still need work.

## The Core Journey Through the System
Implements `prd.md > The Core Journey`.
1. Startup calls the catalogue repository. A valid saved catalogue takes precedence; otherwise a fresh installation uses bundled seed records.
2. The catalogue filters these records by trimmed, case-insensitive partial-name search.
3. Selecting a stable planet ID opens its profile. The shared journey utility computes an estimate from distance and speed.
4. Booking expands one itinerary panel using that record's estimate, packing advice, and survival copy. Missing trip fields trigger the warning. Nothing is reserved or charged.
5. Add/edit creates a draft separate from saved data. Save validates it, writes the prospective catalogue through the repository, and only then updates the UI. Cancel discards the draft.
6. Refresh reads the same stored snapshot. It does not append another copy of the eight seeds.

## Stack
- **React + React DOM:** UI components and built-in hooks; [React documentation](https://react.dev/learn/build-a-react-app-from-scratch).
- **TypeScript:** shared record types and strict checking; [documentation](https://www.typescriptlang.org/docs/).
- **Vite + official React plugin:** development and static build; [documentation](https://vite.dev/guide/).
- **Plain CSS:** design tokens and responsive layouts without a UI framework.
- **Browser localStorage:** small JSON catalogue; [Web Storage documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).
- **Vitest (development only):** focused tests of travel calculations, validation, and persistence failures; [documentation](https://vitest.dev/guide/).

Learner accepted React/TypeScript/Vite, plain CSS, and localStorage. Vitest and the detailed module structure are derived implementation choices. No router or global-state library is needed for this small app; use a hash route and React hooks.

Official documentation was checked during planning. Node v24.14.0 and npm 11.21.0 are installed here. Resolved package versions are recorded in `package-lock.json`; the React/TypeScript/Vite stack has passed tests and production builds during `5-build`. Use `npm ci` to reproduce it.

## Where It Runs and How Someone Tries It
The application lives at the current project root, alongside existing curriculum material and `devpost/`. Preserve those files when creating app configuration; do not scaffold over the existing folder blindly.

Requirements: Node 24.x, npm, and a current desktop browser. Dependencies and content assets need network access during preparation; ordinary browsing and booking use bundled data and images. Pasted external image URLs require network access.

After the build exists, from the project root:
```powershell
npm ci
npm run dev
```
Configure `dev` as `vite --host localhost --port 5173 --strictPort`. Open `http://localhost:5173/`. Keeping the host and port fixed keeps the browser storage origin consistent. Do not open the application through a `file://` URL.

Planned checks:
```powershell
npm run test
npm run build
npm run preview
```
`test` runs `vitest run`; `build` runs TypeScript checks and Vite build; `preview` serves the built app at the same localhost:5173 origin with strict port, after stopping the development server. The production output is `dist/`.

Record the local browser demo: browse/search, open a profile, add a minimal planet, show the risk warning, edit/save/refresh, then book a complete planet. A short demo video and public GitHub repository are required for submission. Learner chose local running; no deployment target is selected.

## Look and Feel
Implements `prd.md > Look and Feel` and `Screens and Layout`.
- Updated from learner-supplied cover/grid/profile references during slice 1: near-black `#0b0e14`, ink panels `#161925`, subtle borders `#292c36`, warm off-white `#efede6`, muted text `#c8c6c0`, and orange `#e69b45`.
- System Georgia/Times serif cover title with italic orange Shores; oversized bold system sans-serif grid/profile headings; system monospace metadata. No external font service.
- Code-native decorative SVG orbital diagrams (`src/components/OrbitMap.tsx`) and CSS sphere gradients with bundled planet photographs blended as subtle texture. Planet-specific accents and thin orbit outlines follow the references. Imagery is a stylized treatment, not natural-color scientific visualization; credit notes explain processing. No new scientific values or reference-only features are added.
- Three-column desktop grid, two-column phone grid, and one column at very narrow widths. Profile name/introduction on the left and large circular imagery on the right; stack text then image on phones. Scientific details, atmosphere, artistic interpretation, and booking retain their reading order. The cover is a separate home page; Explore destinations opens the dedicated catalogue route.
- Native buttons and labelled inputs, visible keyboard focus, text accompanying the risk icon, validation messages associated with fields, and save/error feedback announced through a status region. Do not communicate missing information through color alone.

## Components
### App Shell and Navigation
Files: `src/App.tsx`, `src/main.tsx`, `src/components/LandingCover.tsx`.
Implements `prd.md > The Core Journey` and `Screens and Layout`.
Own catalogue data, loading/error feedback, selected route, and temporary search/form/reveal state. Hash routes `#/` (cover), `#/destinations` (searchable catalogue), and `#/planet/<id>` support refresh and browser Back without a routing dependency. Use a 320ms CSS fade and short upward entrance on each keyed page; keep the shared header/footer stable and skip animation for reduced motion. Preserve the search query across route changes, scroll new pages to the top, and focus the main region. In-page anchors retain their current page. Unknown IDs display “Destination not found” and a catalogue action. Add/edit is an inline form surface with a return/cancel action; it does not need its own URL. Clear an old booking reveal when changing planet or saving changed data.

### Destination Catalogue and Planet Card
Files: `src/components/DestinationCatalogue.tsx`, `PlanetCard.tsx`.
Implements `prd.md > Browse and Search`.
Render the welcome banner, search, Add planet, and cards from the repository-backed in-memory catalogue. Filter names without changing stored data. Each card shows name, description, and formatted reference distance; missing distance shows Unknown. Empty results provide clear-search action. Card identity uses ID, not name, so changing a name or using duplicate names does not overwrite another record.

### Planet Profile and Planet Image
Files: `src/components/PlanetProfile.tsx`, `PlanetImage.tsx`.
Implements `prd.md > Read Planet Profiles`.
Render the image/name/introduction, scientific details, atmosphere, artistic interpretation, edit action, and booking button. Use shared distance/time formatting and the movement/speed notes. PlanetImage handles blank/broken images with a bundled neutral placeholder and meaningful alternative text.

Profile cards also expose packing advice and the survival label/details before booking, using the same saved record and Unknown fallback as the itinerary. Discover your holiday focuses and smoothly scrolls to #profile-details, before the scientific information. Profile chapter sections have labelled headings, dividers, consistent spacing and scroll offsets. Section-navigation buttons focus and scroll to each chapter; reduced-motion preferences use immediate scrolling. Keep these fictional interpretations clearly labelled.

### Planet Entry Form
File: `src/components/PlanetForm.tsx`.
Implements `prd.md > Add and Edit Planets`.
Fields cover all editable record values below. Name and description are required. Numeric fields may be blank; supplied distances must be finite and nonnegative, and supplied cruising speed finite and greater than zero. Blank numbers become null, never zero by accident. Blank optional text remains unknown. Seed image paths are preserved when unchanged; replacement image input accepts a pasted HTTP(S) image URL or blank for the placeholder. Reject invalid URL schemes with a field explanation.

Save creates or replaces one record by ID. New IDs use `crypto.randomUUID()`. Write the complete prospective snapshot through the repository before committing it to UI state; disable repeated submissions during saving. Errors retain the draft and offer retry. Cancel restores the saved view. Derived journey time is edited through its distance and speed inputs, with a live estimate preview.

### Holiday Reveal
File: `src/components/HolidayReveal.tsx`.
Implements `prd.md > Book and Reveal the Holiday Verdict`.
Booking now opens TravelPass.tsx at #/pass/<id>, gated by an in-memory booked-record snapshot. Direct entry or refresh without that snapshot offers a return to details. Close clears the snapshot and returns focus to Book the package on the originating profile. Download pass uses an escaped standalone HTML document from lib/travelPass.ts, a Blob URL revoked on unmount, and a safe destination-based filename. No runtime service or new dependency. Show “Travel booked!”, fictional-trip label, journey estimate, packing advice, and qualitative survival label/sentence. Detect missing trip details through shared utility, not duplicated UI conditions. A missing estimate, blank packing advice, or incomplete survival label/sentence adds the button's risk icon/text and the reveal's exact warning: “Details unknown. Book at your own risk.” Keep known information visible. Only the latest booked trip is held in memory; saving edits invalidates it. Booking is not persisted; the downloaded pass can be kept.

### Catalogue Repository
Files: `src/lib/catalogueRepository.ts`, `localCatalogueRepository.ts`, `src/hooks/useCatalogue.ts`.
Implements `prd.md > Add and Edit Planets` and `States and Boundaries`.
Interface:
```ts
interface CatalogueRepository {
  load(): Promise<Planet[]>;
  save(planets: Planet[]): Promise<void>;
}
```
The local adapter stores `{ schemaVersion: 1, planets: Planet[] }` under `planetary-travel-guide.catalogue.v1`. Absent data returns a fresh copy of the eight seeds. Validate parsed data at the boundary, including schema version, record shape, unique IDs, and numeric constraints. A corrupt/unsupported snapshot produces a visible storage error, is not overwritten, and allows browsing a read-only seed catalogue for the session. For a write failure, retain the draft and last saved catalogue; show a retryable message. A future HTTP adapter can implement the same asynchronous methods, but no speculative backend is built now.

### Journey and Validation Utilities
Files: `src/lib/journey.ts`, `validation.ts`.
Implements `prd.md > Read Planet Profiles`, `Add and Edit Planets`, and `Book and Reveal the Holiday Verdict`.
`hours = distanceFromEarthKm / cruiseSpeedKmh`; null distance or missing/invalid speed yields unknown. Preserve zero as a known distance: Earth is a local staycation with zero journey time. Default cruising speed for a newly opened form and initial seeds is the fictional 100,000 km/h; users can change it or clear it to unknown. Format the same estimate in profile and reveal; include units and avoid non-finite output. Missing-trip detection requires a valid estimate, packing advice, survival label, and survival sentence.

### Initial Content and Assets
Files: `src/data/planets.ts`, `public/images/planets/`, `CONTENT_SOURCES.md`.
Implements `prd.md > Read Planet Profiles` and the complete-destination booking criteria.
Eight complete seed records with documented factual sources, bundled realistic images, image credits, imaginative living-there text, packing advice, and deadpan verdicts. Curated content is bundled and editable; no LLM or astronomy API is called at runtime.

**Proposed reference-distance convention for review:** use rounded illustrative separations based on the absolute difference between Earth's and the planet's approximate mean orbital radii, sourced from NASA/JPL orbital data. This is an orbital-radius-gap example, not current separation, a time average, or a flight trajectory. Earth is zero. Label this convention alongside the movement note, and document the source values and rounding in `CONTENT_SOURCES.md`. Users can replace the reference distance with their own researched estimate. Distance from the Sun/host star remains a separate editable scientific field.

This convention is an agent proposal, not a previously chosen learner decision. It keeps one explicitly explained number per card without introducing live orbital tracking. Exact source values and scientific copy must be verified during the build; this spec does not establish those facts.

## Data Model
File: `src/types/planet.ts`.
```ts
type Planet = {
  id: string;                    // stable, not editable
  name: string;                  // required, trimmed
  description: string;           // required, trimmed
  imageUrl: string | null;       // bundled seed path or pasted HTTP(S) URL
  distanceFromEarthKm: number | null;
  distanceBasis: string | null;  // editable note describing the reference value
  distanceFromStarKm: number | null;
  cruiseSpeedKmh: number | null;
  atmosphere: string | null;
  livingThere: string | null;     // labelled artistic interpretation
  thingsToBring: string | null;
  survivalLabel: string | null;
  survivalDescription: string | null;
};
```
Planet records live in the seed file initially, then in the saved full snapshot and React memory. User edits replace records by ID; new records append. Journey time and risk status are derived, never separately stored, preventing contradictory displays. Search query, form draft, booking expansion, and save feedback live only in memory. Hash route survives refresh; browser localStorage supplies the catalogue for that route. Source/credit documentation lives in the repository, outside the personal learner profile.

## File Structure
Planned app files; existing curriculum folders and learning docs are preserved.
```text
far-shores/
├── .gitignore                     # preserve profile/credential exclusions; add build outputs
├── index.html                     # Vite entry
├── package.json                   # dev/build/test/preview scripts
├── package-lock.json              # resolved dependency versions
├── tsconfig.json                  # strict app TypeScript settings
├── tsconfig.node.json             # config-file TypeScript settings, if needed
├── vite.config.ts                 # React plugin, fixed local port, Vitest config
├── README.md                      # startup, local-storage behavior, demo instructions
├── CONTENT_SOURCES.md             # factual sources, distance convention, image credits
├── public/images/planets/
│   ├── mercury.webp               # verified and credited seed image
│   ├── venus.webp
│   ├── earth.webp
│   ├── mars.webp
│   ├── jupiter.webp
│   ├── saturn.webp
│   ├── uranus.webp
│   ├── neptune.webp
│   └── unknown.svg                # neutral placeholder
├── src/
│   ├── main.tsx                   # mount React
│   ├── App.tsx                    # hash navigation and surface coordination
│   ├── styles.css                 # tokens, layout, responsive and focus styles
│   ├── types/planet.ts            # Planet and storage-envelope types
│   ├── data/planets.ts             # complete eight-planet seed catalogue
│   ├── hooks/useCatalogue.ts      # load/save lifecycle and repository injection
│   ├── components/
│   │   ├── DestinationCatalogue.tsx
│   │   ├── PlanetCard.tsx
│   │   ├── PlanetImage.tsx
│   │   ├── PlanetProfile.tsx
│   │   ├── PlanetForm.tsx
│   │   └── HolidayReveal.tsx
│   └── lib/
│       ├── catalogueRepository.ts # asynchronous storage interface
│       ├── localCatalogueRepository.ts
│       ├── journey.ts             # estimate, formatting, missing-trip detection
│       ├── validation.ts          # form/storage boundary validation
│       ├── journey.test.ts        # zero/unknown/invalid/known journey cases
│       ├── validation.test.ts     # minimal entry and invalid inputs
│       └── localCatalogueRepository.test.ts # round-trip and failure behavior
└── devpost/                       # canonical plans and visual companions
```
Actual file extensions for downloaded seed images may reflect their original format; maintain matching references and credits. No generated dependency contents or dist files are committed.

## External Services and Dependencies
No runtime API, database, hosting service, or API credentials. Custom images cause the browser to issue an ordinary image GET to the supplied URL, with no app-auth payload; unavailable images use the placeholder. NASA/JPL pages are build-time research sources, not runtime dependencies:
- [NASA planet overview and linked planet profiles](https://science.nasa.gov/solar-system/planets/) for facts and image discovery.
- [JPL approximate planetary positions and orbital elements](https://ssd.jpl.nasa.gov/planets/approx_pos.html) for the documented reference-distance convention.
- [NASA image/media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/) for credit and asset-use checks.
Record individual source/asset links and credits during content preparation. No paid service is required by this architecture; no runtime service contracts or rate limits apply.

## Important Failure Modes
- **Save blocked or quota exceeded:** retain unsaved input and previous saved state; report failure and allow retry. Never show false save success.
- **Stored JSON corrupt or unsupported:** preserve it, show a storage error, and offer read-only seed browsing rather than silently discarding personal entries.
- **Unknown or invalid optional details/image:** render Unknown or placeholder; reject invalid supplied numbers/URLs in the form; keep missing-detail booking warning available.

## Verification Approach
Trace checks directly to `prd.md > Features and Behavior`:
- Unit tests cover estimate consistency and Earth zero, null/invalid values, risk detection, minimal form validation, storage round-trip, no duplicate seeding, and read/write failures. Use an injected storage object to simulate blocked/quota failures.
- TypeScript checks and static production build must pass.
- In the browser, exercise all PRD acceptance criteria: search/no results, seed profile order/notes, complete booking, minimal added entry and risk reveal, edits, Cancel, and refresh persistence at the fixed origin.
- Inspect desktop and narrow layouts; keyboard navigation, focus, field errors, status feedback, and image fallback. Check unfamiliar IDs and repeated booking clicks.
- Verify science, imagery, credits, and clear factual/fictional labels. The storage replacement boundary is inspected in code, not implemented as a second backend.

## What Was Simplified and Why
- Bundled curated facts/images keep the educational core usable without live service availability.
- Browser storage serves single-browser personal use; an asynchronous repository boundary leaves room for later backend work.
- Image URL editing avoids uploads and asset-storage infrastructure.
- Fictional constant-speed travel estimates make assumptions visible without mission simulation.
- Hash routes, React hooks, and plain CSS cover this small product without extra routing or UI libraries.

## Decisions and Open Issues
**Learner-agreed:** recommended stack and browser storage; future-backend storage boundary; pasted image URLs; editable distance and cruising speed with a fictional 100,000 km/h default and derived journey time; local running and recording without deployment.

**Useful uncertainty discussed:** “We can add a backend later?” Clarified that a repository interface separates saving/loading from UI components, while a future backend still requires data migration, server storage, and account/shared-data decisions. The learner accepted the approach. During build, verify that UI components do not call localStorage directly.

**Derived implementation details:** module/file structure, hash navigation, schema versioning, validation and error handling, focused Vitest tests, responsive CSS, and the explicit risk-completeness rule implement the approved PRD.

**Review resolved:** the learner approved the displayed technical plan, including the agent-proposed orbital-radius-gap reference-distance convention. Other agreed estimate behavior stays unchanged.

**Early build checks:** resolve compatible package versions and run the toolchain; verify individual facts and assets with source links; calculate and document rounded reference distances. No scientific data or app implementation has been verified yet. This technical plan is approved and ready for `5-build`.

Pass layout refinement: Download pass and Close share the top action row. Compact desktop ticket sizing fits the viewport; unusually long content scrolls inside a focusable ticket. On phones the content stacks without a fixed height.
