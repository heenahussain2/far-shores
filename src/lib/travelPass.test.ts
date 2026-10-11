import { describe, expect, it } from 'vitest';
import { seedPlanets } from '../data/planets';
import { passContent, passFilename } from './travelPass';

describe('downloadable pass image', () => {
  it('includes the destination and matching journey, packing and survival copy', () => {
    const earth = seedPlanets.find(p => p.id === 'earth')!;
    const content = passContent(earth);
    expect(content.destination).toBe(earth.name);
    expect(content.sections[0].title).toBe('0 hours · staycation');
    expect(content.sections[1].body).toBe(earth.thingsToBring);
    expect(content.sections[2].title).toBe(earth.survivalLabel);
    expect(content.sections[2].body).toBe(earth.survivalDescription);
    expect(content.warning).toBeNull();
  });
  it('keeps incomplete trip details unknown and includes the risk warning', () => {
    const content = passContent({ ...seedPlanets[0], distanceFromEarthKm: null, thingsToBring: null, survivalLabel: null, survivalDescription: null });
    expect(content.warning).toBe('Details unknown. Book at your own risk.');
    expect(content.sections[0].title).toBe('Unknown');
    expect(content.sections[1].body).toBe('Unknown');
    expect(content.sections[2]).toMatchObject({ title: 'Unknown', body: 'Unknown' });
  });
  it('treats custom content as literal text and provides a safe PNG filename', () => {
    const planet = { ...seedPlanets[0], name: '<script>bad()</script>', survivalDescription: 'A & B' };
    expect(passContent(planet).destination).toBe(planet.name);
    expect(passContent(planet).sections[2].body).toBe('A & B');
    expect(passFilename(planet)).toMatch(/^far-shores-[a-z0-9-]+-pass\.png$/);
    expect(passFilename({ ...planet, name: '✨' })).toBe('far-shores-destination-pass.png');
  });
});
