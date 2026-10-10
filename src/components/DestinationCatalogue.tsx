import type { Planet } from '../types/planet';
import { PlanetCard } from './PlanetCard';
import { OrbitMap } from './OrbitMap';

export function DestinationCatalogue({ planets, query, onQuery }: { planets: Planet[]; query: string; onQuery: (value: string) => void }) {
  const filtered = planets.filter(p => p.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  function showShores() {
    const heading = document.getElementById('destination-heading');
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  }
  return <section id="destinations" className="destinations" aria-labelledby="destination-heading">
      <div className="catalogue-intro"><div><p className="eyebrow">EIGHT WORLDS / ONE SOLAR SYSTEM</p><h1>Eight far shores.<br />Pick a favourite<span>.</span></h1><p>A quiet staycation or a very long way from home.<br />Every journey includes a different perspective.</p><button type="button" className="primary-button shore-jump" onClick={showShores} aria-controls="destination-heading">Choose your shore <span aria-hidden="true">↓</span></button></div><OrbitMap /></div>
      <div className="section-header"><h2 id="destination-heading" tabIndex={-1}>Choose your shore<span>.</span><span className="sr-only"> Explore destinations</span></h2><span className="section-meta">Every journey includes the view.</span></div>
      <div className="search-row"><div className="search-field"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="destination-search">Search destinations by name</label><input id="destination-search" type="search" placeholder="Enter your holiday destination" value={query} onChange={event => onQuery(event.target.value)} />{query && <button type="button" className="clear-search" onClick={() => onQuery('')} aria-label="Clear search">×</button>}</div><p role="status">{filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'} available</p></div>
      {filtered.length ? <div className="planet-grid">{filtered.map(planet => <PlanetCard key={planet.id} planet={planet} index={planets.indexOf(planet)} />)}</div> : <div className="empty-state"><span aria-hidden="true">◎</span><h3>No destinations found</h3><p>Even space has its limits. Try another planet name.</p><button className="secondary-button" onClick={() => onQuery('')}>Clear search</button></div>}
      <p className="catalogue-note">Distances shown are illustrative orbital-radius gaps from Earth, not live positions or flight paths. Each destination explains the estimate.</p>
    </section>;
}
