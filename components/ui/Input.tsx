"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, rightElement, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className="text-[10px] tracking-[1px] uppercase text-slate-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-[50px] rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm text-slate-700 placeholder-slate-400 transition-all outline-none
              focus:border-sky-300 focus:ring-2 focus:ring-sky-100 
              ${icon ? "pl-12" : "pl-4"}
              ${rightElement ? "pr-12" : "pr-4"}
              ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}
              ${className}`}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[10px] text-red-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
