"use client";

import { useEffect } from "react";
import { initAuthStore } from "@/hooks/useAuthStore";

export function AuthInitializer() {
  useEffect(() => {
    initAuthStore();
  }, []);

  return null;
}
