// Editorial holiday suggestions, rather than scientific classifications.
const holidayThemes: Record<string, string> = {
  mercury: 'Sun chasers',
  venus: 'Cloud gazers',
  earth: 'Fresh-air enthusiasts',
  mars: 'Desert explorers',
  jupiter: 'Storm watchers',
  saturn: 'Ring-side views',
  uranus: 'Quiet escapes',
  neptune: 'Going the distance',
};

export function holidayTheme(id: string): string {
  return holidayThemes[id] ?? 'New horizons';
}
