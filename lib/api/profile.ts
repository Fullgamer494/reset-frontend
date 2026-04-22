// lib/api/profile.ts
// Perfil del usuario — referenciado ahora a través de emergency.ts para
// los contactos de apoyo. Se mantiene este módulo para operaciones de perfil.

import { apiRequest } from './client';
import type { SupportPeer, ProfileUpdateData } from '@/types';

/**
 * Actualiza el perfil de usuario (nombre).
 */
export async function updateProfile(data: { name: string }): Promise<void> {
  await apiRequest('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
