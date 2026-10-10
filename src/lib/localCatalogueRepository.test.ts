import { describe, it, expect } from 'vitest';
import { createLocalCatalogueRepository, STORAGE_KEY, type CatalogueStorage } from './localCatalogueRepository';
import { seedPlanets } from '../data/planets';
import { createDraft, validateDraft } from './validation';

function memory(initial: string | null = null) {
  let value = initial;
  return { getItem: () => value, setItem: (key: string, next: string) => { expect(key).toBe(STORAGE_KEY); value = next; } };
}
describe('catalogue persistence', () => {
  it('returns fresh seeds without writing on first load', async () => {
    const storage = memory(); const repo = createLocalCatalogueRepository(() => storage);
    const planets = await repo.load(); planets[0].name = 'Changed';
    expect((await repo.load())[0].name).toBe(seedPlanets[0].name);
    expect(storage.getItem()).toBeNull();
  });
  it('round-trips additions and edits without reappending seeds or merging duplicate names', async () => {
    const repo = createLocalCatalogueRepository(() => storage); const storage = memory();
    const custom = validateDraft({ ...createDraft(), name: 'Mars', description: 'Different Mars' }, 'custom-id').planet;
    await repo.save([...seedPlanets, custom]);
    const loaded = await repo.load(); expect(loaded).toHaveLength(9);
    loaded[0].name = 'Revised Mercury'; await repo.save(loaded);
    expect(await repo.load()).toEqual(loaded);
    expect((await repo.load()).filter(p => p.name === 'Mars')).toHaveLength(2);
  });
  it.each(['broken JSON', '{"schemaVersion":2,"planets":[]}', '{"schemaVersion":1,"planets":[{}]}', 'null'])('preserves invalid saved data %s', async raw => {
    const storage = memory(raw); const repo = createLocalCatalogueRepository(() => storage);
    await expect(repo.load()).rejects.toThrow('read-only');
    expect(storage.getItem()).toBe(raw);
  });
  it('reports blocked reads and storage access without writing', async () => {
    const repo = createLocalCatalogueRepository(() => { throw new Error('SecurityError'); });
    await expect(repo.load()).rejects.toThrow('read-only');
    await expect(repo.save(seedPlanets)).rejects.toThrow('draft is still here');
  });
  it('preserves the last saved snapshot on quota/write failure', async () => {
    const raw = JSON.stringify({ schemaVersion: 1, planets: seedPlanets });
    const storage: CatalogueStorage = { getItem: () => raw, setItem: () => { throw new Error('QuotaExceededError'); } };
    const repo = createLocalCatalogueRepository(() => storage);
    await expect(repo.save([{ ...seedPlanets[0], name: 'Unsaved' }])).rejects.toThrow('Could not save');
    expect(await repo.load()).toEqual(seedPlanets);
  });
});
