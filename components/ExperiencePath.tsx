interface ExperiencePathProps {
  stops: { role: string; duration: string; blurb: string }[];
}

// Coordenadas del "camino de experiencia" (CE): del inicio (8,96) a la última
// parada (66,40). Los puntos de control de entrada/salida de la nave (ver
// globals.css, .ship) son el reflejo exacto de los controles de aquí, para
// que la dirección de viaje sea continua (sin esquina) al cruzar la unión.
const CE_PATH = "M8,96 C16,90 22,84 28,78 C34,73 42,70 48,66 C54,58 60,50 66,40";

const STOP_POSITIONS = [
  { x: 28, y: 78 },
  { x: 48, y: 66 },
  { x: 66, y: 40 },
];

export default function ExperiencePath({ stops }: ExperiencePathProps) {
  return (
    <div className="path-area">
      <svg className="path-svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="pathGrad" x1="8%" y1="96%" x2="66%" y2="40%">
            <stop offset="0%" stopColor="#e2725b" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#b599a8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="trailFade" cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sin línea en los tramos de aproximación/salida (fuera de cuadro):
            la nave vuela por espacio vacío hasta engancharse al CE. */}
        <path className="lane-line" d={CE_PATH} transform="translate(0.8,0.8)" />
        <path className="lane-line" d={CE_PATH} transform="translate(-0.8,-0.8)" style={{ animationDelay: "-0.7s" }} />

        <g className="ship">
          <ellipse className="ship-trail" cx="-6" cy="0" rx="9" ry="2.4" />
          <path className="ship-body" d="M4.5,0 L-2.5,3 L-1,0 L-2.5,-3 Z" />
        </g>
      </svg>

      {stops.map((stop, i) => {
        const n = i + 1;
        const p = STOP_POSITIONS[i];
        return (
          <div className={`stop stop-${n}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} key={stop.role}>
            {n === 3 && <div className="stop-ring stop-ring-outer" aria-hidden="true" />}
            <div className="stop-ring" aria-hidden="true" />
            <div className="stop-dot" aria-hidden="true" />
            <div className="stop-card">
              <div className="stop-role">{stop.role}</div>
              <div className="stop-duration">{stop.duration}</div>
              <div className="stop-blurb">{stop.blurb}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
