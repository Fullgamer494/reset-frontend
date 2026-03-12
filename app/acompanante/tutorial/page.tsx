"use client";

import Link from "next/link";

// ─── Pasos para el acompañante ───────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Tu código ya está listo",
    body: "Cuando creaste tu cuenta como Acompañante, ReSet generó un código único de 8 caracteres vinculado a tu perfil. No necesitas hacer nada — solo compartirlo con la persona que quieres apoyar.",
    hint: "Puedes verlo en la pestaña Mi Cuenta de este panel.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    color: "#14b8a6",
  },
  {
    number: "02",
    title: "Comparte el código con tu ahijado",
    body: "Envíale el código por mensaje, en persona, o como prefieras. El ahijado lo introduce en la sección 'Padrino de Apoyo' dentro de Configuración de su app. Tú no tienes que hacer nada más en este paso.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#14b8a6",
  },
  {
    number: "03",
    title: "Recibes una solicitud de conexión",
    body: "El sistema la registra con estado PENDIENTE. Ve a Mi Cuenta para verla. Ahí encontrarás los datos básicos del solicitante y dos botones: Aceptar o Rechazar.",
    hint: "Mi Cuenta → sección Solicitudes",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#14b8a6",
  },
  {
    number: "04",
    title: "Acepta y empieza a monitorear",
    body: "Una vez aceptada, la conexión queda ACTIVA. En la sección Monitoreo de este panel podrás ver el perfil completo de tu ahijado: su racha, promedios, logs recientes y más.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#10b981",
  },
];

// ─── Información disponible en el perfil ─────────────────────────────────────

const MONITORING_ITEMS = [
  { label: "Días de racha y estado del streak", detail: "cuántos días lleva activo o cuándo fue el último reinicio" },
  { label: "Nivel de craving promedio (1–10)", detail: "media de los registros de la semana" },
  { label: "Estado emocional promedio (1–10)", detail: "media de los registros de la semana" },
  { label: "Logs recientes", detail: "fecha, si consumió o no — sin el texto de las notas" },
  { label: "Total de recaídas registradas", detail: "dato acumulado" },
];

const NOT_VISIBLE = [
  "Notas personales escritas en la bitácora",
  "Mensajes del foro o grupos de apoyo",
  "Contraseña ni datos de cuenta",
];

// ─── Buenas prácticas ────────────────────────────────────────────────────────

const PRACTICES = [
  {
    icon: "🤝",
    title: "Escucha sin juzgar",
    body: "Tu rol no es corregir ni diagnosticar. Escuchar activamente y sin juicio tiene más impacto que cualquier consejo.",
  },
  {
    icon: "🔔",
    title: "Atiende las alertas de emergencia",
    body: "Cuando tu ahijado active una alerta de emergencia desde su app, recibirás una notificación. Ese momento importa — responde rápido.",
  },
  {
    icon: "📆",
    title: "Check-ins regulares",
    body: "Un mensaje breve cada dos o tres días marca la diferencia. No necesitas información nueva para escribir — la presencia constante ya ayuda.",
  },
  {
    icon: "🚫",
    title: "No presiones el progreso",
    body: "Una recaída no es un fracaso de tu apoyo. Valida la emoción, no la juzgues, y anima a retomar el proceso con calma.",
  },
  {
    icon: "🌿",
    title: "Cuídate también",
    body: "El apoyo emocional continuo puede ser agotador. Asegúrate de tener tus propios espacios de descanso y desahogo.",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "¿Puedo tener más de un ahijado?",
    a: "En la versión actual, el sistema soporta una conexión activa a la vez. Si la actual termina, podrás aceptar una nueva solicitud de otra persona.",
  },
  {
    q: "¿Qué pasa si rechazo una solicitud?",
    a: "La solicitud se cancela. El usuario no recibe un mensaje negativo pero sí ve que su solicitud no fue aceptada. Puede intentarlo con otro padrino.",
  },
  {
    q: "¿Puedo terminar la conexión cuando quiera?",
    a: 'Sí. Desde la sección Mi Cuenta puedes terminar la alianza en cualquier momento. La desvinculación es inmediata y puedes opcionalmente añadir un motivo.',
  },
  {
    q: "¿Mi ahijado sabe qué parte de su perfil veo?",
    a: "Sí — la guía de apadrinamiento que le mostramos al usuario le explica exactamente qué datos compartes. La privacidad de sus notas personales está garantizada.",
  },
];

// ─── Página ───────────────────────────────────────────────────────────────────

export default function TutorialAcompananteAdminPage() {
  return (
    <div className="min-h-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-10 py-8 sm:py-12">

        {/* ── Header ───────────────────────────────────────────────── */}
        <p className="font-jetbrains text-[11px] tracking-[2px] uppercase italic rs-text-caption mb-2">
          — Guía del Acompañante —
        </p>
        <h1 className="font-playfair text-[40px] sm:text-[44px] font-normal rs-text-heading leading-none mb-1">
          Tu Rol como Padrino
        </h1>
        <p className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-3">
          Todo lo que necesitas saber para acompañar bien
        </p>
        <p className="font-playfair text-[15px] rs-text-body leading-relaxed mb-10 max-w-lg">
          Como padrino eres una figura de apoyo voluntaria — no un terapeuta ni un supervisor.
          Tu presencia y tu escucha son la herramienta más poderosa que tienes.
        </p>

        {/* ── Cómo se conecta alguien a ti ─────────────────────────── */}
        <div className="mb-10">
          <p className="font-jetbrains text-[11px] tracking-[2px] uppercase rs-text-caption mb-5">
            Cómo funciona la conexión
          </p>
          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative flex gap-4 sm:gap-5">
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-5 top-12 bottom-0 w-px"
                    style={{ background: "var(--ui-border-subtle)" }}
                  />
                )}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "var(--surface-card-inner)", color: step.color }}
                  >
                    {step.icon}
                  </div>
                </div>
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
                  {step.hint && (
                    <p
                      className="font-jetbrains text-[11px] tracking-[0.5px] mt-3 py-2 px-3 rounded-sm"
                      style={{ background: "var(--surface-card-inner)", color: "#14b8a6" }}
                    >
                      → {step.hint}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Qué puedes monitorear ─────────────────────────────────── */}
        <div
          className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-5 sm:p-8 mb-6"
          style={{ boxShadow: "8px 8px 0 rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5">
              <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-jetbrains text-[11px] tracking-[2px] uppercase text-teal-500">
              Qué ves en el panel de Monitoreo
            </p>
          </div>
          <p className="font-jetbrains text-[11px] rs-text-caption mb-4">
            Cuando la conexión está activa, tu panel Monitoreo muestra:
          </p>
          <div className="flex flex-col gap-2 mb-5">
            {MONITORING_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-2.5">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="3">
                    <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-jetbrains text-[11px] rs-text-heading">{item.label}</p>
                  <p className="font-jetbrains text-[12px] rs-text-caption">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="rounded-sm p-3 sm:p-4"
            style={{ background: "var(--surface-card-inner)" }}
          >
            <p className="font-jetbrains text-[11px] tracking-[1.5px] uppercase rs-text-caption mb-2.5">
              Protegido — nunca visible para ti
            </p>
            <div className="flex flex-col gap-1.5">
              {NOT_VISIBLE.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-jetbrains text-[11px] rs-text-caption">{item}</p>
                </div>
              ))}
            </div>
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
                Cuando tu ahijado presiona el botón de emergencia
              </p>
              <p className="font-jetbrains text-[11px] text-red-600 dark:text-red-400/80 leading-relaxed">
                Recibirás una notificación push inmediata. En ese momento tu ahijado
                necesita apoyo real. Responde con calma, sin juicio, y si la situación
                es de riesgo vital contacta servicios de emergencia de tu región.
              </p>
            </div>
          </div>
        </div>

        {/* ── Buenas prácticas ──────────────────────────────────────── */}
        <div className="mb-10">
          <p className="font-jetbrains text-[11px] tracking-[2px] uppercase rs-text-caption mb-5">
            Buenas prácticas del acompañante
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRACTICES.map((p) => (
              <div
                key={p.title}
                className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[18px]">{p.icon}</span>
                  <p className="font-jetbrains text-[12px] rs-text-heading">{p.title}</p>
                </div>
                <p className="font-jetbrains text-[11px] leading-relaxed rs-text-caption">
                  {p.body}
                </p>
              </div>
            ))}
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
                <p className="font-jetbrains text-[11px] rs-text-caption leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA final ────────────────────────────────────────────── */}
        <div
          className="border border-(--ui-border) bg-(--surface-card) rounded-sm p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ boxShadow: "8px 8px 0 rgba(20,184,166,0.04)" }}
        >
          <div>
            <p className="font-playfair italic text-[18px] rs-text-heading mb-1">
              Encuentra tu código de padrino
            </p>
            <p className="font-jetbrains text-[11px] rs-text-caption leading-relaxed">
              Ve a Mi Cuenta para ver o compartir tu código y gestionar solicitudes.
            </p>
          </div>
          <Link
            href="/acompanante/cuenta"
            className="shrink-0 font-jetbrains text-[11px] tracking-[2px] uppercase h-10 px-6 bg-teal-700 hover:bg-teal-600 text-white rounded-sm inline-flex items-center gap-2 transition-colors"
          >
            Ver Mi Cuenta
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
