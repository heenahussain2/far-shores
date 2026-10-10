---
doc: prd
status: approved
---

# Planetary Travel Guide — Product Requirements

A personal astronomy guide for exploring planets as fictional holiday destinations and maintaining the catalogue as you learn.
Source: `scope.md > Who It's For`, `The Unique Kernel`, and `The POC Boundary`.

## The Core Journey
1. Open the guide's cover and choose “Explore destinations” to enter the separate destination catalogue through a brief, smooth page transition.
2. On the catalogue page, browse eight initial planets, search by name, or use “Add planet”; select a card to open its profile.
3. Read the introduction, scientific details, atmosphere, and imaginative account of life there.
4. Click “Book the package” to reveal “Travel booked!”, an approximate journey time, things to bring, and a deadpan survival outlook. The trip is explicitly fictional.
5. Return to the catalogue to explore another destination, or add/edit a planet. Saved entries and edits remain after refreshing in the same browser.

Source: `scope.md > The Core Loop` and `What "Working" Looks Like`.

## Screens and Layout
### Cover
- The home page contains the Far Shores title, welcome copy, decorative orbital diagram, and “Explore destinations” link to the separate catalogue page.
- Catalogue search and “Choose your shore” cards appear on the destination page, rather than beneath the home cover.
- Page changes use a brief fade and upward entrance; respect reduced-motion preferences. Browser Back and direct catalogue links work.

### Destination Catalogue
- A “Choose your shore ↓” button below the introduction smoothly scrolls to the card-grid heading and moves keyboard focus there; reduced-motion preferences use an immediate scroll. The route remains the catalogue.
- Banner: “Welcome to your planetary travel guide.”
- Search placeholder: “Enter your holiday destination.” Section heading: “Explore destinations.”
- Cards show planet name, short description, and approximate distance from Earth. The shared Milky Way context need not be repeated on every initial card.
- Selecting a card opens the planet profile. “Add planet” opens an entry form.

### Planet Profile
- Oversized planet name and short description on the left, with a large circular planet illustration on the right; narrow screens stack text above imagery. This arrangement follows the learner's reference images supplied during early build review.
- Reading order: scientific details → atmosphere → what living there would feel like → “Book the package.”
- Scientific details include approximate distance from Earth, approximate journey time, and distance from its Sun/host star.
- The imaginative living-there section is labelled as artistic interpretation; factual conditions are distinguished from fictional travel claims.
- An edit action exposes the editable information. A return action leads to the catalogue.

### Planet Entry Form
- Add and edit are form surfaces associated with the catalogue/profile, not separate product areas.
- A new entry requires a planet name and short description. Other information can be filled in later.
- Existing entries open with their current values. All planet information is editable, including image reference, scientific information, living-there text, packing advice, and survival outlook.
- Proposed review default: explicit “Save” and “Cancel” actions. Save updates the card and profile; Cancel discards uncommitted changes.

### Holiday Reveal
- A result on the profile after booking, containing “Travel booked!”, journey estimate, things to bring, and survival outlook.
- Clear fictional-trip label. No payment, booking account, or real reservation is created.
- Incomplete destinations remain bookable with the warning described below.

Source: `scope.md > Inspiration & Identity` and `The POC Boundary`.

## Look and Feel
- Learner's current direction: the three Far Shores cover, grid, and profile references supplied during slice 1 feedback. These refine the earlier industrial space-agency inspiration.
- Near-black background, warm off-white text, orange accent, fine orbital linework, spacious magazine-like layouts, and large typography. The cover uses a serif Far Shores title with italic orange Shores; grid and detail headings use bold sans-serif, with monospace metadata.
- Three-column desktop destination grid with oversized tinted spherical planet imagery; circular imagery sits to the right of the profile introduction. Bundled photographs supply subtle texture beneath decorative color treatments; these are not natural-color depictions. Layouts adapt to narrow screens.
- Travel language and itinerary presentation carry the holiday framing; survival copy remains short and deadpan. Adopt reference styling while keeping the eight approved planets and current data. Prices, a different five-world catalogue, comparisons, and weight calculators shown in the references are not requested features.

## Features and Behavior
### Browse and Search
Source: `scope.md > The POC Boundary`.
- First use supplies the eight solar-system planets, including Earth.
- Search matches planet names, including user-added entries. Proposed review default: case-insensitive partial-name matching as the user types; blank search shows all entries.
- No match produces a clear “No destinations found” state with a way to clear the search; it does not erase the catalogue.

Acceptance criteria:
- [ ] All eight initial planets are visible before searching.
- [ ] Searching for a planet narrows the cards; clearing restores them.
- [ ] An unmatched query displays an empty result state.
- [ ] A saved custom planet can be found by its name and opened.

### Read Planet Profiles
Source: `scope.md > The POC Boundary` and `The Unique Kernel`.
- Each initial planet has an image, short introduction, scientific details, atmosphere, living-there interpretation, and trip information.
- Distance from Earth and journey time are approximate, not live calculations of planetary positions.
- Display an information note: “Distances and journey times are approximate and can vary due to planetary movement.”
- State the assumed spacecraft speed used for journey estimates and that these are simplified fictional travel estimates.
- Unknown fields on custom entries display “Unknown” rather than invented data or broken values.

Acceptance criteria:
- [ ] A selected card opens the corresponding planet's profile in the agreed reading order.
- [ ] Approximate distances and journey times show their units, movement note, and speed assumption.
- [ ] Artistic interpretation is distinguishable from factual information.
- [ ] A name-and-description-only entry opens successfully with unknown optional information clearly marked.

### Add and Edit Planets
Source: `scope.md > The POC Boundary` and `What "Working" Looks Like`.
- “Add planet” creates a new entry instead of changing an existing one.
- Name and short description must contain non-whitespace text before saving; incomplete required fields receive visible explanations and the input is retained.
- Optional fields may be left unknown. Users can update any planet information later, including initial entries.
- Saved changes appear in both card and profile, and persist after refresh in the same browser. No account or cross-device synchronization.
- Image selection mechanism and estimate calculations are to be specified in `4-spec`, within the all-information-editable requirement.

Acceptance criteria:
- [ ] Name and description alone are sufficient to save a new planet.
- [ ] A missing required value prevents saving and identifies the field.
- [ ] A saved addition appears in the catalogue and opens its own profile.
- [ ] Editing a value changes its displayed value, including card information where applicable.
- [ ] Refresh retains additions and edits without duplicating the initial planets.
- [ ] Cancel leaves the previously saved entry unchanged.

### Book and Reveal the Holiday Verdict
Source: `scope.md > The Unique Kernel`.
- Clicking “Book the package” reveals the fictional travel confirmation and the destination's journey time, packing advice, and survival outlook.
- Survival outlook: a short qualitative label followed by a deadpan sentence grounded in the conditions. No unsupported survival percentages.
- Example tone only: “Survival outlook: suit-dependent. Keep your habitat sealed and your return ticket handy.” Final factual content is verified during content preparation.
- If journey, packing, or survival information is missing, show a risk icon on the booking button, with an accessible text warning, and “Details unknown. Book at your own risk.” in the reveal. Known details still appear; missing ones are marked unknown.
- The risk icon indicates missing information, not that other destinations are physically safe.
- Booking does not create a saved reservation. Proposed review default: repeated clicks display the same reveal without creating duplicate confirmations.

Acceptance criteria:
- [ ] Booking a complete initial destination reveals all three trip sections and “Travel booked!” with a fictional-trip label.
- [ ] A name-and-description-only destination has the risk icon and warning before booking.
- [ ] Booking it remains possible and shows the exact unknown-details warning without fabricating a time, packing list, or survival outlook.
- [ ] Completing the missing trip fields removes the missing-information warning.

## States and Boundaries
- **First use:** the initial eight planets are available without setup.
- **No search results:** explain there are no matching destinations; clearing the search restores the list.
- **Incomplete custom profile:** optional fields show “Unknown”; the profile stays usable.
- **Invalid form:** explain missing required information next to the field and retain entered values.
- **Saved:** reflect the change and show brief save feedback.
- **Image unavailable:** proposed review default is a neutral planet placeholder rather than a broken image.
- **Saving unavailable:** proposed review default is an actionable message that the change could not be saved; do not claim persistence succeeded. Retain the user's input for retry.
- **Persistence:** planet data persists locally in the same browser. Booking reveal, search query, and unsaved form changes need not persist across refreshes.

## Product Decisions
- Start with the solar system, while allowing manual planet additions.
- Require only name and short description for a new entry; all information remains editable.
- Profile order comes from the learner: image/name/introduction, scientific details, atmosphere, imagined living conditions, booking.
- Use the learner-supplied Far Shores visual references, recorded in Look and Feel, following early build feedback.
- Use a deadpan qualitative survival verdict.
- Permit booking incomplete destinations with a risk icon and “Details unknown. Book at your own risk.”
- Use single approximate distances and journey estimates with a planetary-movement note, rather than ranges or live positions.
- The learner approved the displayed plan, including the marked interaction defaults and visual interpretation. These defaults were proposed by the agent and accepted at review.

## What We're Building
The catalogue, searchable initial and custom planets, readable destination profiles, add/edit forms with browser persistence, and fictional booking reveal. The checkboxes above define the observable finish line for the proof of concept.

## Deferred From the POC
- A larger supplied catalogue beyond the solar system: manual additions are enough to extend this first version.
- Accounts and cross-device storage: this is initially a personal guide saved in one browser.
- Additional games, passport stamps, and weight calculators: the holiday reveal is the selected learning payoff.

## Possible Later Enhancements
Expand verified destination content and consider further production development after the proof of concept is finished. These are possibilities, not build commitments.

## Non-Goals
- Real reservations, checkout, payments, or real-world survival advice: the trip is fictional.
- Live orbital tracking or realistic mission trajectory simulation: labelled approximate values prove this concept.
- A polished full production platform in the hackathon's 2–4-hour active-work target.

## Open Questions
- **Review resolved:** the learner approved the interaction defaults and visual interpretation with the rest of this plan.
- **For `4-spec`:** choose an explicit shared spacecraft speed, distance convention, image-editing mechanism, and consistent treatment of editable values and journey estimates. No live orbital simulation is required.
- **For content preparation:** verify scientific source material and label artistic licence. No source facts or quantitative estimates are established by this PRD.
