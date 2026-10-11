import type { Planet } from '../types/planet';
import { formatDistance, formatJourney, MOVEMENT_NOTE } from '../lib/journey';
import { PlanetImage } from './PlanetImage';
import { HolidayReveal } from './HolidayReveal';
import { getSights } from '../data/sights';

function goToSection(id: string) {
  const section = document.getElementById(id);
  section?.focus({ preventScroll: true });
  section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

export function PlanetProfile({ planet, onEdit, onBook, readOnly }: { planet: Planet; onEdit: () => void; onBook: () => void; readOnly: boolean }) {
  const sights = getSights(planet);
  return <article className={`profile world-${planet.id}`}>
    <div className="profile-actions"><a href="#/destinations" className="back-link">← All destinations</a><button id="edit-planet" className="secondary-button" onClick={onEdit} disabled={readOnly}>Edit planet <span aria-hidden="true">↗</span></button></div>
    <header className="profile-header">
      <div className="profile-image"><div className="profile-orbit" /><div className="planet-disc"><PlanetImage planet={planet} /></div></div>
      <div className="profile-intro"><p className="eyebrow">DESTINATION GUIDE / {formatJourney(planet)}</p><h1>{planet.name}</h1><p>{planet.description}</p><button type="button" className="primary-button" onClick={() => goToSection('profile-details')}>Discover your holiday <span aria-hidden="true">↓</span></button><span className="outline-tag">REAL WORLD. IMAGINED GETAWAY.</span></div>
    </header>
    <div id="profile-details" className="profile-details" tabIndex={-1}>
      <nav className="profile-section-nav" aria-label="Destination sections">
        <button onClick={() => goToSection('science-section')}>01 / In numbers</button>
        <button onClick={() => goToSection('conditions-section')}>02 / Life & atmosphere</button>
        <button onClick={() => goToSection('sights-section')}>03 / What you’ll see</button>
        <button onClick={() => goToSection('trip-details')}>04 / Packing & survival</button>
      </nav>
      <section id="science-section" className="science-section profile-chapter" tabIndex={-1} aria-labelledby="science-heading">
        <p className="eyebrow">01 / KNOW BEFORE YOU GO</p><h2 id="science-heading">The destination, in numbers.</h2>
        <dl className="science-grid"><div><dt>From Earth · approximate</dt><dd>{formatDistance(planet.distanceFromEarthKm)}</dd></div><div><dt>Journey estimate</dt><dd>{formatJourney(planet)}</dd></div><div><dt>From Sun / host star · approximate</dt><dd>{formatDistance(planet.distanceFromStarKm)}</dd></div></dl>
        <div className="estimate-note"><p>{MOVEMENT_NOTE}</p><p><strong>Distance basis:</strong> {planet.distanceBasis?.trim() || 'Unknown'}</p><p><strong>Assumed cruising speed:</strong> {planet.cruiseSpeedKmh === null ? 'Unknown' : `${new Intl.NumberFormat('en').format(planet.cruiseSpeedKmh)} km/h`}. Journey = distance ÷ speed; a simplified fictional estimate, without acceleration or orbital navigation.</p></div>
      </section>
      <section id="conditions-section" className="profile-chapter" tabIndex={-1} aria-labelledby="conditions-heading">
        <p className="eyebrow">02 / GET TO KNOW THE WORLD</p><h2 id="conditions-heading">Life & atmosphere.</h2>
        <div className="profile-stories">
          <section aria-labelledby="atmosphere-heading"><p className="eyebrow">SCIENTIFIC CONDITIONS</p><h3 id="atmosphere-heading">The atmosphere.</h3><p>{planet.atmosphere?.trim() || 'Unknown'}</p></section>
          <section aria-labelledby="living-heading"><p className="eyebrow">ARTISTIC INTERPRETATION</p><h3 id="living-heading">Picture yourself here.</h3><p>{planet.livingThere?.trim() || 'Unknown'}</p><span className="interpretation-note">Imagined experience, inspired by the science.</span></section>
        </div>
      </section>
      <section id="sights-section" className="sights-section profile-chapter" tabIndex={-1} aria-labelledby="sights-heading">
        <p className="eyebrow">03 / THE VIEWS WORTH THE JOURNEY</p><h2 id="sights-heading">What you’ll see.</h2><p className="sights-note">Destination highlights for an imagined visit. Some views are from orbit or through scientific observations.</p>
        <div className="sights-grid">{sights.length ? sights.map((sight, index) => <article className="sight-card" key={index}><span className="eyebrow">{String(index + 1).padStart(2, '0')}</span><div><h3>{sight.title}</h3><p>{sight.description}</p></div></article>) : <article className="sight-card"><span className="eyebrow">01</span><div><h3>Unknown</h3><p>No sights added yet. Use Edit planet to add the views worth travelling for.</p></div></article>}</div>
      </section>
      <section id="trip-details" className="profile-chapter" tabIndex={-1} aria-labelledby="trip-heading">
        <p className="eyebrow">04 / YOUR FICTIONAL HOLIDAY BRIEFING</p><h2 id="trip-heading">Packing & survival.</h2>
        <div className="profile-stories">
          <section aria-labelledby="packing-heading"><p className="eyebrow">FICTIONAL PACKING BRIEF</p><h3 id="packing-heading">Things to bring.</h3><p>{planet.thingsToBring?.trim() || 'Unknown'}</p><span className="interpretation-note">Imagined packing advice for a fictional holiday.</span></section>
          <section aria-labelledby="survival-heading"><p className="eyebrow">FICTIONAL SURVIVAL VERDICT</p><h3 id="survival-heading">Survival outlook.</h3><p className="survival-label">{planet.survivalLabel?.trim() || 'Unknown'}</p><p>{planet.survivalDescription?.trim() || 'Unknown'}</p><span className="interpretation-note">A playful interpretation of the conditions.</span></section>
        </div>
      </section>
      <HolidayReveal key={planet.id} planet={planet} onBook={onBook} />
    </div>
  </article>;
}
