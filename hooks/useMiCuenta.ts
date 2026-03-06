"use client";

import { useState, useEffect } from "react";
import { terminateSponsor } from "@/lib/api/sponsorship";
import { useAuth } from "@/context/AuthContext";
import type { CompanionProfile, SupportedUser } from "@/types";

export function useMiCuenta() {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState<CompanionProfile>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    emailAlerts: false,
    smsAlerts: false,
  });
  const [supportedUsers, setSupportedUsers] = useState<SupportedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Rellenar datos básicos del perfil desde el contexto de auth
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
    // El endpoint de ahijados no está disponible en la API actual
    setIsLoading(false);
  }, [user]);

  const handleChange = (field: keyof CompanionProfile, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const trimmedName = profile.name.trim();
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

  return {
    profile,
    supportedUsers,
    isLoading,
    isSaving,
    error,
    saved,
    handleChange,
    handleSave,
  };
}
