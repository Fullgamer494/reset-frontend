"use client";

import { useState, useEffect } from "react";
import { getContacts, addContact } from "@/lib/api/emergency";
import { useAuth } from "@/context/AuthContext";
import type { SupportPeer } from "@/types";

export function useConfiguracion() {
  const { user, updateUser } = useAuth();

  // Precarga el nombre del usuario autenticado
  const [username, setUsername] = useState(user?.name ?? "");
  const [addictionType, setAddictionType] = useState("Drogas");
  const [emergencyNotifs, setEmergencyNotifs] = useState(true);
  const [peers, setPeers] = useState<SupportPeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
                name: c.contactName ?? c.contact_name ?? c.name ?? "",
                email: c.email ?? "",
              }))
            : []
        );
      })
      .catch(() => setError("Error al cargar los contactos de emergencia"))
      .finally(() => setIsLoading(false));
  }, []);

  // ── Bloque: conectar con un padrino ─────────────────────────────────────────
  const [sponsorCode, setSponsorCode] = useState("");
  const [sponsorStatus, setSponsorStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [sponsorMsg, setSponsorMsg] = useState("");

  const handleAssignSponsor = async () => {
    const codeClean = sponsorCode.trim();
    if (!codeClean) return;
    if (!user) { setSponsorStatus("error"); setSponsorMsg("Debes iniciar sesión."); return; }
    setSponsorStatus("submitting");
    setSponsorMsg("");
    try {
      const { assignSponsor } = await import("@/lib/api/sponsorship");
      await assignSponsor(codeClean, user.id);
      setSponsorStatus("success");
      setSponsorMsg("¡Padrino asignado correctamente!");
      setSponsorCode("");
    } catch (err) {
      setSponsorStatus("error");
      setSponsorMsg(
        err instanceof Error && err.message
          ? err.message
          : "No se pudo conectar. Verifica el código e intenta de nuevo."
      );
    }
    setTimeout(() => setSponsorStatus("idle"), 4000);
  };
  // ─────────────────────────────────────────────────────────────────────────────

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      // El backend no expone PATCH /profile actualmente.
      // Persiste el cambio en el contexto de auth (en memoria de sesión)
      // para que el sidebar y el dashboard reflejen el nombre actualizado.
      if (username.trim()) updateUser({ name: username.trim() });
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
   */
  const handleAddPeer = async (data: {
    name: string;
    phone: string;
    email?: string;
  }) => {
    try {
      await addContact({
        contact_name: data.name,
        phone: data.phone,
        email: data.email,
      });
      // Recargar lista
      const res: any = await getContacts();
      const list: any[] = res?.data ?? res ?? [];
      setPeers(
        Array.isArray(list)
          ? list.map((c: any) => ({
              id: c.id ?? c._id ?? String(Date.now()),
              name: c.contactName ?? c.contact_name ?? c.name ?? "",
              email: c.email ?? "",
            }))
          : []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agregar contacto");
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
    saved,
    sponsorCode,
    sponsorStatus,
    sponsorMsg,
    setUsername,
    setAddictionType,
    setSponsorCode,
    handleUpdateProfile,
    handleRemovePeer,
    handleAddPeer,
    handleToggleEmergencyNotifs,
    handleAssignSponsor,
  };
}
