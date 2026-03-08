"use client";

import { useState, useEffect } from "react";
import { getContacts, addContact } from "@/lib/api/emergency";
import { useAuth } from "@/context/AuthContext";
import type { SupportPeer } from "@/types";

export function useConfiguracion() {
  const { user, updateUser } = useAuth();

  // Precarga el nombre del usuario autenticado
  const [username, setUsername] = useState(user?.name ?? "");
  const [addictionType, setAddictionType] = useState("");
  const [emergencyNotifs, setEmergencyNotifs] = useState(true);
  const [peers, setPeers] = useState<SupportPeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Error exclusivo del formulario de añadir par de apoyo — no contamina el área de perfil. */
  const [peerError, setPeerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Sincronizar nombre cuando el contexto de auth se carga/actualiza
  useEffect(() => {
    if (user?.name) setUsername(user.name);
  }, [user?.name]);

  // Cargar contactos de emergencia (= pares de apoyo en la UI)
  useEffect(() => {
    getContacts()
      .then((res: any) => {
        const list: any[] = res?.data ?? res ?? [];
        setPeers(
          Array.isArray(list)
            ? list.map((c: any) => ({
                id: c.id ?? c._id ?? String(Date.now()),
                // La API puede devolver contactName (camelCase) o contact_name (snake_case)
                name: c.contactName ?? c.contact_name ?? c.name ?? '',
                email: c.email ?? '',
              }))
            : []
        );
      })
      .catch(() => setError("Error al cargar los contactos de emergencia"))
      .finally(() => setIsLoading(false));
  }, []);

  // ── Actualizar perfil (nombre) ───────────────────────────────────────────────
  // El backend no expone PATCH /auth/me; el cambio solo se refleja en el contexto local.
  const handleUpdateProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const trimmedName = username.trim();
      if (trimmedName) {
        updateUser({ name: trimmedName });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePeer = (id: string) => {
    // Eliminación optimista local — la API de emergencia no expone DELETE /contacts/:id
    setPeers((prev) => prev.filter((p) => p.id !== id));
  };

  /**
   * Añade un nuevo contacto de emergencia (par de apoyo).
   * Devuelve true si tuvo éxito, false si falló (para que la página decida si cerrar el form).
   */
  const handleAddPeer = async (data: {
    contactName: string;
    phone?: string;
    relationship: string;
    email?: string;
  }): Promise<boolean> => {
    setPeerError(null);
    try {
      await addContact({
        contactName: data.contactName,
        relationship: data.relationship,
        email: data.email,
        phone: data.phone,
        priorityOrder: 1,
      });
      // Recargar lista
      const res: any = await getContacts();
      const list: any[] = res?.data ?? res ?? [];
      setPeers(
        Array.isArray(list)
          ? list.map((c: any) => ({
              id: c.id ?? c._id ?? String(Date.now()),
              name: c.contactName ?? c.name ?? '',
              email: c.email ?? '',
            }))
          : []
      );
      return true;
    } catch (err) {
      setPeerError(err instanceof Error ? err.message : 'No se pudo agregar el contacto. Intenta de nuevo.');
      return false;
    }
  };

  const handleToggleEmergencyNotifs = (value: boolean) => {
    setEmergencyNotifs(value);
  };

  return {
    username,
    addictionType,
    emergencyNotifs,
    peers,
    isLoading,
    isSaving,
    error,
    /** Error exclusivo del formulario de añadir contacto. */
    peerError,
    saved,
    setUsername,
    setAddictionType,
    handleUpdateProfile,
    handleRemovePeer,
    handleAddPeer,
    handleToggleEmergencyNotifs,
  };
}
