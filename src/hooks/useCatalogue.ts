import { useEffect, useRef, useState } from 'react';
import { seedPlanets } from '../data/planets';
import type { Planet } from '../types/planet';
import type { CatalogueRepository } from '../lib/catalogueRepository';
import { createLocalCatalogueRepository } from '../lib/localCatalogueRepository';

const localRepository = createLocalCatalogueRepository();

export function useCatalogue(repository: CatalogueRepository = localRepository) {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const savingLock = useRef(false);
  useEffect(() => {
    let active = true;
    setLoading(true);
    repository.load().then(data => { if (active) { setPlanets(data); setLoadError(''); } })
      .catch((error: Error) => { if (active) { setPlanets(seedPlanets.map(p => ({ ...p }))); setLoadError(error.message); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [repository, attempt]);

  async function save(planet: Planet) {
    if (loading || loadError || savingLock.current) throw new Error('Saving is unavailable. Retry loading the catalogue first.');
    savingLock.current = true;
    setSaving(true);
    const next = planets.some(p => p.id === planet.id) ? planets.map(p => p.id === planet.id ? planet : p) : [...planets, planet];
    try { await repository.save(next); setPlanets(next); }
    finally { savingLock.current = false; setSaving(false); }
  }
  return { planets, loading, loadError, saving, readOnly: !!loadError, save, retry: () => setAttempt(n => n + 1) };
}
