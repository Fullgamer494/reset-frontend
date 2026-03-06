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

/** Obtiene los últimos `limit` registros del usuario autenticado. */
export const getLogs = (limit = 30): Promise<any> =>
  apiRequest(`/tracking/logs?limit=${limit}`);

/** Devuelve las estadísticas consolidadas del usuario autenticado. */
export const getStatistics = (): Promise<any> =>
  apiRequest('/tracking/stats/me');
