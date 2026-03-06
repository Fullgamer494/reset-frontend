// lib/api/sponsorship.ts
// Patrocinio — único endpoint documentado: terminar un patrocinio activo.

import { apiRequest } from './client';

/**
 * Termina una relación de patrocinio activa.
 * El backend resuelve qué relación terminar a partir del token JWT.
 */
export const terminateSponsor = (
  sponsorId: string,
  reason = 'Terminación voluntaria'
): Promise<any> =>
  apiRequest('/sponsorship/terminate', {
    method: 'POST',
    body: JSON.stringify({ sponsorId, reason }),
  });
