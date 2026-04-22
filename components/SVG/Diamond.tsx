/**
 * components/SVG/Diamond.tsx
 * Diamante decorativo SVG reutilizable
 */

import type { SVGProps } from "./Gear";

export function Diamond({ size = 40, color = "currentColor" }: SVGProps) {
  const h = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points={`${h},2 ${size - 2},${h} ${h},${size - 2} 2,${h}`}
        stroke={color}
        strokeWidth={1}
        fill="none"
      />
      <polygon
        points={`${h},${h * 0.6} ${h * 1.4},${h} ${h},${h * 1.4} ${h * 0.6},${h}`}
        stroke={color}
        strokeWidth={0.8}
        fill="none"
        opacity={0.5}
      />
    </svg>
  );
}
