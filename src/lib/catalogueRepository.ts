import type { Planet } from '../types/planet';

export interface CatalogueRepository {
  load(): Promise<Planet[]>;
  save(planets: Planet[]): Promise<void>;
}
