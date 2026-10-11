---
doc: checklist
status: approved
---

# Far Shores — Build Checklist

Build mode: fast

## Slices

- [x] **1. Explore eight destinations and book a fictional holiday**
  Becomes usable: Browse and search the eight planets, open a destination profile, and reveal its fictional itinerary, packing advice, and survival outlook in the approved Far Shores editorial design.
  Why now: Proves the unique holiday-learning idea immediately and gives early feedback on the content and visual direction. Bootstrapping and factual research support a usable journey rather than separate setup tasks.
  PRD ref: `prd.md > The Core Journey`, `Browse and Search`, `Read Planet Profiles`, `Book and Reveal the Holiday Verdict`, `Look and Feel`.
  Spec ref: `spec.md > Stack`, `Where It Runs and How Someone Tries It`, `Look and Feel`, `Components > App Shell and Navigation`, `Destination Catalogue and Planet Card`, `Planet Profile and Planet Image`, `Holiday Reveal`, `Journey and Validation Utilities`, `Initial Content and Assets`, `Data Model`, `File Structure`.
  Build: Set up React/TypeScript/Vite and focused Vitest checks in the existing folder, preserving curriculum and plans. Add build-output ignores, startup scripts, README, typed seed records, verified factual content and credited bundled images, hash navigation, search, profiles, shared journey formatting, placeholder images, and the booking reveal. Use the approved reference-distance convention and fictional speed; document facts, images, and rounding in CONTENT_SOURCES.md. Start with the bundled catalogue in memory; editing follows later.
  Verify (mechanical): Run npm run test for known/zero/unknown/invalid journey values and missing-trip detection; run npm run build. Start at localhost:5173 and inspect all eight cards, partial/case-insensitive search and clear/no-results, profile order and estimate notes, Earth zero, booking without duplicate panels, hash navigation/unknown IDs, image fallback, and desktop/narrow layouts. Verify source links and credits against seed content.
  Learner check: Run npm run dev and open http://localhost:5173/. Search for a planet, open it, read its profile, and book the package; try Earth too. Describe how the look, reading flow, and holiday verdict compare with your idea.
  Commit: `Build destination browsing and fictional holiday itineraries`

- [x] **2. Add your own destinations and keep them after refresh**
  Becomes usable: Create a planet with just a name and description, find it in search, open its profile, and book it with the missing-details warning. Saved additions survive refresh in this browser.
  Why now: Extends the proven travel journey to personal learning and tests the storage boundary before adding edits to existing destinations.
  PRD ref: `prd.md > Add and Edit Planets`, `Read Planet Profiles`, `Book and Reveal the Holiday Verdict`, `States and Boundaries`.
  Spec ref: `spec.md > Components > Planet Entry Form`, `Catalogue Repository`, `Journey and Validation Utilities`, `Data Model`, `Important Failure Modes`.
  Build: Add the full-field creation form with required-field and numeric/URL validation, unknown optional fields, live journey preview, Save/Cancel, and stable UUIDs. Implement the asynchronous repository, validated versioned localStorage snapshot, and catalogue hook. Write before updating saved UI state; retain drafts on failed saves. Preserve invalid stored snapshots and provide a visible read-only seed fallback. Keep localStorage calls out of UI components.
  Verify (mechanical): Run npm run test for minimal/invalid form inputs, blank versus zero numbers, URL rules, storage round-trip/no duplicate seeds, unsupported/corrupt snapshots, and blocked/quota errors with injected storage; run npm run build. In the browser add a minimal entry, find and book it with the exact warning, refresh its hash route, cancel another addition, and try invalid inputs without losing the draft. Confirm only saved changes appear and persistence is reported accurately.
  Learner check: Add an imagined destination with only a name and description, find it through search, and book it. Refresh and confirm it remains available with optional details marked Unknown; try cancelling another entry.
  Commit: `Add custom destinations with validated browser persistence`

- [x] **3. Edit destinations and complete their travel details**
  Becomes usable: Edit any initial or custom destination, change its image, distance, cruising speed, and travel advice, then save and refresh. Completing missing trip information removes its warning.
  Why now: Completes the learning-maintenance loop on top of the verified form and persistence behavior, then checks the integrated proof of concept.
  PRD ref: `prd.md > Add and Edit Planets`, `Book and Reveal the Holiday Verdict`, `States and Boundaries`, `What We're Building`.
  Spec ref: `spec.md > Components > Planet Entry Form`, `App Shell and Navigation`, `Catalogue Repository`, `Journey and Validation Utilities`, `Verification Approach`, `Important Failure Modes`.
  Build: Reuse the form for edits by stable ID, preserve unchanged seed image paths, retain saved values on Cancel, clear stale booking reveals after edits, and show accessible save/error feedback. Finish integrated keyboard, narrow-layout, field-error, image fallback, and storage-recovery behavior. Update startup and demo documentation to match the finished app.
  Verify (mechanical): Run npm run test and npm run build. In the browser edit a seed and a custom entry, verify card/profile consistency and refreshed persistence, test duplicate names without overwriting IDs, Cancel, changed distance/speed with matching profile/reveal estimates, zero and cleared values, invalid image URLs and broken-image fallback. Complete missing trip fields and confirm the warning disappears; simulate failed saves and corrupt storage without false success or data overwrite. Check the full PRD acceptance journey with keyboard and desktop/narrow layouts; inspect the repository boundary in code.
  Learner check: Edit your added planet with distance, speed, packing advice, and survival details; save, book, and refresh. Edit an initial planet, try Cancel, and explore the complete app for anything broken, confusing, or worth refining.
  Commit: `Complete editable destination profiles and integrated journey checks`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1, before committing it and building the addition/editing flows
- [x] Final kick-the-tires exploration and feedback completed — after slice 3 verification; may share its learner-check session

Learn mode uses each slice's learner check before its commit. Fast mode pauses for early feedback and final exploration; additional checks are available when useful.

Slice 1 checkpoint: learner accepted the revised appearance and navigation and requested the next stage. All 11 journey/risk tests pass; TypeScript and production build pass. Browser checks passed for all eight bundled images, trimmed mixed-case search, no-results/clear, profile reading order and estimate notes, consistent Mars profile/reveal estimates, Earth zero, repeated booking without duplicates, unknown IDs, and keyboard focus. A temporarily missing Mercury image verified card/profile placeholder behavior; the real image reference was restored. Desktop and 390px viewport layouts inspected without horizontal overflow. Local dev server is running at http://localhost:5173/. Add/edit and persistence remain planned for slices 2–3.

## Final Review

- [x] Learner retry: What you’ll see section with three numbered highlights per initial planet, optional editable custom sights, and backward-compatible saved catalogues.

- [x] Learner retry: booking opens a separate pass page with Download pass and Close back to details. HTML download includes the same journey/packing/survival data; direct pass entry requires an active booking.

- [x] Learner retry: packing advice and survival label/details now appear as profile cards before booking; Discover your holiday scrolls to the beginning of the details, above the science section. Requested during final review because these details were previously visible only after booking.

- [x] Final review complete — feedback resolved and learner confirms ready to ship

Record agreed fixes here as unchecked items. Verify and commit each fix, then have the learner retry affected behavior before marking it complete. Learner explored the app, supplied the recorded refinements, and requested moving to the final part on 2026-10-11; this closes the review.

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Brief evidence-based recap of the Discover navigation feedback, its observable acceptance condition, implementation and desktop/mobile focus/scroll verification. Prior hands-on review supplied the practice; no repeated exercise.
Route and stops: Reference route in app-map.html: PlanetForm.submit -> App.savePlanet -> useCatalogue.save and localCatalogueRepository. Not an interactive tour.
Edit outcome: Not applicable to this recap; prior learner-directed UI revisions supplied the practical change.
Reflection: Optional transfer question offered at handoff; no answer required. Personal reflection belongs only in the ignored learner profile.
Activity mode: Brief recap connected to prior practice for fast mode; standalone offline app map prepared and opened.

## Revisions

- Added the requested “Choose your shore ↓” button below the catalogue introduction. It scrolls to the grid heading without changing routes, respects reduced motion, and places keyboard focus so the next Tab reaches catalogue controls. Production build passes; desktop/mobile scrolling, focus, and narrow-width overflow checked.

- Learner requested a separate “Choose your shore” page and a smoother transition from the cover. Split LandingCover from DestinationCatalogue, added the dedicated #/destinations route, updated header/profile links and planning docs, and added a short CSS fade-and-slide page transition with reduced-motion handling. Slice 1 remains at the early feedback checkpoint.
- Navigation verification passed for cover/catalogue separation, direct catalogue refresh, browser Back, returning from a profile with the search query retained, and rapid successive links. Replaced the initially tried native snapshot transition with a 320ms CSS entrance after browser checks showed quick clicks could be swallowed. Existing tests and production build pass.

- Updated slice 1 styling from the learner's three Far Shores references: serif magazine cover, bold grid and profile typography, near-black/off-white/orange palette, decorative orbital diagrams, tinted photographic planet spheres, and text-left/image-right desktop profiles. Updated PRD/spec to match. Kept eight planets and existing calculations; reference-only prices, gravity tools, comparisons, and alternate destinations are outside this styling request. Awaiting learner retry of the revised appearance before completing the early checkpoint.
- Verified the styling revision: all 11 existing tests and production build pass; desktop and 390px phone cover/grid/profile layouts inspected without horizontal overflow. Search and booking still work; the profile's holiday anchor retains the selected destination. Browser console has no errors or warnings. No commit yet: early-checkpoint feedback on the revised appearance is pending.

- Slice 2 verified: 29 tests pass (outside the sandbox after its temporary-cache access failed); TypeScript/production build pass. Browser checks covered required/invalid fields with retained draft, minimal custom entry, exact missing-details booking warning, saved hash refresh, trimmed mixed-case search, and Cancel. Replaced deferred navigation focus with layout-time focus after a fast-input browser check exposed a focus race. Storage tests cover corrupt/unsupported snapshots, blocked access and quota failures.

- Slice 3 implementation and agent verification: reuse the form for edits by stable ID; Cancel restores values and keyboard focus, unchanged seed image paths survive saves, and form exit resets the old booking reveal. Browser checks passed for seed/custom edits and hash refresh, duplicate names, changed/zero/cleared distance and speed, live/profile/reveal estimate consistency, completed trip fields removing the risk warning, and a broken replacement image falling back. An isolated temporary in-memory browser fixture proved failed-save draft retention/retry without false success, corrupt data disabling add/edit, and Retry loading recovery; fixture removed afterward. README now covers the full demo and storage limits. Awaiting final learner hands-on feedback before slice 3 commit.

- Final agent checks: all 29 tests and TypeScript/production build pass. Confirmed no UI localStorage calls outside the adapter, no unexpected browser console warnings/errors, 390px form/profile/catalogue without horizontal overflow, name-to-description Tab order, grid-jump focus, and Cancel focus restoration. Temporary viewport override reset. The last slice remains unchecked until the planned learner review and commit; final-review completion and learning wrap-up remain pending.

- Profile-card review fix verified: production build passes; Mars packing and survival label/details render before booking, Discover your holiday scrolls to the cards, and the 390px layout has no horizontal overflow. Existing atmosphere/living-there cards remain visible. Learner retry remains pending.

- Learner requested separate booking confirmation, pass download and Close. Replaced inline reveal with an in-memory gated #/pass/<id> page; downloadable HTML is escaped, self-contained and printable. Close restores the originating profile and booking-button focus; refresh requires booking again. Updated affected product/technical docs and README. No external booking service or additional dependency.

- Pass-page verification: all 32 tests and production build pass. Browser verified booking navigation, actual HTML download with Mars/32.5-day/packing content, Close returning to Mars with booking-button focus, no inline confirmation, Back after Close and refresh showing the no-booked-trip guard, and 390px layout without horizontal overflow. Desktop preview saved; viewport reset. Final learner retry remains pending.

- Sight cards verified: all 34 tests and production build pass. Browser checks confirmed legacy saved Mars shows its three default sights, edits persist through refresh, the original title was restored, and the 390px profile has no horizontal overflow. Validation covers title/description pairs, malformed stored sights, absent legacy fields and intentionally empty arrays. Updated product/spec and factual source notes. Final learner retry remains pending.

- Profile navigation refinement requested by learner: Discover now targets the beginning of the details instead of a packing card partway down the page. Separated facts, life/atmosphere, sights and packing/survival into numbered chapters with borders, consistent spacing and accessible smooth-scroll navigation. Preserved the route and reduced-motion handling. Production build passes; desktop landing verified at 32px with scientific heading visible before atmosphere.

- Compact pass refinement: moved Download pass beside Close above the ticket, reduced heading/padding/spacing and overall width. Desktop tickets have a viewport-height limit with keyboard-accessible internal scrolling for unusually long content; phones retain a readable stacked layout. Production build passes. At 1280x720 the Mars ticket fits entirely from y=179 to y=558 without internal scrolling; 390px layout has no horizontal overflow. Download link still uses the same verified Blob/file logic. Learner retry remains pending.

Catalogue intro refinement: reduced heading, orbit size, and opening spacing so the introduction and Choose your shore button fit at 1280 x 720 and 390 x 844. Verified smooth jump focuses the grid heading at a 32px offset; production build passes. Final learner review remains pending.

Catalogue visual revision after learner feedback: replaced the wide two-line heading with a deliberate stacked title and amber italic tagline, enlarged the orbit illustration, and separated the grid with a full opening view and divider. Desktop 1280 x 720 and phone 390 x 844 keep the CTA visible; smooth jump and production build verified. Final learner review remains pending.

Form refinement: added a top Cancel control to the shared edit/new destination form, disabled during saving like the bottom control. Browser verified that cancelling a changed name returns to Mars and reopening retains the saved name. Production build passes.


Final verification on 2026-10-11: all 34 tests pass outside the sandbox (sandbox temporary-cache access prevents test collection); TypeScript and production build pass. Existing integrated browser evidence and final top-Cancel check cover the reviewed journey. Learner requested moving to the final part after the refinements. Build handoff includes the offline app map.

Shipping follow-up: learner authorized publishing the remaining UI improvements. Reviewed catalogue shortcut, previous/next navigation, active sticky chapters, editorial Best for labels, and pass stamp animation. Production build and all 34 tests pass; prior browser evidence is recorded in IMPROVEMENTS.md. App map updated with the new entry points.
