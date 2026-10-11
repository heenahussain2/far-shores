import type { Sight } from '../types/planet';

// Original visitor copy, grounded in NASA planet fact pages; see CONTENT_SOURCES.md.
export const seedSights: Record<string, Sight[]> = {
  mercury: [
    { title: 'Caloris Basin', description: 'An enormous impact basin marks a collision from Mercury’s distant past.' },
    { title: 'A cratered horizon', description: 'Ancient impact scars cover a rocky landscape with almost no atmosphere to soften the view.' },
    { title: 'Towering scarps', description: 'Long cliffs reveal places where the cooling planet’s crust has contracted.' },
  ],
  venus: [
    { title: 'Cloud-top panorama', description: 'A bright blanket of clouds hides the surface. Our imagined window seat stays well above it.' },
    { title: 'Volcanic plains', description: 'Radar observations reveal a world shaped by volcanoes beneath the opaque atmosphere.' },
    { title: 'Highland landscapes', description: 'Mountainous regions interrupt the plains—admired here through an imagined radar-view display.' },
  ],
  earth: [
    { title: 'Blue oceans', description: 'Liquid water stretches across much of the planet. A familiar view worth looking at again.' },
    { title: 'Continents below', description: 'Rocky land, mountain ranges and coastlines give every turn of the globe a new outline.' },
    { title: 'Clouds in motion', description: 'Weather systems drift across the view. Your home planet rarely holds the same pose twice.' },
  ],
  mars: [
    { title: 'Olympus Mons', description: 'A giant shield volcano rises above the surrounding plains.' },
    { title: 'Valles Marineris', description: 'A vast canyon system cuts across the rusty landscape—a view best taken in from orbit.' },
    { title: 'Polar ice caps', description: 'Water and carbon-dioxide ice shape bright polar landscapes on this cold desert world.' },
  ],
  jupiter: [
    { title: 'The Great Red Spot', description: 'An immense, long-lived storm turns in Jupiter’s cloud tops.' },
    { title: 'Cloud belts', description: 'Light zones and darker belts wrap around the giant, revealing a restless atmosphere.' },
    { title: 'An orbital panorama', description: 'From our imagined observation ship, the gas giant fills the window. There is no solid surface to visit.' },
  ],
  saturn: [
    { title: 'The rings', description: 'Countless pieces of ice and rock form Saturn’s unmistakable ring system.' },
    { title: 'The polar hexagon', description: 'A six-sided atmospheric pattern surrounds the north pole.' },
    { title: 'Golden cloud bands', description: 'Atmospheric bands circle the gas giant, beneath the rings’ dramatic silhouette.' },
  ],
  uranus: [
    { title: 'A blue-green globe', description: 'Methane in the atmosphere contributes to the planet’s blue-green appearance.' },
    { title: 'Dark, narrow rings', description: 'A subtle ring system surrounds this distant ice giant.' },
    { title: 'A sideways world', description: 'An extreme axial tilt makes Uranus look as though it rolls around the Sun.' },
  ],
  neptune: [
    { title: 'Clouds on blue', description: 'Bright clouds stand out against the distant giant’s blue atmosphere.' },
    { title: 'A windy atmosphere', description: 'Powerful winds drive changing cloud features. This is a holiday for the observation deck.' },
    { title: 'Faint rings', description: 'Delicate rings encircle Neptune, far subtler than Saturn’s bright display.' },
  ],
};

export function getSights(planet: { id: string; sights?: Sight[] }): Sight[] {
  // Older saved catalogues predate this field. Explicit [] means the user cleared it.
  return planet.sights ?? seedSights[planet.id] ?? [];
}
