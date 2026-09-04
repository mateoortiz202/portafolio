import type { CSSProperties } from "react";

interface ExperiencePathProps {
  marker: string;
  heading: string;
  body: string;
  stageLabel: string;
  stops: { role: string; duration: string; blurb: string }[];
}

// Trayectoria de transferencia entre las 3 etapas reales de carrera — la
// sonda viaja exactamente sobre esta curva (ver .probe en globals.css).
// Coordenadas dentro de un viewBox 0 0 1200 640: a diferencia de la
// primera instalación, esta sección ya no vive en la columna angosta
// compartida con las demás (ver .sec-content:has(.exp-stage) en globals.css).
const TRANSFER_PATH =
  "M210,430 C300,380 380,300 470,270 C520,255 565,240 610,230 C700,205 792,220 862,270 C912,306 962,346 1000,380";

const PLANETS = [
  { cx: 210, cy: 430, r: 22, glowR: 34, fill: "url(#g-terra)", glowFill: "#e2725b" },
  { cx: 610, cy: 230, r: 18, glowR: 28, fill: "url(#g-mauve)", glowFill: "#b599a8" },
  { cx: 1000, cy: 380, r: 26, glowR: 42, fill: "url(#g-cyan)", glowFill: "#7dd3fc" },
];

// Cada placa ancla su borde inferior justo arriba de su planeta (no al
// costado): deja el cuerpo del planeta despejado y no compite con el
// texto principal, que vive más abajo. El hueco placa-planeta se mantiene
// parecido en las 3 (~15 puntos porcentuales) — el de la etapa 1 quedó
// primero mucho más lejos que las otras dos, por eso se sentía "flotando".
const PLAQUES = [
  { left: "17.5%", top: "52%", leaderHeight: "15.2%", accent: "#e2725b" },
  { left: "50.8%", top: "20%", leaderHeight: "15.9%", accent: "#b599a8" },
  { left: "83.3%", top: "44%", leaderHeight: "15.4%", accent: "#7dd3fc" },
];

export default function ExperiencePath({ marker, heading, body, stageLabel, stops }: ExperiencePathProps) {
  return (
    <div className="exp-stage">
      <div className="layer-bg" aria-hidden="true">
        <div className="nebula nebula-terra" />
        <div className="nebula nebula-mauve" />
        <div className="nebula nebula-cyan" />
        <i className="shootingstar shootingstar-1" />
        <i className="shootingstar shootingstar-2" />
        <i className="shootingstar shootingstar-3" />
      </div>

      <svg
        className="exp-svg"
        viewBox="0 0 1200 640"
        role="img"
        aria-label="Tres etapas de carrera representadas como planetas en órbitas elípticas, conectadas por una trayectoria de transferencia."
      >
        <defs>
          <radialGradient id="g-terra" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffcfc2" />
            <stop offset="45%" stopColor="#e2725b" />
            <stop offset="100%" stopColor="#7a3527" />
          </radialGradient>
          <radialGradient id="g-mauve" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#e9d9e1" />
            <stop offset="45%" stopColor="#b599a8" />
            <stop offset="100%" stopColor="#5c4652" />
          </radialGradient>
          <radialGradient id="g-cyan" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#eafbff" />
            <stop offset="42%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#1c5f7d" />
          </radialGradient>
          <linearGradient id="transfer-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e2725b" />
            <stop offset="52%" stopColor="#b599a8" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <radialGradient id="probe-trail-fade" cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
          <filter id="planet-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Ventanas de recorte para el truco de oclusión luna/planeta: cada
              luna se dibuja dos veces (misma trayectoria, mismo tiempo) — una
              copia recortada a la mitad "lejana" de su órbita y colocada
              ANTES del planeta en el documento, y otra recortada a la mitad
              "cercana" y colocada DESPUÉS. El clip-path vive en un <g>
              estático (no en el <circle> animado): un elemento en movimiento
              redefine su propio sistema de coordenadas, así que un recorte
              puesto directamente sobre él quedaría relativo a su posición ya
              desplazada, no al lienzo. */}
          <clipPath id="moon1-back" clipPathUnits="userSpaceOnUse"><rect x="150" y="402" width="120" height="29" /></clipPath>
          <clipPath id="moon1-front" clipPathUnits="userSpaceOnUse"><rect x="150" y="429" width="120" height="29" /></clipPath>
          <clipPath id="moon2-back" clipPathUnits="userSpaceOnUse"><rect x="135" y="393.5" width="150" height="35" /></clipPath>
          <clipPath id="moon2-front" clipPathUnits="userSpaceOnUse"><rect x="135" y="427.5" width="150" height="35" /></clipPath>
          <clipPath id="moon3-back" clipPathUnits="userSpaceOnUse"><rect x="553" y="199" width="114" height="32" /></clipPath>
          <clipPath id="moon3-front" clipPathUnits="userSpaceOnUse"><rect x="553" y="229" width="114" height="32" /></clipPath>
          <clipPath id="moon4-back" clipPathUnits="userSpaceOnUse"><rect x="938" y="353" width="124" height="28" /></clipPath>
          <clipPath id="moon4-front" clipPathUnits="userSpaceOnUse"><rect x="938" y="379" width="124" height="28" /></clipPath>
          <clipPath id="moon5-back" clipPathUnits="userSpaceOnUse"><rect x="920" y="344" width="160" height="37" /></clipPath>
          <clipPath id="moon5-front" clipPathUnits="userSpaceOnUse"><rect x="920" y="379" width="160" height="37" /></clipPath>

          <linearGradient id="meteor-trail-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-19.26" y2="-5.42">
            <stop offset="0%" stopColor="#eef1fa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#eef1fa" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="meteor-trail-2" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="18.77" y2="-6.89">
            <stop offset="0%" stopColor="#eef1fa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#eef1fa" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="meteor-trail-3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-19.09" y2="5.97">
            <stop offset="0%" stopColor="#eef1fa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#eef1fa" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="impact-trail" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="16.81" y2="-10.84">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* anillos orbitales, inclinados y con excentricidad propia */}
        <ellipse className="orbit orbit-a" cx="210" cy="430" rx="150" ry="54" stroke="#e2725b" />
        <ellipse className="orbit orbit-b" cx="610" cy="230" rx="136" ry="74" stroke="#b599a8" />
        <ellipse className="orbit orbit-c" cx="1000" cy="380" rx="178" ry="50" stroke="#7dd3fc" />

        {/* trayectoria de transferencia entre las 3 etapas — la copia
            "glow" (más ancha, difuminada) le da presencia contra el
            starfield del fondo, que ya no queda detrás de un panel propio */}
        <path className="transfer-line-glow" stroke="url(#transfer-grad)" d={TRANSFER_PATH} />
        <path className="transfer-line" stroke="url(#transfer-grad)" d={TRANSFER_PATH} />
        <g className="burn-marks">
          <line x1="458" y1="285" x2="482" y2="255" />
          <line x1="850" y1="286" x2="874" y2="254" />
        </g>

        {/* meteoritos ambientales: cruzan de vez en cuando, con estela */}
        <g className="meteor meteor-1">
          <line className="meteor-trail" x1="0" y1="0" x2="-19.26" y2="-5.42" stroke="url(#meteor-trail-1)" />
          <polygon className="rock" points="-3,-2 2,-3 4,0 2,3 -3,2 -4,0" />
          <animateMotion path="M-40,120 L1240,480" dur="26s" begin="-4s" repeatCount="indefinite" />
        </g>
        <g className="meteor meteor-2">
          <line className="meteor-trail" x1="0" y1="0" x2="18.77" y2="-6.89" stroke="url(#meteor-trail-2)" />
          <polygon className="rock" points="-2,-3 3,-2 3,2 -1,3 -3,1" />
          <animateMotion path="M1240,90 L-40,560" dur="32s" begin="-18s" repeatCount="indefinite" />
        </g>
        <g className="meteor meteor-3">
          <line className="meteor-trail" x1="0" y1="0" x2="-19.09" y2="5.97" stroke="url(#meteor-trail-3)" />
          <polygon className="rock" points="-3,-1 1,-3 3,1 0,3 -3,2" />
          <animateMotion path="M-40,540 L1240,140" dur="21s" begin="-9s" repeatCount="indefinite" />
        </g>

        {/* lunas: mitad lejana (detrás del planeta) */}
        <g clipPath="url(#moon1-back)"><circle className="moon" r="3.4"><animateMotion dur="7s" repeatCount="indefinite" path="M260,430 A50,18 0 1 1 160,430 A50,18 0 1 1 260,430" /></circle></g>
        <g clipPath="url(#moon2-back)"><circle className="moon" r="2.6" style={{ opacity: 0.6 }}><animateMotion dur="11s" repeatCount="indefinite" path="M275,430 A65,25 0 1 1 145,430 A65,25 0 1 1 275,430" /></circle></g>
        <g clipPath="url(#moon3-back)"><circle className="moon" r="3"><animateMotion dur="9s" repeatCount="indefinite" path="M657,230 A47,21 0 1 1 563,230 A47,21 0 1 1 657,230" /></circle></g>
        <g clipPath="url(#moon4-back)"><circle className="moon" r="3.8"><animateMotion dur="6.4s" repeatCount="indefinite" path="M1052,380 A52,17 0 1 1 948,380 A52,17 0 1 1 1052,380" /></circle></g>
        <g clipPath="url(#moon5-back)"><circle className="moon" r="2.4" style={{ opacity: 0.55 }}><animateMotion dur="13s" repeatCount="indefinite" path="M1070,380 A70,26 0 1 1 930,380 A70,26 0 1 1 1070,380" /></circle></g>

        {/* planetas */}
        {PLANETS.map((p) => (
          <g key={`${p.cx}-${p.cy}`}>
            <circle cx={p.cx} cy={p.cy} r={p.glowR} fill={p.glowFill} opacity="0.35" className="planet-glow" filter="url(#planet-glow)" />
            <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} />
          </g>
        ))}

        {/* easter egg: cada ~46s, un meteorito impacta la etapa intermedia
            (la más discreta). Va después de los planetas para que se vea
            encima de la superficie, no detrás. */}
        <g className="impactor">
          <line className="meteor-trail" x1="0" y1="0" x2="0.968" y2="-1.275" stroke="url(#impact-trail)" />
          <polygon className="rock rock-impactor" points="4.5,0 -2.5,3 -1,0 -2.5,-3" />
          <animateMotion
            path="M900,40 L624,218"
            dur="46s"
            begin="2s"
            repeatCount="indefinite"
            keyPoints="0;1;1"
            keyTimes="0;0.06;1"
            calcMode="linear"
            rotate="auto"
          />
        </g>
        <g className="impact-fx">
          <circle className="impact-ring" cx="624" cy="218" r="2" />
          <circle className="impact-flash" cx="624" cy="218" r="2" />
          <line className="impact-spark" x1="624" y1="218" x2="641" y2="205" />
          <line className="impact-spark" x1="624" y1="218" x2="607" y2="199" />
          <line className="impact-spark" x1="624" y1="218" x2="637" y2="235" />
          <line className="impact-spark" x1="624" y1="218" x2="601" y2="223" />
        </g>

        {/* lunas: mitad cercana (delante del planeta) — misma trayectoria y
            mismo tiempo que la copia de atrás, solo cambia la ventana de
            recorte, así que nunca pueden desincronizarse entre sí */}
        <g clipPath="url(#moon1-front)"><circle className="moon" r="3.4"><animateMotion dur="7s" repeatCount="indefinite" path="M260,430 A50,18 0 1 1 160,430 A50,18 0 1 1 260,430" /></circle></g>
        <g clipPath="url(#moon2-front)"><circle className="moon" r="2.6" style={{ opacity: 0.6 }}><animateMotion dur="11s" repeatCount="indefinite" path="M275,430 A65,25 0 1 1 145,430 A65,25 0 1 1 275,430" /></circle></g>
        <g clipPath="url(#moon3-front)"><circle className="moon" r="3"><animateMotion dur="9s" repeatCount="indefinite" path="M657,230 A47,21 0 1 1 563,230 A47,21 0 1 1 657,230" /></circle></g>
        <g clipPath="url(#moon4-front)"><circle className="moon" r="3.8"><animateMotion dur="6.4s" repeatCount="indefinite" path="M1052,380 A52,17 0 1 1 948,380 A52,17 0 1 1 1052,380" /></circle></g>
        <g clipPath="url(#moon5-front)"><circle className="moon" r="2.4" style={{ opacity: 0.55 }}><animateMotion dur="13s" repeatCount="indefinite" path="M1070,380 A70,26 0 1 1 930,380 A70,26 0 1 1 1070,380" /></circle></g>

        {/* sonda viajera: recorre la curva que enlaza las 3 etapas */}
        <g className="probe">
          <ellipse className="probe-trail" cx="-7" cy="0" rx="10" ry="2.6" />
          <path className="probe-body" d="M5,0 L-3,3 L-1,0 L-3,-3 Z" />
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={TRANSFER_PATH} />
        </g>
      </svg>

      {stops.map((stop, i) => {
        const n = i + 1;
        const plaque = PLAQUES[i];
        return (
          <div key={stop.role}>
            <div
              className="leader"
              style={{ left: plaque.left, top: plaque.top, height: plaque.leaderHeight }}
              aria-hidden="true"
            />
            <div
              className="plaque"
              style={{ left: plaque.left, top: plaque.top, "--accent": plaque.accent } as CSSProperties}
            >
              <div className="plaque-k">
                {stageLabel} 0{n}
              </div>
              <div className="plaque-role">{stop.role}</div>
              <span className="plaque-dur">{stop.duration}</span>
              <div className="plaque-desc">{stop.blurb}</div>
            </div>
          </div>
        );
      })}

      <div className="exp-copy">
        <div className="exp-marker">{marker}</div>
        <h2 className="exp-heading">{heading}</h2>
        <p className="exp-body">{body}</p>
      </div>
    </div>
  );
}
