import type { Planet } from '../types/planet';
import { formatJourney, hasMissingTripDetails } from './journey';

export const FICTION_NOTE = 'An educational flight of fancy. No reservation, payment, or real travel arrangement is made. Packing and survival copy are fictional.';
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

export function passFilename(planet: Planet): string {
  return `far-shores-${planet.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'destination'}-pass.html`;
}

export function createPassDocument(planet: Planet): string {
  const name = escapeHtml(planet.name);
  const text = (value: string | null) => escapeHtml(value?.trim() || 'Unknown');
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name} — Far Shores travel pass</title>
<style>*{box-sizing:border-box}body{margin:0;padding:40px 20px;background:#0b0e14;color:#efede6;font:16px/1.7 Arial,sans-serif}.pass{max-width:850px;margin:auto;border:1px solid #73717b;padding:40px;background:#161925}header{border-bottom:1px dashed #73717b;padding-bottom:24px}h1{font-size:clamp(36px,8vw,68px);line-height:1.05;letter-spacing:-2px;margin:20px 0;overflow-wrap:anywhere}.meta{font:12px/1.7 monospace;letter-spacing:2px;color:#e69b45}h2{font-size:22px;line-height:1.5}section{border-bottom:1px solid #454651;padding:16px 0}p{white-space:pre-wrap;overflow-wrap:anywhere}.warning{color:#ffbb70}footer{font-size:12px;padding-top:24px;color:#c8c6c0}@media(max-width:500px){.pass{padding:24px}}@media print{body{background:white;color:#151515;padding:0}.pass{background:white;border:1px solid #555;max-width:none}.meta,.warning,footer{color:#333}section{break-inside:avoid}}</style></head><body><article class="pass"><header><p class="meta">FAR SHORES / FICTIONAL TRAVEL PASS</p><h1>Travel booked!</h1><p>Next stop: <strong>${name}</strong></p><p>${text(planet.description)}</p></header>
${hasMissingTripDetails(planet) ? '<p class="warning">Details unknown. Book at your own risk.</p>' : ''}
<section><p class="meta">01 / JOURNEY ESTIMATE</p><h2>${escapeHtml(formatJourney(planet))}</h2><p>Simplified fictional estimate: distance ÷ cruising speed. Distances and journey times are approximate and can vary due to planetary movement.</p></section>
<section><p class="meta">02 / THINGS TO BRING</p><h2>Your packing brief</h2><p>${text(planet.thingsToBring)}</p></section>
<section><p class="meta">03 / SURVIVAL OUTLOOK</p><h2>${text(planet.survivalLabel)}</h2><p>${text(planet.survivalDescription)}</p></section>
<footer>${FICTION_NOTE}</footer></article></body></html>`;
}
