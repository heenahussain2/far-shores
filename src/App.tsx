import { useEffect, useRef, useState } from 'react';
import { seedPlanets } from './data/planets';
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
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    function navigate() {
      if (!window.location.hash.startsWith('#/') && window.location.hash !== '#destinations') return;
      const next = currentRoute();
      // In-page anchors do not replace the profile or start a page transition.
      setRoute(next);
      window.scrollTo({ top: 0, behavior: 'instant' });
      requestAnimationFrame(() => main.current?.focus({ preventScroll: true }));
    }
    window.addEventListener('hashchange', navigate);
    return () => {
      window.removeEventListener('hashchange', navigate);
    };
  }, []);
  const planetId = planetIdFromRoute(route);
  const planet = seedPlanets.find(item => item.id === planetId);
  const isCatalogue = route === '#/destinations';
  const isHome = route === '#/';
  useEffect(() => { document.title = planet ? `${planet.name} — Far Shores` : isCatalogue ? 'Destinations — Far Shores' : 'Far Shores — Planetary Travel Guide'; }, [planet, isCatalogue]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="header-inner"><a href="#/" className="brand" aria-label="Far Shores home">Far <span>Shores</span></a><nav aria-label="Main navigation"><a href="#/destinations" aria-current={isCatalogue ? 'page' : undefined} className="nav-link">Destinations</a><a href="/credits.html" className="nav-link">Field notes</a></nav></div></header>
    <main id="main-content" ref={main} tabIndex={-1}><div key={route} className="page-content page-enter">{isHome ? <LandingCover planets={seedPlanets} /> : isCatalogue ? <DestinationCatalogue planets={seedPlanets} query={query} onQuery={setQuery} /> : planet ? <PlanetProfile key={planet.id} planet={planet} /> : <section className="empty-state"><h1>Destination not found</h1><p>This horizon isn’t in your catalogue.</p><a className="primary-button" href="#/destinations">All destinations</a></section>}</div></main>
    <footer className="site-footer"><a href="#/" className="footer-brand">FAR SHORES · SEASON 2026 / 27</a><span>REAL WORLDS. IMAGINED HOLIDAYS.</span><a href="/credits.html" className="source-link">Science & image credits ↗</a></footer>
  </>;
}
