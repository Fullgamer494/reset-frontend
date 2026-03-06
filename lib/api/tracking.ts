// lib/api/tracking.ts
// Tracking / Bitácora — registros diarios de consumo, craving y estado emocional.

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface DailyLog {
  log_date: string;            // 'YYYY-MM-DD'
  consumed: boolean;
  craving_level_id: string;    // UUID de /catalogs/craving-levels
  emotional_state_id: string;  // UUID de /catalogs/emotional-states
  notes?: string;
  triggers?: string;
}

/** Entrada del catálogo de niveles (craving o estado emocional). */
export interface CatalogLevel {
  id: string;    // UUID
  level: number; // 1-10
  label: string;
  description?: string;
}

// ─── Catálogos ───────────────────────────────────────────────────────────────

/** Obtiene todos los niveles de craving disponibles (1-10). */
export const getCravingLevels = (): Promise<CatalogLevel[]> =>
  apiRequest<CatalogLevel[]>('/catalogs/craving-levels');

/** Obtiene todos los estados emocionales disponibles (1-10). */
export const getEmotionalStates = (): Promise<CatalogLevel[]> =>
  apiRequest<CatalogLevel[]>('/catalogs/emotional-states');

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Crea un nuevo registro diario. */
export const createLog = (data: DailyLog) =>
  apiRequest('/tracking/logs', {
    method: 'POST',
    body: JSON.stringify(data),
  });

/** Obtiene los últimos `limit` registros. Si se pasa `userId`, filtra por usuario. */
export const getLogs = (limit = 30, userId?: string): Promise<any> => {
  const q = new URLSearchParams({ limit: String(limit) });
  if (userId) q.set('userId', userId);
  return apiRequest(`/tracking/logs?${q}`);
};

/** Devuelve las estadísticas generales del usuario (o del ahijado indicado). */
export const getStatistics = (userId?: string): Promise<any> => {
  const q = userId ? `?userId=${userId}` : '';
  return apiRequest(`/tracking/stats/me${q}`);
};
