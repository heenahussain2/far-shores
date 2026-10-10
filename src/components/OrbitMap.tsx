export function OrbitMap({ cover = false }: { cover?: boolean }) {
  return <svg className={`orbit-map${cover ? ' orbit-map-cover' : ''}`} viewBox="0 0 600 600" aria-hidden="true">
    <defs><radialGradient id={cover ? 'cover-sun' : 'map-sun'} cx="38%" cy="35%"><stop stopColor="#ffe4a4" /><stop offset="1" stopColor="#e99a40" /></radialGradient></defs>
    {[85, 135, 185, 235, 280].map(radius => <circle key={radius} cx="300" cy="300" r={radius} className="orbit-line" />)}
    <circle cx="300" cy="300" r="20" fill={`url(#${cover ? 'cover-sun' : 'map-sun'})`} className="map-sun" />
    <g fill="#e7c75f"><circle cx="260" cy="225" r="6" /><text x="272" y="225">VENUS</text></g>
    <g fill="#8fb3dc"><circle cx="181" cy="364" r="5" /><text x="116" y="386">YOU ARE HERE</text></g>
    <g fill="#c2c1ba"><circle cx="193" cy="355" r="2" /></g>
    <g fill="#d67650"><circle cx="451" cy="193" r="7" /><text x="465" y="194">MARS</text></g>
    <g fill="#e69b45"><circle cx="93" cy="189" r="8" /><text x="107" y="190">SATURN</text></g>
    <g fill="#9dc7d8"><circle cx="444" cy="540" r="6" /><text x="457" y="541">NEPTUNE</text></g>
  </svg>;
}
