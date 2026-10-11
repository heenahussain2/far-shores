import type { Planet } from '../types/planet';
import { hasMissingTripDetails } from '../lib/journey';

export function HolidayReveal({ planet, onBook }: { planet: Planet; onBook: () => void }) {
  const risk = hasMissingTripDetails(planet);
  return <section className="booking-section" aria-labelledby="booking-heading">
    <div className="booking-intro"><p className="eyebrow">YOUR HORIZON AWAITS</p><h2 id="booking-heading">Shall we make it a trip?</h2><p>A little imagination. A healthy respect for planetary conditions.</p></div>
    <button id="book-package" className="primary-button" onClick={onBook}>{risk && <span aria-hidden="true">⚠ </span>}Book the package <span aria-hidden="true">↗</span>{risk && <span className="sr-only"> — Missing trip details; book at your own risk</span>}</button>
    {risk && <p className="risk-warning">Some trip details are unknown. Booking remains fictional.</p>}
  </section>;
}
