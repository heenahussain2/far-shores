import type { Planet } from '../types/planet';
import { formatJourney, hasMissingTripDetails } from './journey';

export const FICTION_NOTE = 'An educational flight of fancy. No reservation, payment, or real travel arrangement is made. Packing and survival copy are fictional.';

export function passFilename(planet: Planet): string {
  return `far-shores-${planet.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'destination'}-pass.png`;
}

export function passContent(planet: Planet) {
  const text = (value: string | null) => value?.trim() || 'Unknown';
  return {
    destination: planet.name,
    warning: hasMissingTripDetails(planet) ? 'Details unknown. Book at your own risk.' : null,
    sections: [
      { label: '01 / JOURNEY ESTIMATE', title: formatJourney(planet), body: 'Simplified travel time using your destination’s distance and assumed cruising speed.' },
      { label: '02 / THINGS TO BRING', title: 'Your packing brief', body: text(planet.thingsToBring) },
      { label: '03 / SURVIVAL OUTLOOK', title: text(planet.survivalLabel), body: text(planet.survivalDescription) },
    ],
    note: FICTION_NOTE,
  };
}

export async function createPassImage(ticket: HTMLElement): Promise<Blob> {
  const { toBlob } = await import('html-to-image');
  await document.fonts.ready;
  // Capture only the ticket, at its current responsive width, with all its text.
  const clone = ticket.cloneNode(true) as HTMLElement;
  clone.setAttribute('aria-hidden', 'true');
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
  Object.assign(clone.style, {
    position: 'fixed', left: '-100000px', top: '0',
    width: `${ticket.getBoundingClientRect().width}px`,
    maxHeight: 'none', height: 'auto', overflow: 'visible', margin: '0',
  });
  clone.style.setProperty('--world', getComputedStyle(ticket).getPropertyValue('--world'));
  const stamp = clone.querySelector<HTMLElement>('.confirmation-stamp');
  if (stamp) { stamp.style.animation = 'none'; stamp.style.opacity = '1'; stamp.style.transform = 'rotate(-7deg)'; }
  document.body.appendChild(clone);
  try {
    const blob = await toBlob(clone, {
      pixelRatio: 2,
      skipFonts: true,
      style: { position: 'static', left: 'auto', top: 'auto' },
    });
    if (!blob) throw new Error('Could not create the pass image.');
    return blob;
  } finally {
    clone.remove();
  }
}
