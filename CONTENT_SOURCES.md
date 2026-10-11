# Far Shores — Content Sources

Source material checked during slice 1. Scientific copy is paraphrased; holiday scenes, packing briefs, and survival verdicts are original artistic interpretation. Images are spacecraft photographs or processed composites, not a simulation of what a passenger would necessarily see. Following learner reference styling, the app blends these photographs into tinted CSS sphere gradients with reduced opacity and luminosity blending. These decorative treatments are not natural-color depictions. Orbital SVGs are decorative schematics, not scaled positions or orbital predictions.

## Planet facts

Each record's atmosphere and physical conditions come from its NASA facts page:

| Destination | Source | Facts used |
| --- | --- | --- |
| Mercury | [NASA Mercury facts](https://science.nasa.gov/mercury/facts/) | Thin exosphere; approximate daytime/nighttime surface extremes. |
| Venus | [NASA Venus facts](https://science.nasa.gov/venus/venus-facts/) | Carbon dioxide, sulfuric-acid clouds, surface heat and pressure. |
| Earth | [NASA Earth facts](https://science.nasa.gov/earth/facts/) | Near-surface nitrogen/oxygen proportions; rocky world with abundant surface water. |
| Mars | [NASA Mars facts](https://science.nasa.gov/mars/facts/) | Thin carbon-dioxide atmosphere with nitrogen and argon, cold desert, polar ice, dust storms, 24.6-hour day. |
| Jupiter | [NASA Jupiter facts](https://science.nasa.gov/jupiter/jupiter-facts/) | Hydrogen/helium atmosphere, clouds, no true surface, destructive interior conditions. |
| Saturn | [NASA Saturn facts](https://science.nasa.gov/saturn/facts/) | Hydrogen/helium, no true surface, ice-and-rock rings. |
| Uranus | [NASA Uranus facts](https://science.nasa.gov/uranus/facts/) | Hydrogen/helium/methane, near-sideways rotation, no true surface. |
| Neptune | [NASA Neptune facts](https://science.nasa.gov/neptune/neptune-facts/) | Atmospheric composition, no solid surface, extreme winds, dim sunlight; Voyager image color processing. |

## Reference distances and journey estimates

[JPL approximate planetary positions, Table 1](https://ssd.jpl.nasa.gov/planets/approx_pos.html) supplies the J2000 semi-major axes below. These are fitted orbital elements, not measured current positions or time-averaged separations. The Earth/Moon barycenter axis approximates Earth's orbital radius for this illustrative catalogue. [JPL astrodynamic parameters](https://ssd.jpl.nasa.gov/astro_par.html) supplies 1 AU = 149,597,870.7 km.

| Planet | Semi-major axis (AU) | Rounded host-star distance (km) | Rounded radius gap from Earth (km) |
| --- | ---: | ---: | ---: |
| Mercury | 0.38709927 | 58,000,000 | 92,000,000 |
| Venus | 0.72333566 | 108,000,000 | 41,000,000 |
| Earth/Moon barycenter | 1.00000261 | 150,000,000 | 0 |
| Mars | 1.52371034 | 228,000,000 | 78,000,000 |
| Jupiter | 5.20288700 | 778,000,000 | 629,000,000 |
| Saturn | 9.53667594 | 1,427,000,000 | 1,277,000,000 |
| Uranus | 19.18916464 | 2,871,000,000 | 2,721,000,000 |
| Neptune | 30.06992276 | 4,498,000,000 | 4,349,000,000 |

`distanceFromStarKm = round(axis × AU / 1,000,000) × 1,000,000`.

`distanceFromEarthKm = round(abs(axis − EarthAxis) × AU / 1,000,000) × 1,000,000`.

These radius gaps are not closest approaches, current separations, time averages, or actual flight trajectories. The movement note and basis appear in the app. Cruising at the fictional assumed 100,000 km/h, `hours = distanceKm / cruiseSpeedKmh`; display days using 24 hours and years using 365.25 days. No acceleration, fuel, gravity assist, orbital transfer, or life-support calculation is implied. Earth is a zero-hour staycation. Distances and speed become editable in later slices.

## Bundled image credits

NASA's [planet overview](https://science.nasa.gov/solar-system/planets/) provides the source crops. The exact downloads are recorded in `scripts/download-assets.ps1` (1024-pixel-wide variants). NASA library metadata was checked at `https://images-api.nasa.gov/search?nasa_id=<ID>` for the six listed PIA IDs. Crops and responsive display may differ from the original image; no endorsement is implied.

| Local file | Source image | Credit and processing |
| --- | --- | --- |
| mercury.jpg | [PIA15162](https://science.nasa.gov/wp-content/uploads/2024/03/pia15162-mercury-basins-messenger-16x9-1.jpg) | NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington; MESSENGER globe. |
| venus.jpg | [PIA23791, figure 2](https://science.nasa.gov/wp-content/uploads/2024/03/venus-mariner-10-pia23791-fig2-16x9-1.jpg) | NASA/JPL-Caltech; Mariner 10 data processed by Kevin M. Gill. False-color composite using orange/UV data and a synthesized channel. |
| earth.jpg | [Apollo 17 Blue Marble](https://science.nasa.gov/wp-content/uploads/2024/03/blue-marble-apollo-17-16x9-1.jpg) | NASA; Apollo 17 crew photograph. |
| mars.jpg | [Mars full globe](https://science.nasa.gov/wp-content/uploads/2024/03/mars-full-globe-16x9-1.jpg) | NASA/JPL-Caltech; spacecraft global mosaic. |
| jupiter.jpg | [PIA22946, Jupiter Marble](https://science.nasa.gov/wp-content/uploads/2024/03/jupiter-marble-pia22946-16x9-1.jpg) | Enhanced image by Kevin M. Gill (CC-BY), based on images courtesy of NASA/JPL-Caltech/SwRI/MSSS. Color-enhanced composite. [CC BY](https://creativecommons.org/licenses/by/4.0/); attribution retained as provided by NASA. |
| saturn.jpg | [PIA21345](https://science.nasa.gov/wp-content/uploads/2023/05/saturn-farewell-pia21345-sse-banner-1920x640-1.jpg) | NASA/JPL-Caltech/Space Science Institute; Cassini color composite; decorative CSS tint treatment. |
| uranus.jpg | [PIA18182](https://science.nasa.gov/wp-content/uploads/2024/03/uranus-pia18182-16x9-1.jpg) | NASA/JPL-Caltech; Voyager 2. |
| neptune.jpg | [PIA01492](https://science.nasa.gov/wp-content/uploads/2024/03/pia01492-neptune-full-disk-16x9-1.jpg) | NASA/JPL; Voyager 2 processed image. Its deep blue is not a literal natural-color comparison with Uranus. |
| unknown.svg | Original project artwork | Neutral placeholder; no scientific image implied. |

Media use checked against [NASA image/media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/). NASA identifiers/logos are not used in the brand. The UI's orbital icon and favicon are original SVG artwork. No franchise assets, external fonts, or generated planet photographs are used.

## Sight highlight cards
Original visitor copy in src/data/sights.ts, checked 2026-10-11 against NASA fact pages: [Mercury](https://science.nasa.gov/mercury/facts/), [Venus](https://science.nasa.gov/venus/venus-facts/), [Earth](https://science.nasa.gov/earth/facts/), [Mars](https://science.nasa.gov/mars/facts/), [Jupiter](https://science.nasa.gov/jupiter/jupiter-facts/), [Saturn](https://science.nasa.gov/saturn/facts/), [Uranus](https://science.nasa.gov/uranus/facts/), [Neptune](https://science.nasa.gov/neptune/neptune-facts/). Surface features, rings, storms and atmospheric traits follow these sources; imagined viewing arrangements are fictional. Venus surface views explicitly use radar; giant planets are observed from a spacecraft.
