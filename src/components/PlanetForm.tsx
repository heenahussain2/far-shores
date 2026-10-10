import { useRef, useState } from 'react';
import type { Planet } from '../types/planet';
import { createDraft, validateDraft, type Draft, type FieldErrors } from '../lib/validation';
import { formatJourney } from '../lib/journey';

type Props = { original?: Planet; saving: boolean; onSave: (planet: Planet) => Promise<void>; onCancel: () => void };
const fields: { key: keyof Draft; label: string; hint?: string; multiline?: boolean; numeric?: boolean }[] = [
  { key: 'name', label: 'Name', hint: 'Required' },
  { key: 'description', label: 'Description', hint: 'Required · a short introduction', multiline: true },
  { key: 'imageUrl', label: 'Image URL', hint: 'HTTP(S) URL, or blank for a placeholder. An unchanged bundled image is kept.' },
  { key: 'distanceFromEarthKm', label: 'Distance from Earth (km)', numeric: true },
  { key: 'distanceBasis', label: 'Distance basis', hint: 'Explain where your approximate distance comes from.', multiline: true },
  { key: 'distanceFromStarKm', label: 'Distance from Sun / host star (km)', numeric: true },
  { key: 'cruiseSpeedKmh', label: 'Cruising speed (km/h)', hint: 'Fictional estimate · default 100,000 km/h', numeric: true },
  { key: 'atmosphere', label: 'Atmosphere', multiline: true },
  { key: 'livingThere', label: 'Living there', hint: 'Artistic interpretation', multiline: true },
  { key: 'thingsToBring', label: 'Things to bring', multiline: true },
  { key: 'survivalLabel', label: 'Survival outlook', hint: 'A short, qualitative verdict' },
  { key: 'survivalDescription', label: 'Survival details', multiline: true },
];

export function PlanetForm({ original, saving, onSave, onCancel }: Props) {
  const [draft, setDraft] = useState(() => createDraft(original));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saveError, setSaveError] = useState('');
  const [id] = useState(() => original?.id ?? crypto.randomUUID());
  const form = useRef<HTMLFormElement>(null);
  const preview = validateDraft(draft, id, original);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    const result = validateDraft(draft, id, original);
    setErrors(result.errors);
    setSaveError('');
    const first = Object.keys(result.errors)[0];
    if (first) { form.current?.querySelector<HTMLElement>(`#field-${first}`)?.focus(); return; }
    try { await onSave(result.planet); }
    catch (error) { setSaveError(error instanceof Error ? error.message : 'Could not save. Your draft has been kept; try again.'); }
  }
  return <section className="entry-page" aria-labelledby="entry-heading">
    <p className="eyebrow">YOUR PERSONAL ATLAS / {original ? 'EDIT DESTINATION' : 'NEW DESTINATION'}</p>
    <h1 id="entry-heading">{original ? 'Revise your shore.' : 'A new horizon.'}</h1>
    <p className="entry-description">Start with a name and description. Leave anything you haven’t researched blank—it will appear as Unknown.</p>
    <form ref={form} onSubmit={submit} noValidate aria-busy={saving}>
      <fieldset disabled={saving}><legend className="sr-only">Destination details</legend><div className="entry-grid">{fields.map(field => <div className={`entry-field ${field.multiline ? 'entry-wide' : ''}`} key={field.key}>
        <label htmlFor={`field-${field.key}`}>{field.label}{(field.key === 'name' || field.key === 'description') && <span aria-hidden="true"> *</span>}</label>
        <p id={`hint-${field.key}`} className="field-hint">{field.hint ?? 'Optional · blank means Unknown'}</p>
        {field.multiline ? <textarea id={`field-${field.key}`} rows={3} value={draft[field.key]} aria-required={field.key === 'description'} aria-invalid={!!errors[field.key]} aria-describedby={`hint-${field.key}${errors[field.key] ? ` error-${field.key}` : ''}`} onChange={e => setDraft({ ...draft, [field.key]: e.target.value })} /> : <input id={`field-${field.key}`} type="text" inputMode={field.numeric ? 'decimal' : undefined} value={draft[field.key]} aria-required={field.key === 'name'} aria-invalid={!!errors[field.key]} aria-describedby={`hint-${field.key}${errors[field.key] ? ` error-${field.key}` : ''}`} onChange={e => setDraft({ ...draft, [field.key]: e.target.value })} />}
        {errors[field.key] && <p id={`error-${field.key}`} className="field-error">{errors[field.key]}</p>}
      </div>)}</div></fieldset>
      <div className="journey-preview" role="status"><span className="eyebrow">LIVE JOURNEY ESTIMATE</span><strong>{preview.errors.distanceFromEarthKm || preview.errors.cruiseSpeedKmh ? 'Check distance and speed' : formatJourney(preview.planet)}</strong><p>Distance ÷ speed. An approximate fictional journey.</p></div>
      {saveError && <p className="storage-notice" role="alert">{saveError}</p>}
      <div className="form-actions"><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save destination'} <span aria-hidden="true">→</span></button><button className="secondary-button" type="button" disabled={saving} onClick={onCancel}>Cancel</button></div>
    </form>
  </section>;
}
