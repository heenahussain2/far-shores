# Far Shores — Small improvements checklist

- [x] Faster access to cards: clicking Destinations while in the catalogue scrolls to the destination list and focuses its heading.
- [x] Previous/next planets: add named links beneath each profile, using catalogue order and wrapping at either end.
- [x] Sticky chapter navigation: keep chapter links visible, highlight the current chapter, and use a compact horizontal strip on mobile.
- [x] Best-for labels: add a short editorial recommendation to each initial planet card and a sensible fallback for custom destinations.
- [x] Pass stamp animation: animate the confirmation stamp once when a pass opens; disable it for reduced motion.

## Verification

- [x] Production build and existing tests pass (34 tests across four suites).
- [x] Browser checks: catalogue shortcut focuses its heading; all eight seeded labels and the custom fallback render; Mars links to Earth/Jupiter and Next opens Jupiter; sticky navigation tracks Sights and Packing with headings below the strip; 390px layout has no horizontal page overflow; booking opens the pass with the stamp animation applied.
- [x] Reduced motion: inspected the loaded stylesheet rule disabling the stamp animation. OS preference was not changed during verification.

Test runner note: the sandbox's default temporary directory initially caused Vitest file-loading errors. Tests passed with TEMP/TMP set to node_modules/.cache/test-temp for that command only; application configuration was unchanged.
