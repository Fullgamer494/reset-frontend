/**
 * components/SVG/Gear.tsx
 * Engrane decorativo SVG reutilizable
 */

export interface SVGProps {
  size?: number;
  color?: string;
}

export function Gear({ size = 200, color = "currentColor" }: SVGProps & { teeth?: number }) {
  const teeth = 12;
  const R = size / 2;
  const r = R * 0.72;
  const rh = R * 0.22;
  const toothW = (2 * Math.PI * r) / teeth * 0.38;

  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = ((i * 2 * Math.PI) / teeth) - toothW / r / 2;
    const a1 = ((i * 2 * Math.PI) / teeth) + toothW / r / 2;
    const a2 = (((i + 0.5) * 2 * Math.PI) / teeth) - toothW / r / 2;
    const a3 = (((i + 0.5) * 2 * Math.PI) / teeth) + toothW / r / 2;
    const c = Math.cos,
      s = Math.sin;
    pts.push(`${R + r * c(a0)},${R + r * s(a0)}`);
    pts.push(`${R + R * c(a0)},${R + R * s(a0)}`);
    pts.push(`${R + R * c(a1)},${R + R * s(a1)}`);
    pts.push(`${R + r * c(a1)},${R + r * s(a1)}`);
    pts.push(`${R + r * c(a2)},${R + r * s(a2)}`);
    pts.push(`${R + r * c(a3)},${R + r * s(a3)}`);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <polygon points={pts.join(" ")} fill={color} />
      <circle cx={R} cy={R} r={rh} fill="white" />
      {[0, 60, 120].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={R + rh * Math.cos(rad)}
            y1={R + rh * Math.sin(rad)}
            x2={R + r * 0.6 * Math.cos(rad)}
            y2={R + r * 0.6 * Math.sin(rad)}
            stroke={color}
            strokeWidth={1.5}
            opacity={0.5}
          />
        );
      })}
    </svg>
  );
}
