"use client";

import { useState } from "react";

// ─── Tipos exportados ──────────────────────────────────────────────────

export interface GodchildInfo {
  id: string;
  name: string;
  sobrietyDays: number;
}

export interface GodchildStats {
  sobrietyDays: number;
  notesThisWeek: number;
  consistency: number;         // 0–100
  lastActiveAt: string | null;
}

export interface RecentLogEntry {
  id: string;
  moodId: string;
  moodLabel: string;
  notes: string;
  date: string;
  isShared: boolean;
}

export interface MonitoreoResult {
  isLoading: boolean;
  godchildFound: boolean;
  godchild: GodchildInfo | null;
  stats: GodchildStats | null;
  recentLogs: RecentLogEntry[];
}

// ─── Hook ────────────────────────────────────────────────────────────

// El endpoint de monitoreo de ahijados no está disponible en la API actual.
// Cuando el backend lo implemente (e.g. GET /sponsorship/godchildren)
// se puede restaurar la lógica aquí.
export function useMonitoreo(): MonitoreoResult {
  return {
    isLoading: false,
    godchildFound: false,
    godchild: null,
    stats: null,
    recentLogs: [],
  };
}
