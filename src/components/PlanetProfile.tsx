import { useEffect, useRef, useState } from 'react';
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

const chapters = [
  { id: 'science-section', label: '01 / In numbers' },
  { id: 'conditions-section', label: '02 / Life & atmosphere' },
  { id: 'sights-section', label: '03 / What you’ll see' },
  { id: 'trip-details', label: '04 / Packing & survival' },
];

export function PlanetProfile({ planet, planets, onEdit, onBook, readOnly }: { planet: Planet; planets: Planet[]; onEdit: () => void; onBook: () => void; readOnly: boolean }) {
  const sights = getSights(planet);
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const chapterNav = useRef<HTMLElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const index = planets.findIndex(item => item.id === planet.id);
  const previous = planets[(index - 1 + planets.length) % planets.length];
  const next = planets[(index + 1) % planets.length];
  useEffect(() => {
    let frame = 0;
    function updateChapter() {
      frame = 0;
      const navHeight = chapterNav.current?.getBoundingClientRect().height ?? 0;
      details.current?.style.setProperty('--chapter-offset', `${navHeight + 24}px`);
      let current = chapters[0].id;
      for (const chapter of chapters) {
        if ((document.getElementById(chapter.id)?.getBoundingClientRect().top ?? Infinity) <= navHeight + 25) current = chapter.id;
      }
      setActiveChapter(current);
    }
    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateChapter);
    }
    updateChapter();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    if (chapterNav.current) observer.observe(chapterNav.current);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const nav = chapterNav.current;
    const button = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (nav && button && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: button.offsetLeft - nav.offsetLeft - 12, behavior: 'instant' });
    }
  }, [activeChapter]);
  return <article className={`profile world-${planet.id}`}>
    <div className="profile-actions"><a href="#/destinations" className="back-link">← All destinations</a><button id="edit-planet" className="secondary-button" onClick={onEdit} disabled={readOnly}>Edit planet <span aria-hidden="true">↗</span></button></div>
    <header className="profile-header">
      <div className="profile-image"><div className="profile-orbit" /><div className="planet-disc"><PlanetImage planet={planet} /></div></div>
      <div className="profile-intro"><p className="eyebrow">DESTINATION GUIDE / {formatJourney(planet)}</p><h1>{planet.name}</h1><p>{planet.description}</p><button type="button" className="primary-button" onClick={() => goToSection('profile-details')}>Discover your holiday <span aria-hidden="true">↓</span></button><span className="outline-tag">REAL WORLD. IMAGINED GETAWAY.</span></div>
    </header>
    <div id="profile-details" ref={details} className="profile-details" tabIndex={-1}>
      <nav ref={chapterNav} className="profile-section-nav" aria-label="Destination sections">
        {chapters.map(chapter => <button key={chapter.id} aria-current={activeChapter === chapter.id ? 'location' : undefined} aria-controls={chapter.id} onClick={() => goToSection(chapter.id)}>{chapter.label}</button>)}
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
    {planets.length > 1 && <nav className="world-pagination" aria-label="Explore more destinations">
      <a href={`#/planet/${encodeURIComponent(previous.id)}`}><span className="eyebrow">← Previous world</span><strong>{previous.name}</strong></a>
      <a href={`#/planet/${encodeURIComponent(next.id)}`}><span className="eyebrow">Next world →</span><strong>{next.name}</strong></a>
    </nav>}
  </article>;
}
