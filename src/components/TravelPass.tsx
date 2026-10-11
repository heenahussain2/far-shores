import { useEffect, useState } from 'react';
import type { Planet } from '../types/planet';
import { formatJourney, hasMissingTripDetails } from '../lib/journey';
import { createPassDocument, FICTION_NOTE, passFilename } from '../lib/travelPass';

export function TravelPass({ planet, onClose }: { planet: Planet; onClose: () => void }) {
  const [downloadUrl, setDownloadUrl] = useState('');
  useEffect(() => {
    const url = URL.createObjectURL(new Blob([createPassDocument(planet)], { type: 'text/html;charset=utf-8' }));
    setDownloadUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [planet]);
  return <section className={`pass-page world-${planet.id}`} aria-labelledby="pass-heading">
    <div className="pass-actions"><p className="eyebrow">YOUR HORIZON / BOOKING CONFIRMED</p><div className="pass-controls">{downloadUrl && <a className="primary-button" href={downloadUrl} download={passFilename(planet)}>Download pass <span aria-hidden="true">↓</span></a>}<button type="button" className="secondary-button" onClick={onClose}>Close <span aria-hidden="true">×</span><span className="sr-only"> — Back to destination details</span></button></div></div>
    <article className="itinerary travel-pass" tabIndex={0} aria-label={`Travel pass for ${planet.name}`}>
      <div className="itinerary-header"><div><p className="eyebrow">PASSENGER ITINERARY / FICTIONAL TRIP</p><h1 id="pass-heading">Travel booked!</h1></div><span className="confirmation-stamp">IMAGINATION<br />CONFIRMED</span></div>
      <p className="itinerary-destination">Next stop: <strong>{planet.name}</strong></p>
      {hasMissingTripDetails(planet) && <p className="risk-warning">Details unknown. Book at your own risk.</p>}
      <div className="itinerary-grid"><div><span className="eyebrow">01 / JOURNEY ESTIMATE</span><h2>{formatJourney(planet)}</h2><p>Simplified travel time using your destination’s distance and assumed cruising speed.</p></div><div><span className="eyebrow">02 / THINGS TO BRING</span><h2>Your packing brief</h2><p>{planet.thingsToBring?.trim() || 'Unknown'}</p></div><div><span className="eyebrow">03 / SURVIVAL OUTLOOK</span><h2>{planet.survivalLabel?.trim() || 'Unknown'}</h2><p>{planet.survivalDescription?.trim() || 'Unknown'}</p></div></div>
      <p className="fiction-note">{FICTION_NOTE}</p>
    </article>
    <p className="pass-download-note">HTML pass · open in your browser to read or print. Download to keep it after this visit.</p>
  </section>;
}
