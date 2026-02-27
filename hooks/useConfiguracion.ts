"use client";

import { useState, useEffect } from "react";
import { getProfile, updateProfile, getSupportPeers, removeSupportPeer, updateEmergencyNotifs } from "@/lib/api/profile";
import type { SupportPeer } from "@/types";

export function useConfiguracion() {
  const [username, setUsername] = useState("");
  const [addictionType, setAddictionType] = useState("Drogas");
  const [emergencyNotifs, setEmergencyNotifs] = useState(true);
  const [peers, setPeers] = useState<SupportPeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([getProfile(), getSupportPeers()])
      .then(([profile, supportPeers]) => {
        setUsername(profile.username);
        setAddictionType(profile.addictionType);
        setPeers(supportPeers);
      })
      .catch(() => setError("Error al cargar la configuración"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateProfile({ username, addictionType });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePeer = async (id: string) => {
    setPeers((prev) => prev.filter((p) => p.id !== id)); // optimistic
    try {
      await removeSupportPeer(id);
    } catch {
      setError("Error al eliminar el par");
    }
  };

  const handleToggleEmergencyNotifs = async (value: boolean) => {
    setEmergencyNotifs(value);
    try {
      await updateEmergencyNotifs(value);
    } catch {
      setEmergencyNotifs(!value); // revert
    }
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
    setUsername,
    setAddictionType,
    handleUpdateProfile,
    handleRemovePeer,
    handleToggleEmergencyNotifs,
  };
}
