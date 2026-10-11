export type Sight = { title: string; description: string };
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
  sights?: Sight[];
};

export type CatalogueSnapshot = { schemaVersion: 1; planets: Planet[] };
