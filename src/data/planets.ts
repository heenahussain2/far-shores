import type { Planet } from '../types/planet';
import { DEFAULT_CRUISE_SPEED_KMH } from '../lib/journey';

const AU_KM = 149_597_870.7;
const EARTH_ORBIT_AU = 1.00000261;
const distanceBasis = 'Illustrative orbital-radius gap from Earth, using rounded J2000 semi-major axes. Not current separation or a flight path.';

// JPL Table 1 J2000 semi-major axes; see CONTENT_SOURCES.md for the approximation.
const records = [
  {
    id: 'mercury', name: 'Mercury', orbitAu: 0.38709927,
    description: 'Front-row sunlight. A cratered world of extremes.',
    atmosphere: 'An extremely thin exosphere, rather than a substantial atmosphere. Surface temperatures can reach about 430°C by day and fall to −180°C at night.',
    livingThere: 'Imagine a quiet lookout across ancient craters, with an enormous Sun above the horizon. Your sealed observation room is doing rather more work than the hotel brochure suggests.',
    thingsToBring: 'A fictional sealed habitat, serious thermal control, and a camera that can stay indoors with you.',
    survivalLabel: 'Habitat-dependent',
    survivalDescription: 'The view is spectacular. The temperature regulation is entirely your responsibility.',
  },
  {
    id: 'venus', name: 'Venus', orbitAu: 0.72333566,
    description: 'A golden cloudscape with a very firm no-landing policy.',
    atmosphere: 'A dense, mostly carbon-dioxide atmosphere with sulfuric-acid clouds. Surface temperatures are about 467°C and pressure is about 93 times Earth’s sea-level pressure.',
    livingThere: 'Picture the pale cloud tops from a fictional orbital lounge. Down below, the planet has turned the greenhouse setting all the way up. We recommend admiring it through a window.',
    thingsToBring: 'An orbital window seat, a camera, and absolutely no plans for a surface picnic.',
    survivalLabel: 'Orbital viewing only',
    survivalDescription: 'Your sunscreen does not cover crushing pressure. Keep the holiday above the clouds.',
  },
  {
    id: 'earth', name: 'Earth', orbitAu: EARTH_ORBIT_AU,
    description: 'Blue oceans. Open skies. Remarkably good air.',
    atmosphere: 'Near the surface, about 78% nitrogen, 21% oxygen, and 1% other gases. Liquid water covers much of this rocky world.',
    livingThere: 'Imagine watching the sea from somewhere you have never visited, on the planet you already call home. The luxury here is stepping outside without bringing your own atmosphere.',
    thingsToBring: 'Walking shoes, weather-appropriate layers, and renewed appreciation for breathable air.',
    survivalLabel: 'Locally promising',
    survivalDescription: 'The atmosphere is included. Weather forecasts and common sense remain optional extras at your peril.',
  },
  {
    id: 'mars', name: 'Mars', orbitAu: 1.52371034,
    description: 'Rust-red horizons. The ultimate desert escape.',
    atmosphere: 'A thin atmosphere, mainly carbon dioxide with nitrogen and argon. This cold desert has dust storms, polar ice, and a day lasting about 24.6 hours.',
    livingThere: 'Imagine red dust drifting past the window of a small outpost. The day feels almost familiar; the silence and the horizon do not. Sunset is best enjoyed from the pressurized side of the glass.',
    thingsToBring: 'A fictional pressure suit, oxygen supply, thermal shelter, and an unreasonable number of dust filters.',
    survivalLabel: 'Suit-dependent',
    survivalDescription: 'Almost an Earth-length day. Considerably less Earth-like breathing arrangements.',
  },
  {
    id: 'jupiter', name: 'Jupiter', orbitAu: 5.20288700,
    description: 'Storm watching, on a scale that puts Earth in perspective.',
    atmosphere: 'Mostly hydrogen and helium, with clouds including ammonia and water. A gas giant with no true landing surface; pressure and temperature rise dramatically inward.',
    livingThere: 'Imagine the banded cloud tops filling a fictional spacecraft’s observation deck. Storm systems roll beneath you like continents in motion. A room with a view is the whole itinerary.',
    thingsToBring: 'An imaginary orbital observation ship, radiation shielding, and a very wide-angle lens.',
    survivalLabel: 'No surface stays',
    survivalDescription: 'There is nowhere to put the hotel. Kindly remain aboard the fictional spacecraft.',
  },
  {
    id: 'saturn', name: 'Saturn', orbitAu: 9.53667594,
    description: 'The ring-side seat you have been dreaming of.',
    atmosphere: 'A gas giant made mostly of hydrogen and helium, without a true surface to land on. Its conspicuous rings contain ice and rock.',
    livingThere: 'Imagine a quiet cabin in a fictional orbit, where the rings form a luminous arc across the window. Breakfast can wait. This is the sort of view that makes conversation unnecessary.',
    thingsToBring: 'A fictional orbital cabin, binoculars, and enough patience for a very long outward journey.',
    survivalLabel: 'Stay aboard',
    survivalDescription: 'The rings are ice and rock, not a promenade. Please admire them from a distance.',
  },
  {
    id: 'uranus', name: 'Uranus', orbitAu: 19.18916464,
    description: 'A pale blue retreat. With a sideways sense of direction.',
    atmosphere: 'Mostly hydrogen and helium with some methane. This ice giant has no true surface and rotates with a tilt close to 90 degrees.',
    livingThere: 'Imagine a pale blue-green globe hanging beyond a fictional cabin window. Here, the planet’s extraordinary tilt gives the word “seasonal” a whole new meaning. It is a long way from the usual crowds.',
    thingsToBring: 'An imaginary observation spacecraft, a patient travelling companion, and a substantial reading list.',
    survivalLabel: 'Spacecraft-dependent',
    survivalDescription: 'The atmosphere is not breathable and the ice giant is not a skating destination.',
  },
  {
    id: 'neptune', name: 'Neptune', orbitAu: 30.06992276,
    description: 'Distant blue skies. Exceptionally uncooperative winds.',
    atmosphere: 'Mostly hydrogen and helium, with methane. There is no solid surface; powerful winds can exceed 2,000 km/h. Sunlight here is far dimmer than on Earth.',
    livingThere: 'Imagine a distant, blue world beyond a fictional observation window, its clouds catching the faint light of the Sun. The journey is part of the holiday. A rather large part.',
    thingsToBring: 'A fictional deep-space ship, years of entertainment, and a flexible definition of “quick getaway”.',
    survivalLabel: 'Observe from afar',
    survivalDescription: 'The wind will not improve your hairstyle. The missing solid surface complicates the beach day.',
  },
];

export const seedPlanets: Planet[] = records.map(({ orbitAu, ...record }) => ({
  ...record,
  imageUrl: `/images/planets/${record.id}.jpg`,
  distanceFromEarthKm: Math.round(Math.abs(orbitAu - EARTH_ORBIT_AU) * AU_KM / 1_000_000) * 1_000_000,
  distanceFromStarKm: Math.round(orbitAu * AU_KM / 1_000_000) * 1_000_000,
  distanceBasis,
  cruiseSpeedKmh: DEFAULT_CRUISE_SPEED_KMH,
}));
