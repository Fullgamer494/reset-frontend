"use client";

import { useState, useEffect } from "react";
import { getCompanionProfile, updateCompanionProfile, getSupportedUsers } from "@/lib/api/companion";
import type { CompanionProfile, SupportedUser } from "@/types";

export function useMiCuenta() {
  const [profile, setProfile] = useState<CompanionProfile>({
    name: "",
    email: "",
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
    Promise.all([getCompanionProfile(), getSupportedUsers()])
      .then(([p, users]) => {
        setProfile(p);
        setSupportedUsers(users);
      })
      .catch(() => setError("Error al cargar la cuenta"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (field: keyof CompanionProfile, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateCompanionProfile(profile);
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
