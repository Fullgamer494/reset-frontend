// lib/api/dashboard.ts
// Progreso del usuario — racha activa y estadísticas.

import { apiRequest } from './client';
import { getStreak } from './streak';
import { getStatistics } from './tracking';
import type { UserProgress } from '@/types';

/** Devuelve el progreso de sobriedad del usuario autenticado.
 * Prioriza /tracking/statistics (calculado en vivo desde los logs) sobre
 * /streak (depende de un trigger DB que puede no estar activo).
 */
export async function getProgress(): Promise<UserProgress> {
  let days = 0;

  // Intentar las dos fuentes en paralelo para mayor velocidad
  const [statsResult, streakResult] = await Promise.allSettled([
    getStatistics(),
    getStreak(),
  ]);

  if (statsResult.status === 'fulfilled' && (statsResult.value?.dayCounter ?? 0) > 0) {
    // fn_get_user_stats calcula los días directamente desde daily_logs — no depende del trigger
    days = statsResult.value.dayCounter;
  } else if (streakResult.status === 'fulfilled') {
    days = streakResult.value?.currentStreak ?? 0;
  } else if (statsResult.status === 'fulfilled') {
    days = statsResult.value?.dayCounter ?? 0;
  }

  return {
    sobrietyDays: days,
    plantStage: getStageName(days),
    consecutiveDays: days,
  };
}

function getStageName(
  days: number
): UserProgress['plantStage'] {
  if (days >= 365) return 'Ciprés';
  if (days >= 180) return 'Árbol';
  if (days >= 90) return 'Planta';
  if (days >= 30) return 'Brote';
  return 'Semilla';
}

