"use client";

import { useEffect } from "react";
import { initAuthStore } from "@/hooks/useAuthStore";

export const AuthInitializer = (): null => {
  useEffect(() => {
    initAuthStore();
  }, []);

  return null;
};
