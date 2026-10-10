import { seedPlanets } from '../data/planets';
import type { CatalogueRepository } from './catalogueRepository';
import { parseSnapshot } from './validation';

export const STORAGE_KEY = 'planetary-travel-guide.catalogue.v1';
export type CatalogueStorage = Pick<Storage, 'getItem' | 'setItem'>;

export function createLocalCatalogueRepository(getStorage: () => CatalogueStorage = () => window.localStorage): CatalogueRepository {
  return {
    async load() {
      try {
        const raw = getStorage().getItem(STORAGE_KEY);
        return raw === null ? seedPlanets.map(p => ({ ...p })) : parseSnapshot(JSON.parse(raw));
      } catch {
        throw new Error('Your saved catalogue could not be read. Browsing the original destinations in read-only mode; stored data has been preserved. Check browser storage access, then retry loading.');
      }
    },
    async save(planets) {
      try {
        const snapshot = { schemaVersion: 1, planets };
        parseSnapshot(snapshot);
        getStorage().setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        throw new Error('Could not save this destination. Your draft is still here. Check browser storage access or available space, then try Save again.');
      }
    },
  };
}
