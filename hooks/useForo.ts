"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getForoPosts,
  createForoPost,
  toggleLikePost,
  getForoCategories,
} from "@/lib/api/forum";
import type { ForoPost, ForoCategory } from "@/types";

export function useForo() {
  const router = useRouter();
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [categories, setCategories] = useState<ForoCategory[]>([]);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = () => {
    setIsLoading(true);
    setError(null);
    Promise.all([getForoPosts(1, 10), getForoCategories()])
      .then(([p, c]) => {
        setPosts(p);
        setCategories(c);
      })
      .catch((err: any) => {
        const msg: string = err?.message ?? "";
        if (msg.toLowerCase().includes("token") || msg.includes("401") || msg.includes("nicia sesión")) {
          router.push("/login");
        } else {
          setError("No se pudieron cargar las publicaciones. Verifica tu conexión.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePublish = async () => {
    if (!postText.trim()) return;
    setIsSubmitting(true);
    try {
      await createForoPost({
        title: postTitle,
        content: postText,
        isAnonymous,
        tags: selectedTags,
      });
      // Recargar lista desde la API
      const refreshed = await getForoPosts(1, 10);
      setPosts(refreshed);
      setPostText("");
      setPostTitle("");
      setSelectedTags([]);
      setIsModalOpen(false);
    } catch {
      setError("No se pudo publicar. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleLike = async (id: string) => {
    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
    try {
      await toggleLikePost(id);
    } catch {
      // Revertir si falla
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
            : p
        )
      );
    }
  };

  const handleToggleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  return {
    posts,
    categories,
    postText,
    postTitle,
    selectedTags,
    isModalOpen,
    isAnonymous,
    isLoading,
    isSubmitting,
    error,
    setPostText,
    setPostTitle,
    setSelectedTags,
    setIsModalOpen,
    setIsAnonymous,
    toggleTag,
    handlePublish,
    handleToggleLike,
    handleToggleBookmark,
    loadPosts,
  };
}
