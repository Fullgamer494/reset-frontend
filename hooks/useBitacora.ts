"use client";

import { useState } from "react";
import { saveJournalEntry } from "@/lib/api/journal";
import type { MoodId } from "@/types";

export function useBitacora() {
  const [selectedMood, setSelectedMood] = useState<MoodId>("calmado");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!notes.trim()) {
      setError("Escribe algo antes de guardar.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSaved(false);
    try {
      await saveJournalEntry({ mood: selectedMood, notes });
      setSaved(true);
      setNotes("");
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la nota");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedMood,
    notes,
    isLoading,
    error,
    saved,
    setSelectedMood,
    setNotes,
    handleSave,
  };
}
