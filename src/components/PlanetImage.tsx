import { useState } from 'react';
import type { Planet } from '../types/planet';

const PLACEHOLDER = '/images/planets/unknown.svg';

function ImageWithFallback({ planet, className }: { planet: Planet; className?: string }) {
  const [failed, setFailed] = useState(false);
  const placeholder = failed || !planet.imageUrl;
  return <img className={className} src={placeholder ? PLACEHOLDER : planet.imageUrl!}
    alt={placeholder ? `Image unavailable for ${planet.name}; neutral planet illustration` : `${planet.name} destination`}
    onError={placeholder ? undefined : () => setFailed(true)} loading="lazy" referrerPolicy="no-referrer" />;
}

export function PlanetImage(props: { planet: Planet; className?: string }) {
  return <ImageWithFallback key={`${props.planet.id}:${props.planet.imageUrl}`} {...props} />;
}
