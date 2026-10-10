import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCatalogue } from './hooks/useCatalogue';
import { PlanetForm } from './components/PlanetForm';
import type { Planet } from './types/planet';
import { DestinationCatalogue } from './components/DestinationCatalogue';
import { PlanetProfile } from './components/PlanetProfile';
import { LandingCover } from './components/LandingCover';

function currentRoute(): string {
  if (window.location.hash === '#destinations') return '#/destinations';
  return window.location.hash.startsWith('#/') ? window.location.hash : '#/';
}

function planetIdFromRoute(route: string): string | null {
  const match = route.match(/^#\/planet\/([^/]+)$/);
  if (!match) return null;
  try { return decodeURIComponent(match[1]); } catch { return '__invalid_route__'; }
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [query, setQuery] = useState('');
  const catalogue = useCatalogue();
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    function navigate() {
      if (!window.location.hash.startsWith('#/') && window.location.hash !== '#destinations') return;
      const next = currentRoute();
      // In-page anchors do not replace the profile or start a page transition.
      setRoute(next);
      setAdding(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('hashchange', navigate);
    return () => {
      window.removeEventListener('hashchange', navigate);
    };
  }, []);
  const planetId = planetIdFromRoute(route);
  const planet = catalogue.planets.find(item => item.id === planetId);
  const isCatalogue = route === '#/destinations';
  const isHome = route === '#/';
  useLayoutEffect(() => {
    if (catalogue.loading) return;
    if (adding) document.getElementById('field-name')?.focus({ preventScroll: true });
    else main.current?.focus({ preventScroll: true });
  }, [route, adding, catalogue.loading]);
  function openForm() {
    setAdding(true);
    setFeedback('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  async function savePlanet(value: Planet) {
    await catalogue.save(value);
    setAdding(false);
    const next = `#/planet/${encodeURIComponent(value.id)}`;
    window.location.hash = next;
    setRoute(next);
    setFeedback(`${value.name} saved in this browser.`);
  }
  function cancelForm() {
    setAdding(false);
    requestAnimationFrame(() => document.getElementById('add-planet')?.focus());
  }
  useEffect(() => { document.title = planet ? `${planet.name} — Far Shores` : isCatalogue ? 'Destinations — Far Shores' : 'Far Shores — Planetary Travel Guide'; }, [planet, isCatalogue]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="header-inner"><a href="#/" className="brand" aria-label="Far Shores home">Far <span>Shores</span></a><nav aria-label="Main navigation"><a href="#/destinations" aria-current={isCatalogue ? 'page' : undefined} className="nav-link">Destinations</a><a href="/credits.html" className="nav-link">Field notes</a></nav></div></header>
    <main id="main-content" ref={main} tabIndex={-1}>
      {catalogue.loadError && <div className="storage-notice" role="alert"><p>{catalogue.loadError}</p><button className="secondary-button" onClick={catalogue.retry}>Retry loading</button></div>}
      <p className="save-feedback" role="status">{feedback}</p>
      <div key={`${route}:${adding}`} className="page-content page-enter">{catalogue.loading ? <p className="loading-state" role="status">Opening your atlas…</p> : adding ? <PlanetForm saving={catalogue.saving} onSave={savePlanet} onCancel={cancelForm} /> : isHome ? <LandingCover planets={catalogue.planets} /> : isCatalogue ? <DestinationCatalogue planets={catalogue.planets} query={query} onQuery={setQuery} onAdd={openForm} readOnly={catalogue.readOnly} /> : planet ? <PlanetProfile key={planet.id} planet={planet} /> : <section className="empty-state"><h1>Destination not found</h1><p>This horizon isn’t in your catalogue.</p><a className="primary-button" href="#/destinations">All destinations</a></section>}</div>
    </main>
    <footer className="site-footer"><a href="#/" className="footer-brand">FAR SHORES · SEASON 2026 / 27</a><span>REAL WORLDS. IMAGINED HOLIDAYS.</span><a href="/credits.html" className="source-link">Science & image credits ↗</a></footer>
  </>;
}
