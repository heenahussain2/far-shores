import type { Planet, CatalogueSnapshot } from '../types/planet';
import { DEFAULT_CRUISE_SPEED_KMH } from './journey';

export const textFields = ['name', 'description', 'imageUrl', 'distanceBasis', 'atmosphere', 'livingThere', 'thingsToBring', 'survivalLabel', 'survivalDescription'] as const;
export const numberFields = ['distanceFromEarthKm', 'distanceFromStarKm', 'cruiseSpeedKmh'] as const;
export type Draft = Record<typeof textFields[number] | typeof numberFields[number], string>;
export type FieldErrors = Partial<Record<keyof Draft, string>>;
const bundledImage = /^\/images\/planets\/(mercury|venus|earth|mars|jupiter|saturn|uranus|neptune)\.jpg$/;

export function isWebImage(value: string): boolean {
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) && !!url.hostname; } catch { return false; }
}

export function createDraft(planet?: Planet): Draft {
  const draft = {} as Draft;
  for (const key of [...textFields, ...numberFields]) draft[key] = planet?.[key]?.toString() ?? '';
  if (!planet) draft.cruiseSpeedKmh = String(DEFAULT_CRUISE_SPEED_KMH);
  return draft;
}

export function validateDraft(draft: Draft, id: string, original?: Planet): { planet: Planet; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const planet = { id } as Planet;
  for (const key of textFields) {
    const value = draft[key].trim();
    if (key === 'name' || key === 'description') {
      planet[key] = value;
      if (!value) errors[key] = `Enter a ${key}.`;
    } else planet[key] = value || null;
  }
  const image = planet.imageUrl;
  if (image && !isWebImage(image) && !(image === original?.imageUrl && bundledImage.test(image))) errors.imageUrl = 'Use a full HTTP or HTTPS image URL, or leave this blank.';
  for (const key of numberFields) {
    const raw = draft[key].trim();
    const value = raw === '' ? null : Number(raw);
    planet[key] = value;
    if (value !== null && (!Number.isFinite(value) || (key === 'cruiseSpeedKmh' ? value <= 0 : value < 0))) errors[key] = key === 'cruiseSpeedKmh' ? 'Enter a finite speed greater than zero, or leave blank.' : 'Enter a finite distance of zero or more, or leave blank.';
  }
  return { planet, errors };
}

export function parseSnapshot(value: unknown): Planet[] {
  if (!value || typeof value !== 'object') throw new Error('Invalid catalogue snapshot.');
  const snapshot = value as CatalogueSnapshot;
  if (snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.planets)) throw new Error('Unsupported catalogue snapshot.');
  const ids = new Set<string>();
  for (const planet of snapshot.planets) {
    if (!planet || typeof planet !== 'object' || typeof planet.id !== 'string' || !planet.id.trim() || ids.has(planet.id)) throw new Error('Invalid destination identity.');
    ids.add(planet.id);
    for (const key of textFields) {
      const field = planet[key];
      if (key === 'name' || key === 'description') {
        if (typeof field !== 'string' || !field.trim()) throw new Error('Missing destination text.');
      } else if (field !== null && typeof field !== 'string') throw new Error('Invalid destination text.');
    }
    if (planet.imageUrl && !isWebImage(planet.imageUrl) && !bundledImage.test(planet.imageUrl)) throw new Error('Invalid image URL.');
    for (const key of numberFields) {
      const field = planet[key];
      if (field !== null && (typeof field !== 'number' || !Number.isFinite(field) || (key === 'cruiseSpeedKmh' ? field <= 0 : field < 0))) throw new Error('Invalid destination number.');
    }
  }
  return snapshot.planets.map(planet => ({ ...planet }));
}
