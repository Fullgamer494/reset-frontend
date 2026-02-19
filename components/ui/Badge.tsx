interface BadgeProps {
  label: string;
  variant?: "default" | "blue" | "green" | "red" | "yellow";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-slate-100 text-slate-600 border-slate-200",
  blue:
    "bg-sky-50 text-sky-600 border-sky-200",
  green:
    "bg-teal-50 text-teal-600 border-teal-200",
  red:
    "bg-red-50 text-red-500 border-red-200",
  yellow:
    "bg-amber-50 text-amber-600 border-amber-200",
};

export default function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-[9px] tracking-widest uppercase ${variantStyles[variant]} ${className}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {label}
    </span>
  );
}
