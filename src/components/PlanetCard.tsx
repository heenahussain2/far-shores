import type { Planet } from '../types/planet';
import { formatDistance, formatJourney } from '../lib/journey';
import { PlanetImage } from './PlanetImage';

export function PlanetCard({ planet, index }: { planet: Planet; index: number }) {
  return <a className={`planet-card world-${planet.id}`} href={`#/planet/${encodeURIComponent(planet.id)}`} aria-label={`Explore ${planet.name}`}>
    <div className="card-meta"><span>NO. {String(index + 1).padStart(2, '0')}</span><span>{formatJourney(planet)}</span></div>
    <div className="card-image"><div className="card-orbit" /><div className="planet-disc"><PlanetImage planet={planet} /></div></div>
    <div className="card-body">
      <div className="card-title"><h3>{planet.name}</h3><span className="card-arrow" aria-hidden="true">↗</span></div>
      <p>{planet.description}</p>
      <div className="card-distance"><span>{formatDistance(planet.distanceFromEarthKm)} · APPROX.</span><strong>EXPLORE →</strong></div>
    </div>
  </a>;
}
