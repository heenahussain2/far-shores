import { useRef, useState } from 'react';
import type { Planet } from '../types/planet';
import { createPassImage, passContent, passFilename } from '../lib/travelPass';

export function TravelPass({ planet, onClose }: { planet: Planet; onClose: () => void }) {
  const ticket = useRef<HTMLElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [imageError, setImageError] = useState('');
  const content = passContent(planet);
  async function downloadPass() {
    if (!ticket.current || downloading) return;
    setDownloading(true);
    setImageError('');
    try {
      const blob = await createPassImage(ticket.current);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = passFilename(planet);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      setImageError('Could not create your pass image. Please try downloading again.');
    } finally {
      setDownloading(false);
    }
  }
  return <section className={`pass-page world-${planet.id}`} aria-labelledby="pass-heading">
    <div className="pass-actions"><p className="eyebrow">YOUR HORIZON / BOOKING CONFIRMED</p><div className="pass-controls"><button type="button" className="primary-button" onClick={downloadPass} disabled={downloading}>{downloading ? 'Preparing image…' : 'Download pass'} <span aria-hidden="true">↓</span></button><button type="button" className="secondary-button" onClick={onClose}>Close <span aria-hidden="true">×</span><span className="sr-only"> — Back to destination details</span></button></div></div>
    {imageError && <p className="risk-warning" role="alert">{imageError}</p>}
    <article ref={ticket} className="itinerary travel-pass" tabIndex={0} aria-label={`Travel pass for ${planet.name}`}>
      <div className="itinerary-header"><div><p className="eyebrow">PASSENGER ITINERARY / FICTIONAL TRIP</p><h1 id="pass-heading">Travel booked!</h1></div><span className="confirmation-stamp">IMAGINATION<br />CONFIRMED</span></div>
      <p className="itinerary-destination">Next stop: <strong>{content.destination}</strong></p>
      {content.warning && <p className="risk-warning">{content.warning}</p>}
      <div className="itinerary-grid">{content.sections.map(section => <div key={section.label}><span className="eyebrow">{section.label}</span><h2>{section.title}</h2><p>{section.body}</p></div>)}</div>
      <p className="fiction-note">{content.note}</p>
    </article>
    <p className="pass-download-note">Download this ticket as a PNG image.</p>
  </section>;
}
