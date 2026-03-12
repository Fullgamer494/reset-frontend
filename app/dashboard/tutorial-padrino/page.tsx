"use client";

import Link from "next/link";

// ─── Pasos del proceso ────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Encuentra a tu padrino",
    body: "Un padrino es alguien de confianza — familiar, amigo, terapeuta — que ya usa ReSet como acompañante o que estás invitando a hacerlo. No es un profesional de salud obligatorio, sino una persona dispuesta a apoyarte de forma voluntaria.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#0ea5e9",
  },
  {
    number: "02",
    title: "Pídele su código de padrino",
    body: "Cuando tu padrino crea su cuenta en ReSet con el rol Acompañante, la app le asigna automáticamente un código único de 8 caracteres (ej. AX7B-K2QP). Ese código es lo único que necesitas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    color: "#0ea5e9",
  },
  {
    number: "03",
    title: "Envía tu solicitud desde Configuración",
    body: 'Ve a la sección "Padrino de Apoyo" dentro de Configuración, introduce el código y pulsa Solicitar. Tu padrino recibirá la solicitud y podrá aceptarla o rechazarla. La conexión queda en estado PENDIENTE hasta que él responda.',
    highlight: 'Dashboard → Configuración → Padrino de Apoyo',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#0ea5e9",
  },
  {
    number: "04",
    title: "Conexión activa — ya tienes apoyo",
    body: "Cuando tu padrino acepte, la conexión se activa. A partir de ese momento él podrá ver tu progreso en tiempo real desde su panel y estará pendiente de cualquier alerta de emergencia que actives.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.919 17.919 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#10b981",
  },
];

// ─── Qué puede ver tu padrino ────────────────────────────────────────────────

const VISIBLE = [
  { label: "Días de racha activos y estado del streak", visible: true },
  { label: "Nivel de craving promedio (1–10)", visible: true },
  { label: "Estado emocional promedio (1–10)", visible: true },
  { label: "Logs recientes (fecha, consumó sí/no)", visible: true },
  { label: "Número total de recaídas", visible: true },
  { label: "Notas personales de tu bitácora", visible: false },
  { label: "Mensajes privados del foro", visible: false },
  { label: "Contraseña o datos de cuenta", visible: false },
];

// ─── Preguntas frecuentes ────────────────────────────────────────────────────

const FAQS = [
  {
    q: "¿Puedo tener más de un padrino?",
    a: "Por ahora, ReSet soporta un padrino activo a la vez. Si quieres cambiarlo, primero termina la conexión actual desde la sección Padrino de Apoyo en Configuración.",
  },
  {
    q: "¿Qué pasa si mi padrino rechaza la solicitud?",
    a: "La solicitud queda cancelada y puedes volver a intentarlo con el mismo código o usar el de otro padrino. No recibirás ninguna notificación negativa visible.",
  },
  {
    q: "¿Puedo desconectarme de mi padrino en cualquier momento?",
    a: 'Sí. En Configuración, sección "Padrino de Apoyo", encontrarás el botón para terminar la conexión. La desconexión es inmediata.',
  },
  {
    q: "¿Mi padrino me verá en tiempo real?",
    a: "Ve los datos más recientes que la app ha sincronizado. Los logs diarios y el progreso de racha se actualizan cada vez que registras una entrada en tu bitácora.",
  },
];

// ─── Página ───────────────────────────────────────────────────────────────────

export default function TutorialPadrinoPage() {
  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">

        {/* ── Header ───────────────────────────────────────────────── */}
        <p className="font-jetbrains text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2">
          — Guía de Apadrinamiento —
        </p>
        <h1 className="font-playfair text-[40px] sm:text-[44px] font-normal rs-text-heading leading-none mb-1">
          Tu Padrino de Apoyo
        </h1>
        <p className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-3">
          Cómo conectarte con alguien de confianza
        </p>
        <p className="font-playfair text-[15px] rs-text-body leading-relaxed mb-10 max-w-lg">
          El apadrinamiento es una de las herramientas más poderosas en la recuperación.
          Esta guía te explica cómo funciona y qué esperar.
        </p>

        {/* ── Pasos ─────────────────────────────────────────────────── */}
        <div className="mb-10">
          <p className="font-jetbrains text-[11px] tracking-[2px] uppercase rs-text-caption mb-5">
            El proceso, paso a paso
          </p>
          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative flex gap-4 sm:gap-5">
                {/* Conector vertical */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-5 top-12 bottom-0 w-px"
                    style={{ background: "var(--ui-border-subtle)" }}
                  />
                )}

                {/* Ícono */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "var(--surface-card-inner)", color: step.color }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Contenido */}
                <div
                  className="flex-1 border border-(--ui-border) bg-(--surface-card) rounded-sm p-4 sm:p-5 mb-3"
                  style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.02)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="font-jetbrains text-[11px] tracking-[1.5px] px-2 py-0.5 rounded-full"
                      style={{ background: "var(--surface-card-inner)", color: "var(--ui-text-caption)" }}
                    >
                      {step.number}
                    </span>
                    <h3 className="font-playfair italic text-[17px] rs-text-heading leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-jetbrains text-[12px] leading-relaxed rs-text-caption">
                    {step.body}
                  </p>
                  {step.highlight && (
                    <p
                      className="font-jetbrains text-[11px] tracking-[0.5px] mt-3 py-2 px-3 rounded-sm"
                      style={{ background: "var(--surface-card-inner)", color: "#0ea5e9" }}
                    >
                      → {step.highlight}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Privacidad: qué puede/no puede ver ───────────────────── */}
        <div
          className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-5 sm:p-8 mb-8"
          style={{ boxShadow: "8px 8px 0 rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-jetbrains text-[11px] tracking-[2px] uppercase text-[#0ea5e9]">
              Privacidad — qué ve tu padrino
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {VISIBLE.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: item.visible ? "#ecfdf5" : "#fef2f2",
                  }}
                >
                  {item.visible ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                      <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p
                  className="font-jetbrains text-[11px] leading-relaxed"
                  style={{ color: item.visible ? "var(--ui-text-body)" : "var(--ui-text-caption)" }}
                >
                  {item.label}
                  {!item.visible && (
                    <span className="ml-1 italic opacity-60">— protegido</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Alertas de emergencia ─────────────────────────────────── */}
        <div className="border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-sm p-5 sm:p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-jetbrains text-[11px] tracking-[1.5px] uppercase text-red-500 mb-1">
                Alertas de emergencia
              </p>
              <p className="font-playfair text-[14px] text-red-700 dark:text-red-300 mb-1.5 leading-snug">
                Tu padrino es el primero en ser notificado
              </p>
              <p className="font-jetbrains text-[11px] text-red-600 dark:text-red-400/80 leading-relaxed">
                Cuando presiones el botón de emergencia en tu Dashboard, tu padrino recibirá
                una alerta inmediata. Por eso es importante que la persona que elijas esté
                disponible y dispuesta a responder rápido.
              </p>
            </div>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <div className="mb-10">
          <p className="font-jetbrains text-[11px] tracking-[2px] uppercase rs-text-caption mb-5">
            Preguntas frecuentes
          </p>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-4 sm:p-5"
              >
                <p className="font-jetbrains text-[12px] rs-text-heading mb-1.5">
                  {faq.q}
                </p>
                <p className="font-jetbrains text-[11px] leading-relaxed rs-text-caption">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA final ────────────────────────────────────────────── */}
        <div
          className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ boxShadow: "8px 8px 0 rgba(14,165,233,0.04)" }}
        >
          <div>
            <p className="font-playfair italic text-[18px] rs-text-heading mb-1">
              Listo para conectarte
            </p>
            <p className="font-jetbrains text-[11px] rs-text-caption leading-relaxed">
              Ve a Configuración y busca la sección "Padrino de Apoyo".
            </p>
          </div>
          <Link
            href="/dashboard/configuracion"
            className="shrink-0 font-jetbrains text-[11px] tracking-[2px] uppercase h-10 px-6 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-sm inline-flex items-center gap-2 transition-colors"
          >
            Ir a Configuración
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
