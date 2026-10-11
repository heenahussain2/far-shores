import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCatalogue } from './hooks/useCatalogue';
import { PlanetForm } from './components/PlanetForm';
import type { Planet } from './types/planet';
import type { CatalogueRepository } from './lib/catalogueRepository';
import { DestinationCatalogue } from './components/DestinationCatalogue';
import { PlanetProfile } from './components/PlanetProfile';
import { LandingCover } from './components/LandingCover';
import { TravelPass } from './components/TravelPass';

function currentRoute(): string {
  if (window.location.hash === '#destinations') return '#/destinations';
  return window.location.hash.startsWith('#/') ? window.location.hash : '#/';
}

function planetIdFromRoute(route: string): string | null {
  const match = route.match(/^#\/planet\/([^/]+)$/);
  if (!match) return null;
  try { return decodeURIComponent(match[1]); } catch { return '__invalid_route__'; }
}

export default function App({ repository }: { repository?: CatalogueRepository }) {
  const [route, setRoute] = useState(currentRoute);
  const [query, setQuery] = useState('');
  const catalogue = useCatalogue(repository);
  const [entry, setEntry] = useState<Planet | 'new' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [bookedTrip, setBookedTrip] = useState<Planet | null>(null);
  const returnFocus = useRef<string | null>(null);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    function navigate() {
      if (!window.location.hash.startsWith('#/') && window.location.hash !== '#destinations') return;
      const next = currentRoute();
      // In-page anchors do not replace the profile or start a page transition.
      setRoute(next);
      setEntry(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('hashchange', navigate);
    return () => {
      window.removeEventListener('hashchange', navigate);
    };
  }, []);
  const planetId = planetIdFromRoute(route);
  const planet = catalogue.planets.find(item => item.id === planetId);
  const passId = route.startsWith('#/pass/') ? planetIdFromRoute(route.replace('#/pass/', '#/planet/')) : null;
  const passPlanet = catalogue.planets.find(item => item.id === passId);
  const trip = bookedTrip?.id === passId ? bookedTrip : null;
  const isCatalogue = route === '#/destinations';
  const isHome = route === '#/';
  useLayoutEffect(() => {
    if (catalogue.loading) return;
    if (entry) document.getElementById('field-name')?.focus({ preventScroll: true });
    else if (returnFocus.current) {
      document.getElementById(returnFocus.current)?.focus();
      returnFocus.current = null;
    } else main.current?.focus({ preventScroll: true });
  }, [route, entry, catalogue.loading]);
  function openForm(original?: Planet) {
    setEntry(original ?? 'new');
    setFeedback('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  async function savePlanet(value: Planet) {
    await catalogue.save(value);
    setBookedTrip(null);
    setEntry(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const next = `#/planet/${encodeURIComponent(value.id)}`;
    window.location.hash = next;
    setRoute(next);
    setFeedback(`${value.name} saved in this browser.`);
  }
  function cancelForm() {
    returnFocus.current = entry === 'new' ? 'add-planet' : 'edit-planet';
    setEntry(null);
  }
  function bookTrip(value: Planet) {
    setBookedTrip({ ...value });
    setFeedback('');
    window.location.hash = `#/pass/${encodeURIComponent(value.id)}`;
  }
  function closePass() {
    if (!trip) return;
    returnFocus.current = 'book-package';
    const next = `#/planet/${encodeURIComponent(trip.id)}`;
    window.location.hash = next;
    setRoute(next);
    setBookedTrip(null);
  }
  useEffect(() => { document.title = trip ? `${trip.name} travel pass — Far Shores` : planet ? `${planet.name} — Far Shores` : isCatalogue ? 'Destinations — Far Shores' : 'Far Shores — Planetary Travel Guide'; }, [planet, trip, isCatalogue]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="header-inner"><a href="#/" className="brand" aria-label="Far Shores home">Far <span>Shores</span></a><nav aria-label="Main navigation"><a href="#/destinations" aria-current={isCatalogue ? 'page' : undefined} className="nav-link">Destinations</a><a href="/credits.html" className="nav-link">Field notes</a></nav></div></header>
    <main id="main-content" ref={main} tabIndex={-1}>
      {catalogue.loadError && <div className="storage-notice" role="alert"><p>{catalogue.loadError}</p><button className="secondary-button" onClick={catalogue.retry}>Retry loading</button></div>}
      <p className="save-feedback" role="status">{feedback}</p>
      <div key={`${route}:${entry ? 'form' : 'view'}`} className="page-content page-enter">{catalogue.loading ? <p className="loading-state" role="status">Opening your atlas…</p> : entry ? <PlanetForm original={entry === 'new' ? undefined : entry} saving={catalogue.saving} onSave={savePlanet} onCancel={cancelForm} /> : isHome ? <LandingCover planets={catalogue.planets} /> : isCatalogue ? <DestinationCatalogue planets={catalogue.planets} query={query} onQuery={setQuery} onAdd={() => openForm()} readOnly={catalogue.readOnly} /> : passId ? (trip ? <TravelPass planet={trip} onClose={closePass} /> : <section className="empty-state"><h1>No booked trip</h1><p>Book a package from the destination details to create a pass for this visit.</p><a className="primary-button" href={passPlanet ? `#/planet/${encodeURIComponent(passPlanet.id)}` : '#/destinations'}>Back to {passPlanet ? 'destination details' : 'destinations'}</a></section>) : planet ? <PlanetProfile key={planet.id} planet={planet} onEdit={() => openForm(planet)} onBook={() => bookTrip(planet)} readOnly={catalogue.readOnly} /> : <section className="empty-state"><h1>Destination not found</h1><p>This horizon isn’t in your catalogue.</p><a className="primary-button" href="#/destinations">All destinations</a></section>}</div>
    </main>
    <footer className="site-footer"><a href="#/" className="footer-brand">FAR SHORES · SEASON 2026 / 27</a><span>REAL WORLDS. IMAGINED HOLIDAYS.</span><a href="/credits.html" className="source-link">Science & image credits ↗</a></footer>
  </>;
}
