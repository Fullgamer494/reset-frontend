// lib/api/emergency.ts
// Emergencias — contactos y alertas de emergencia del usuario.

import { apiRequest } from './client';

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface EmergencyContactPayload {
  name: string;
  phone_number: string;
  relationship: string;
  email?: string;
  priority_level?: number;
}

// ─── Funciones ───────────────────────────────────────────────────────────────

/** Agrega un nuevo contacto de emergencia. */
export const addContact = (data: EmergencyContactPayload): Promise<any> =>
  apiRequest('/emergency/contacts', {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      phone_number: data.phone_number,
      relationship: data.relationship,
      email: data.email,
      priority_level: data.priority_level ?? 1,
    }),
  });

/** Obtiene la lista de contactos de emergencia del usuario autenticado. */
export const getContacts = (): Promise<any> =>
  apiRequest('/emergency/contacts');

/**
 * Dispara una alerta de emergencia (botón de pánico).
 * @param message Mensaje opcional enviado a los contactos activos.
 */
export const triggerAlert = (message?: string): Promise<any> =>
  apiRequest('/emergency/alert', {
    method: 'POST',
    body: JSON.stringify({
      message: message ?? 'Alerta de emergencia activada',
    }),
  });
