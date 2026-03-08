// lib/api/streak.ts
// Rachas — consulta de la racha activa del usuario autenticado.
// Contrato exacto según documentación API v1.

import { apiRequest } from './client';

// ─── Tipo de respuesta ────────────────────────────────────────────────────────

export interface StreakResponse {
  /** Días consecutivos de sobriedad según el backend. */
  currentStreak: number;
  status: string;        // "active" | "broken"
  startedAt: string;    // ISO date
  lastLogDate: string;  // ISO date
  totalDaysAchievedHistorical?: number;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Devuelve la racha activa del usuario autenticado. */
export const getStreak = (): Promise<StreakResponse> =>
  apiRequest<StreakResponse>('/streak');

