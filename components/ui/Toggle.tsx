"use client";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  color?: "blue" | "teal";
}

export default function Toggle({
  checked = false,
  onChange,
  label,
  description,
  color = "teal",
}: ToggleProps) {
  const bgColor = color === "teal" ? "#0d9488" : "#0ea5e9";

  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1e293b" }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className="text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#94a3b8" }}
            >
              {description}
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className="relative flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none"
        style={{
          width: 44,
          height: 24,
          backgroundColor: checked ? bgColor : "#cbd5e1",
        }}
      >
        <span
          className="absolute rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{
            width: 18,
            height: 18,
            top: 3,
            left: 3,
            transform: checked ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </button>
    </div>
  );
}
