import { useRef, useState } from 'react';
import type { Planet } from '../types/planet';
import { formatJourney, hasMissingTripDetails } from '../lib/journey';

export function HolidayReveal({ planet }: { planet: Planet }) {
  const [booked, setBooked] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const risk = hasMissingTripDetails(planet);
  function book() {
    setBooked(true);
    requestAnimationFrame(() => panel.current?.focus());
  }
  return <section className="booking-section" aria-labelledby="booking-heading">
    <div className="booking-intro"><p className="eyebrow">YOUR HORIZON AWAITS</p><h2 id="booking-heading">Shall we make it a trip?</h2><p>A little imagination. A healthy respect for planetary conditions.</p></div>
    <button className="primary-button" onClick={book} aria-expanded={booked} aria-controls="holiday-itinerary">{risk && <span aria-hidden="true">⚠ </span>}Book the package <span aria-hidden="true">↗</span>{risk && <span className="sr-only"> — Missing trip details; book at your own risk</span>}</button>
    {risk && <p className="risk-warning">Some trip details are unknown. Booking remains fictional.</p>}
    {booked && <div className="itinerary" id="holiday-itinerary" tabIndex={-1} ref={panel}>
      <div className="itinerary-header"><div><p className="eyebrow">PASSENGER ITINERARY / FICTIONAL TRIP</p><h3>Travel booked!</h3></div><span className="confirmation-stamp">IMAGINATION<br />CONFIRMED</span></div>
      <p className="itinerary-destination">Next stop: <strong>{planet.name}</strong></p>
      {risk && <p className="risk-warning">Details unknown. Book at your own risk.</p>}
      <div className="itinerary-grid"><div><span className="eyebrow">01 / JOURNEY ESTIMATE</span><h4>{formatJourney(planet)}</h4><p>Simplified travel time using the distance and assumed speed above.</p></div><div><span className="eyebrow">02 / THINGS TO BRING</span><h4>Your packing brief</h4><p>{planet.thingsToBring?.trim() || 'Unknown'}</p></div><div><span className="eyebrow">03 / SURVIVAL OUTLOOK</span><h4>{planet.survivalLabel?.trim() || 'Unknown'}</h4><p>{planet.survivalDescription?.trim() || 'Unknown'}</p></div></div>
      <p className="fiction-note">An educational flight of fancy. No reservation, payment, or real travel arrangement is made. Packing and survival copy are fictional.</p>
    </div>}
  </section>;
}
