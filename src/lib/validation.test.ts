import { describe, it, expect } from 'vitest';
import { createDraft, validateDraft, parseSnapshot } from './validation';
import { seedPlanets } from '../data/planets';

function minimal() { return { ...createDraft(), name: '  New shore  ', description: ' A quiet place ' }; }
describe('destination validation', () => {
  it('requires only trimmed name and description; blank optional numbers are unknown', () => {
    const result = validateDraft(minimal(), 'unique');
    expect(result.errors).toEqual({});
    expect(result.planet).toMatchObject({ id: 'unique', name: 'New shore', description: 'A quiet place', distanceFromEarthKm: null, cruiseSpeedKmh: 100000, thingsToBring: null });
  });
  it('preserves zero distances and a cleared speed', () => {
    const result = validateDraft({ ...minimal(), distanceFromEarthKm: '0', cruiseSpeedKmh: '' }, 'id');
    expect(result.errors).toEqual({});
    expect(result.planet.distanceFromEarthKm).toBe(0);
    expect(result.planet.cruiseSpeedKmh).toBeNull();
  });
  it('rejects missing text, negative distances, nonfinite numbers and zero speed together', () => {
    const draft = { ...createDraft(), name: ' ', distanceFromEarthKm: '-1', distanceFromStarKm: 'Infinity', cruiseSpeedKmh: '0' };
    expect(Object.keys(validateDraft(draft, 'id').errors)).toHaveLength(5);
  });
  it.each(['javascript:alert(1)', 'file:///planet.jpg', '/other.png', 'not a URL', 'data:image/png,abc'])('rejects replacement image %s', imageUrl => {
    expect(validateDraft({ ...minimal(), imageUrl }, 'id').errors.imageUrl).toBeTruthy();
  });
  it('accepts web images and preserves only unchanged bundled paths', () => {
    expect(validateDraft({ ...minimal(), imageUrl: 'https://example.com/image.jpg' }, 'id').errors).toEqual({});
    expect(validateDraft(createDraft(seedPlanets[0]), seedPlanets[0].id, seedPlanets[0]).errors).toEqual({});
    expect(validateDraft({ ...minimal(), imageUrl: seedPlanets[0].imageUrl! }, 'id').errors.imageUrl).toBeTruthy();
  });
  it('rejects invalid persisted shape, identities and numbers', () => {
    for (const planets of [[{ ...seedPlanets[0], atmosphere: undefined }], [seedPlanets[0], seedPlanets[0]], [{ ...seedPlanets[0], cruiseSpeedKmh: 0 }], [{ ...seedPlanets[0], imageUrl: 'javascript:alert(1)' }]]) {
      expect(() => parseSnapshot({ schemaVersion: 1, planets })).toThrow();
    }
  });
});
