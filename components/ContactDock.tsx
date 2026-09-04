import type { CSSProperties } from "react";

// Escena decorativa de "Hablemos": estación de acople con anillo técnico
// giratorio (ver amarre-hibrido.html, mockup "Anillo técnico", opción
// elegida). Puramente decorativa — el contenido accesible vive en
// Contact.tsx, al lado — por eso todo aquí es aria-hidden.
export default function ContactDock() {
  return (
    <div className="dock-area" aria-hidden="true">
      <svg className="dock-svg" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="dock-terra" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#e2725b" />
            <stop offset="100%" stopColor="#e2725b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dock-mauve" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#b599a8" />
            <stop offset="100%" stopColor="#b599a8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dock-floor" cx="50%" cy="46%" r="65%">
            <stop offset="0%" stopColor="var(--dock-hull-2)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--dock-hull)" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        <g className="dock-stars-far" fill="#dbe4ee">
          <circle cx="24" cy="40" r="1" /><circle cx="70" cy="18" r=".8" /><circle cx="120" cy="52" r="1" />
          <circle cx="330" cy="24" r="1" /><circle cx="370" cy="70" r=".8" /><circle cx="20" cy="150" r=".9" />
          <circle cx="350" cy="140" r="1" /><circle cx="30" cy="250" r=".8" /><circle cx="16" cy="360" r="1" />
          <circle cx="380" cy="260" r=".9" /><circle cx="360" cy="390" r="1" /><circle cx="90" cy="400" r=".8" />
        </g>
        <g className="dock-stars-near" fill="#eef3fa" opacity=".8">
          <circle cx="50" cy="90" r="1.4" /><circle cx="300" cy="60" r="1.3" /><circle cx="55" cy="80" r="1.5" />
          <circle cx="340" cy="120" r="1.3" /><circle cx="60" cy="330" r="1.4" /><circle cx="320" cy="350" r="1.3" />
          <circle cx="200" cy="30" r="1.2" />
        </g>

        <circle className="dock-planet" cx="368" cy="52" r="9" fill="url(#dock-terra)" />
        <circle
          className="dock-planet"
          cx="30"
          cy="330"
          r="6"
          fill="url(#dock-mauve)"
          style={{ animationDelay: "-3s" } as CSSProperties}
        />
        <path
          className="dock-transfer-path"
          d="M 300 388 Q 356 350 386 306"
          stroke="#7dd3fc"
          strokeWidth="1"
          strokeDasharray="3 6"
          fill="none"
          opacity=".3"
        />

        <g className="dock-meteor">
          <line className="dock-meteor-trail" x1="0" y1="0" x2="-9" y2="-3" stroke="rgba(219,228,238,.35)" strokeWidth="1" />
          <polygon
            className="dock-meteor-body"
            points="-1.5,-1 1,-1.5 2,0 1,1.5 -1.5,1 -2,0"
            fill="#3a3742"
            stroke="rgba(125,211,252,.35)"
            strokeWidth=".3"
          />
        </g>

        {/* piso de la estación: rellena el interior del anillo, en vez de
            dejarlo hueco entre el hub y la banda exterior */}
        <circle cx="200" cy="200" r="100" fill="url(#dock-floor)" />

        <g className="dock-ring-spin">
          <circle cx="200" cy="200" r="110" fill="none" stroke="var(--dock-truss)" strokeWidth="18" />
          <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(125,211,252,.35)" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="101" fill="none" stroke="rgba(125,211,252,.35)" strokeWidth="1" />
          <circle cx="200" cy="200" r="119" fill="none" stroke="rgba(125,211,252,.35)" strokeWidth=".7" />

          {/* costuras: cortan la banda lisa en placas reales */}
          <g stroke="var(--dock-bg-2)" strokeWidth="2.5">
            <line x1="301" y1="200" x2="319" y2="200" />
            <line x1="287.5" y1="250.5" x2="303.1" y2="259.5" />
            <line x1="250.5" y1="287.5" x2="259.5" y2="303.1" />
            <line x1="200" y1="301" x2="200" y2="319" />
            <line x1="149.5" y1="287.5" x2="140.5" y2="303.1" />
            <line x1="112.5" y1="250.5" x2="96.9" y2="259.5" />
            <line x1="99" y1="200" x2="81" y2="200" />
            <line x1="112.5" y1="149.5" x2="96.9" y2="140.5" />
            <line x1="149.5" y1="112.5" x2="140.5" y2="96.9" />
            <line x1="200" y1="99" x2="200" y2="81" />
            <line x1="250.5" y1="112.5" x2="259.5" y2="96.9" />
            <line x1="287.5" y1="149.5" x2="303.1" y2="140.5" />
          </g>

          {/* equipos sobresaliendo de la superficie, colocación asimétrica */}
          <rect x="315.8" y="229.6" width="9" height="5.5" rx="1" fill="var(--dock-hull-2)" stroke="rgba(125,211,252,.35)" strokeWidth=".7" transform="rotate(105 319.8 232.1)" />
          <rect x="100.5" y="277.2" width="9" height="5.5" rx="1" fill="var(--dock-hull-2)" stroke="rgba(125,211,252,.35)" strokeWidth=".7" transform="rotate(230 105 279.7)" />
          <rect x="163.4" y="77.7" width="9" height="5.5" rx="1" fill="var(--dock-hull-2)" stroke="rgba(125,211,252,.35)" strokeWidth=".7" transform="rotate(345 167.9 80.2)" />

          {/* celosías reticuladas en vez de radios idealizados */}
          <g stroke="var(--dock-truss)" strokeWidth="6">
            <line x1="200" y1="93" x2="200" y2="70" />
            <line x1="277" y1="242" x2="298" y2="256" />
            <line x1="123" y1="242" x2="102" y2="256" />
          </g>
          <g stroke="rgba(125,211,252,.35)" strokeWidth="1.2">
            <line x1="194" y1="87" x2="206" y2="87" />
            <line x1="194" y1="80" x2="206" y2="80" />
            <line x1="194" y1="73" x2="206" y2="73" />
            <line x1="278.9" y1="240.5" x2="285.6" y2="250.5" />
            <line x1="284.2" y1="244" x2="290.8" y2="254" />
            <line x1="289.4" y1="247.5" x2="296.1" y2="257.5" />
            <line x1="121.1" y1="240.5" x2="114.4" y2="250.5" />
            <line x1="115.8" y1="244" x2="109.2" y2="254" />
            <line x1="110.6" y1="247.5" x2="103.9" y2="257.5" />
          </g>
        </g>

        <circle cx="200" cy="200" r="36" fill="var(--dock-hull-2)" stroke="rgba(125,211,252,.35)" strokeWidth="1.4" />
        <circle cx="200" cy="200" r="15" fill="var(--dock-hull)" stroke="rgba(125,211,252,.35)" strokeWidth="1.2" />

        <circle className="dock-light" cx="200" cy="180" r="3" />
        <circle className="dock-light" cx="217" cy="188" r="3" />
        <circle className="dock-light" cx="217" cy="212" r="3" />
        <circle className="dock-light" cx="200" cy="220" r="3" />
        <circle className="dock-light" cx="183" cy="212" r="3" />
        <circle className="dock-light" cx="183" cy="188" r="3" />

        {/* pulso de energía: dos frentes recorren el anillo en sentidos
            opuestos y convergen en el puntal superior, luego bajan juntos
            al hub, llegando justo cuando .dock-flash dispara (ver
            globals.css) */}
        <circle className="dock-pulse-orbit" r="2.4" fill="#eaffef" style={{ filter: "drop-shadow(0 0 4px rgba(234,255,239,.9))" }} />
        <circle className="dock-pulse-orbit-b" r="2.4" fill="#eaffef" style={{ filter: "drop-shadow(0 0 4px rgba(234,255,239,.9))" }} />
        <circle className="dock-pulse-radial" r="2" fill="#eaffef" style={{ filter: "drop-shadow(0 0 4px rgba(234,255,239,.9))" }} />

        <circle className="dock-flash" cx="200" cy="200" r="18" fill="#eaffef" />

        <g className="dock-ship-mover" style={{ offsetPath: "path('M 200 410 L 200 205')" } as CSSProperties}>
          <g className="dock-approach-scale">
            <g className="dock-ship-settle">
              <g className="dock-ship" transform="scale(1.15)">
                <ellipse className="dock-ship-trail" cx="-7" cy="0" rx="10" ry="2.6" fill="rgba(125,211,252,.25)" />
                <path
                  className="dock-ship-body"
                  d="M4.5,0 L-2.5,3 L-1,0 L-2.5,-3 Z"
                  fill="#7dd3fc"
                  style={{ filter: "drop-shadow(0 0 5px rgba(125,211,252,.85))" }}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
