import type { Planet } from '../types/planet';

export const DEFAULT_CRUISE_SPEED_KMH = 100_000;
export const MOVEMENT_NOTE = 'Distances and journey times are approximate and can vary due to planetary movement.';

export function journeyHours(distance: number | null, speed: number | null): number | null {
  if (distance === null || speed === null || !Number.isFinite(distance) || !Number.isFinite(speed) || distance < 0 || speed <= 0) return null;
  const hours = distance / speed;
  return Number.isFinite(hours) ? hours : null;
}

const number = new Intl.NumberFormat('en', { maximumFractionDigits: 1 });

export function formatDistance(km: number | null): string {
  if (km === null || !Number.isFinite(km) || km < 0) return 'Unknown';
  if (km >= 1e9) return `${number.format(km / 1e9)} billion km`;
  if (km >= 1e6) return `${number.format(km / 1e6)} million km`;
  return `${number.format(km)} km`;
}

export function formatJourney(planet: Pick<Planet, 'distanceFromEarthKm' | 'cruiseSpeedKmh'>): string {
  const hours = journeyHours(planet.distanceFromEarthKm, planet.cruiseSpeedKmh);
  if (hours === null) return 'Unknown';
  if (hours === 0) return '0 hours · staycation';
  if (hours < 1) return hours * 60 < 0.1 ? 'Less than 0.1 minutes' : `≈ ${number.format(hours * 60)} minutes`;
  if (hours < 24) return `≈ ${number.format(hours)} hours`;
  if (hours < 24 * 365.25) return `≈ ${number.format(hours / 24)} days`;
  return `≈ ${number.format(hours / (24 * 365.25))} years`;
}

export function hasMissingTripDetails(planet: Planet): boolean {
  return journeyHours(planet.distanceFromEarthKm, planet.cruiseSpeedKmh) === null ||
    [planet.thingsToBring, planet.survivalLabel, planet.survivalDescription].some(value => !value?.trim());
}
