/**
 * components/SVG/Hexagon.tsx
 * Hexágono decorativo SVG reutilizable
 */

import type { SVGProps } from "./Gear";

export function Hexagon({ size = 60, color = "currentColor" }: SVGProps) {
  const s = size / 2;
  const h = (s * Math.sqrt(3)) / 2;
  const points = [
    [s, 0],
    [s + h, s / 2],
    [s + h, (3 * s) / 2],
    [s, 2 * s],
    [s - h, (3 * s) / 2],
    [s - h, s / 2],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg
      width={size + s}
      height={size * 2}
      viewBox={`0 0 ${size + s} ${size * 2}`}
      fill="none"
      aria-hidden="true"
    >
      <polygon points={points} stroke={color} strokeWidth={1.5} fill="none" />
    </svg>
  );
}
