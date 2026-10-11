import { describe, expect, it } from 'vitest';
import { formatDistance, formatJourney, hasMissingTripDetails, journeyHours } from './journey';
import { seedPlanets } from '../data/planets';

describe('simplified journeys', () => {
  it('divides kilometres by km/h and preserves a local Earth journey', () => {
    expect(journeyHours(78_000_000, 100_000)).toBe(780);
    expect(journeyHours(0, 100_000)).toBe(0);
    expect(formatJourney({ distanceFromEarthKm: 0, cruiseSpeedKmh: 100_000 })).toBe('0 hours · staycation');
    expect(formatJourney({ distanceFromEarthKm: 78_000_000, cruiseSpeedKmh: 100_000 })).toBe('≈ 32.5 days');
    expect(formatJourney({ distanceFromEarthKm: 4_800_000, cruiseSpeedKmh: 200_000 })).toBe('≈ 1 day');
  });
  it.each([[null, 100_000], [10, null], [-1, 10], [10, 0], [10, -1], [NaN, 10], [10, Infinity], [Number.MAX_VALUE, Number.MIN_VALUE]])('keeps invalid distance/speed unknown (%s, %s)', (distance, speed) => {
    expect(journeyHours(distance, speed)).toBeNull();
    expect(formatJourney({ distanceFromEarthKm: distance, cruiseSpeedKmh: speed })).toBe('Unknown');
  });
  it('marks missing trip data while accepting Earth zero', () => {
    const earth = seedPlanets.find(p => p.id === 'earth')!;
    expect(hasMissingTripDetails(earth)).toBe(false);
    for (const key of ['distanceFromEarthKm', 'cruiseSpeedKmh', 'thingsToBring', 'survivalLabel', 'survivalDescription']) {
      expect(hasMissingTripDetails({ ...earth, [key]: null })).toBe(true);
    }
    expect(hasMissingTripDetails({ ...earth, thingsToBring: '  ' })).toBe(true);
    expect(seedPlanets.every(p => !hasMissingTripDetails(p))).toBe(true);
  });
  it('formats units and unknown distances without inventing values', () => {
    expect(formatDistance(null)).toBe('Unknown');
    expect(formatDistance(0)).toBe('0 km');
    expect(formatDistance(78_000_000)).toBe('78 million km');
    expect(formatDistance(4_349_000_000)).toBe('4.3 billion km');
  });
});
