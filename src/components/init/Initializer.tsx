"use client";

import { useEffect, useState } from "react";
import { initAuthStore } from "@/hooks/useAuthStore";
import { initUserProfile } from "@/hooks/useUserProfile";
import { useAuthStore } from "@/hooks/useAuthStore";

export const Initializer = (): null => {
  const { payload } = useAuthStore();

  useEffect(() => {
    (async () => {
      await initAuthStore();
    })();
  }, []);

  useEffect(() => {
    if (payload) {
      (async () => {
        await initUserProfile(Number(payload.sub));
      })();
    }
  }, [payload]);

  return null;
};
