interface StackConstellationProps {
  items: string[];
  descriptions: string[];
}

// Coordenadas fijas (espacio 0-100 en ambos ejes) de las 9 estrellas — mismo
// orden que `items`/`descriptions`. El polyline se deriva de aquí para que
// las líneas y los puntos nunca queden desalineados entre sí.
const STAR_POSITIONS = [
  { x: 12, y: 26 },
  { x: 30, y: 10 },
  { x: 49, y: 28 },
  { x: 39, y: 56 },
  { x: 59, y: 64 },
  { x: 79, y: 44 },
  { x: 89, y: 72 },
  { x: 69, y: 92 },
  { x: 45, y: 80 },
];

const STAR_PATH = "M0,-10 L2.6,-2.6 L10,0 L2.6,2.6 L0,10 L-2.6,2.6 L-10,0 L-2.6,-2.6 Z";

export default function StackConstellation({ items, descriptions }: StackConstellationProps) {
  const points = STAR_POSITIONS.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="const-area">
      <svg className="const-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline className="const-line" points={points} fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="stars-layer">
        {STAR_POSITIONS.map((p, i) => (
          <div
            key={items[i]}
            className={`star star-${i + 1}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <svg className="star-shape" viewBox="-12 -12 24 24">
              <path d={STAR_PATH} />
            </svg>
            <span className="star-mono">{items[i].toUpperCase()}</span>
          </div>
        ))}
      </div>
      {items.map((item, i) => (
        <div className={`info-card card-${i + 1}`} key={item}>
          <div className="info-name">{item}</div>
          <div className="info-desc">{descriptions[i]}</div>
        </div>
      ))}
    </div>
  );
}
