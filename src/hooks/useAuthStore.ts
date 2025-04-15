"use client";

import { GET, POST } from "@/scripts/api/apiClient";
import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  login: async (id: string, password: string): Promise<void> => {
    console.log("[useAuthStore] login");
    const { error } = await POST("/api/v0/auth/login", {
      loginid: id,
      loginpw: password,
    });

    if (error) {
      set({ loggedIn: false });
      throw error;
    }

    set({ loggedIn: true });
  },
  logout: async () => {
    console.log("[useAuthStore] logout");
    set({ loggedIn: false });

    const { error } = await GET("/api/v0/auth/logout");

    if (error) {
      throw error;
    }
  },
  checkAuth: async (): Promise<void> => {
    console.log("[useAuthStore] checkAuth");

    const currentPath = window.location.pathname;
    if (publicRoutePaths.includes(currentPath)) {
      return;
    }

    const { error } = await GET("/api/v0/auth/check");

    if (error) {
      set({ loggedIn: false });
      if (error?.code === "SESSION_EXPIRED") {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`;
        return;
      }
      throw error;
    }
  },
}));

const publicRoutePaths = ["/auth/login", "/auth/login?", "/auth/register", "/auth/register?", "/board"];
