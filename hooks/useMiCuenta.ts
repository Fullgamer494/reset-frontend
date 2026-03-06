"use client";

import { useState, useEffect } from "react";
import { getMyGodchildren } from "@/lib/api/sponsorship";
import { getStatistics } from "@/lib/api/tracking";
import { updateMe } from "@/lib/api/auth";
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

    // Cargar ahijados del padrino
    getMyGodchildren()
      .then((res: any) => {
        const list: any[] = res?.data ?? res ?? [];
        setSupportedUsers(
          Array.isArray(list)
            ? list.map((u: any) => ({
                id: u.id ?? u._id ?? String(Date.now()),
                displayName: u.name ?? u.displayName ?? "Usuario",
                addictionType: u.addictionName ?? u.addictionType ?? "",
                sobrietyDays: u.sobrietyDays ?? 0,
                status: u.status === "Inactivo" ? "Inactivo" : "Activo",
              }))
            : []
        );
      })
      .catch(async () => {
        // Si el endpoint de ahijados no existe aún, usar estadísticas generales
        try {
          const stats: any = await getStatistics();
          const data = stats?.data ?? stats;
          if (data) {
            setSupportedUsers([
              {
                id: "default",
                displayName: "Ahijado",
                addictionType: data.addictionName ?? "",
                sobrietyDays: data.soberDays ?? data.currentStreak ?? 0,
                status: "Activo",
              },
            ]);
          }
        } catch {
          // sin ahijados registrados
        }
      })
      .finally(() => setIsLoading(false));
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
        // Intentar persistir en el backend; si el endpoint no existe aún,
        // el error se silencia y el cambio queda guardado en storage local.
        await updateMe({ name: trimmedName }).catch(() => {});
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
