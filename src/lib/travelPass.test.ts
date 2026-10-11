import { describe, expect, it } from 'vitest';
import { seedPlanets } from '../data/planets';
import { createPassDocument, passFilename } from './travelPass';

describe('downloadable pass', () => {
  it('includes the booked destination and matching journey, packing and survival copy', () => {
    const earth = seedPlanets.find(p => p.id === 'earth')!;
    const html = createPassDocument(earth);
    for (const text of [earth.name, '0 hours · staycation', earth.thingsToBring!, earth.survivalLabel!, earth.survivalDescription!, 'FICTIONAL TRAVEL PASS']) expect(html).toContain(text);
    expect(html).not.toContain('Details unknown.');
  });
  it('keeps incomplete trip details unknown and includes the risk warning', () => {
    const html = createPassDocument({ ...seedPlanets[0], distanceFromEarthKm: null, thingsToBring: null, survivalLabel: null, survivalDescription: null });
    expect(html).toContain('Details unknown. Book at your own risk.');
    expect(html.match(/Unknown/g)).toHaveLength(4);
  });
  it('escapes custom content and provides a safe download filename', () => {
    const planet = { ...seedPlanets[0], name: '<script>bad()</script>', thingsToBring: '<img src=x onerror=alert(1)>', survivalDescription: 'A & B' };
    const html = createPassDocument(planet);
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('A &amp; B');
    expect(passFilename(planet)).toMatch(/^far-shores-[a-z0-9-]+-pass\.html$/);
  });
});
