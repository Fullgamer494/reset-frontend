// lib/api/streak.ts
// Rachas — consulta de la racha activa y el historial de mejores rachas.

import { apiRequest } from './client';

/** Devuelve la racha activa del usuario autenticado. */
export const getStreak = (): Promise<any> => apiRequest('/streak/active');

/** Devuelve el ranking de mejores rachas del usuario. */
export const getBestStreaks = (): Promise<any> => apiRequest('/streak/best');

/**
 * Crea una nueva racha inicial para el usuario.
 * @param userAddictionId UUID de la relación usuario-adición.
 */
export const createStreak = (userAddictionId: string): Promise<any> =>
  apiRequest('/streak', {
    method: 'POST',
    body: JSON.stringify({ user_addiction_id: userAddictionId }),
  });
