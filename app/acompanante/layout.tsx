"use client";

import { useState } from "react";
import CompanionSidebar from "@/components/features/dashboard/CompanionSidebar";

export default function AcompananteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado del sidebar para móvil
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Overlay semitransparente en móvil cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <CompanionSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main: sin margen en móvil, con margen en md+ */}
      <main className="flex-1 md:ml-[288px] overflow-auto bg-[#f8fafc] flex flex-col">
        {/* Barra superior móvil con botón hamburguesa — oculta en desktop */}
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 h-14 bg-white border-b border-teal-50 md:hidden flex-shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-slate-500 hover:text-slate-700 transition-colors p-1"
            aria-label="Abrir menú de navegación"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span
            className="text-[16px] font-normal text-slate-700"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ReSet
          </span>
        </div>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
