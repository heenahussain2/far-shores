import type { Planet } from '../types/planet';
import { formatDistance, formatJourney, MOVEMENT_NOTE } from '../lib/journey';
import { PlanetImage } from './PlanetImage';
import { HolidayReveal } from './HolidayReveal';

export function PlanetProfile({ planet }: { planet: Planet }) {
  return <article className={`profile world-${planet.id}`}>
    <a href="#/destinations" className="back-link">← All destinations</a>
    <header className="profile-header"><div className="profile-image"><div className="profile-orbit" /><div className="planet-disc"><PlanetImage planet={planet} /></div></div><div className="profile-intro"><p className="eyebrow">DESTINATION GUIDE / {formatJourney(planet)}</p><h1>{planet.name}</h1><p>{planet.description}</p><button type="button" className="primary-button" onClick={() => document.getElementById('booking-heading')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })}>Discover your holiday <span aria-hidden="true">↓</span></button><span className="outline-tag">REAL WORLD. IMAGINED GETAWAY.</span></div></header>
    <section className="science-section" aria-labelledby="science-heading"><p className="eyebrow">01 / KNOW BEFORE YOU GO</p><h2 id="science-heading">The destination, in numbers.</h2>
      <dl className="science-grid"><div><dt>From Earth · approximate</dt><dd>{formatDistance(planet.distanceFromEarthKm)}</dd></div><div><dt>Journey estimate</dt><dd>{formatJourney(planet)}</dd></div><div><dt>From Sun / host star · approximate</dt><dd>{formatDistance(planet.distanceFromStarKm)}</dd></div></dl>
      <div className="estimate-note"><p>{MOVEMENT_NOTE}</p><p><strong>Distance basis:</strong> {planet.distanceBasis?.trim() || 'Unknown'}</p><p><strong>Assumed cruising speed:</strong> {planet.cruiseSpeedKmh === null ? 'Unknown' : `${new Intl.NumberFormat('en').format(planet.cruiseSpeedKmh)} km/h`}. Journey = distance ÷ speed; a simplified fictional estimate, without acceleration or orbital navigation.</p></div>
    </section>
    <div className="profile-stories"><section aria-labelledby="atmosphere-heading"><p className="eyebrow">02 / SCIENTIFIC CONDITIONS</p><h2 id="atmosphere-heading">The atmosphere.</h2><p>{planet.atmosphere?.trim() || 'Unknown'}</p></section><section aria-labelledby="living-heading"><p className="eyebrow">03 / ARTISTIC INTERPRETATION</p><h2 id="living-heading">Picture yourself here.</h2><p>{planet.livingThere?.trim() || 'Unknown'}</p><span className="interpretation-note">Imagined experience, inspired by the science.</span></section></div>
    <HolidayReveal key={planet.id} planet={planet} />
  </article>;
}
