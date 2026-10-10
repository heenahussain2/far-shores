import type { Planet } from '../types/planet';
import { OrbitMap } from './OrbitMap';

export function LandingCover({ planets }: { planets: Planet[] }) {
  return <section className="hero" aria-labelledby="welcome">
    <div className="cover-masthead"><span>SEASON 2026 / 27</span><span>VOL. 01</span></div>
    <OrbitMap cover />
    <div className="hero-copy"><p className="eyebrow">A PLANETARY TRAVEL GUIDE</p>
      <h1 id="welcome">Far <em>Shores</em></h1>
      <p className="hero-intro">Welcome to your planetary travel guide.</p>
      <p className="hero-description">Eight extraordinary worlds. Beyond the everyday.<br />Bring a good jacket. And your own atmosphere.</p>
      <a className="primary-button" href="#/destinations">Explore destinations <span aria-hidden="true">→</span></a>
    </div>
    <div className="cover-footer"><ol>{planets.slice(0, 8).map((planet, index) => <li key={planet.id}><a href={`#/planet/${encodeURIComponent(planet.id)}`}><span>{String(index + 1).padStart(2, '0')}</span>{planet.name}</a></li>)}</ol><p>REAL ASTRONOMY.<br />IMAGINED HOLIDAYS.</p></div>
  </section>;
}
