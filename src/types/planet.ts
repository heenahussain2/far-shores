export type Planet = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  distanceFromEarthKm: number | null;
  distanceBasis: string | null;
  distanceFromStarKm: number | null;
  cruiseSpeedKmh: number | null;
  atmosphere: string | null;
  livingThere: string | null;
  thingsToBring: string | null;
  survivalLabel: string | null;
  survivalDescription: string | null;
};

export type CatalogueSnapshot = { schemaVersion: 1; planets: Planet[] };
