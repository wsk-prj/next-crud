"use client";

import { GET, POST } from "@/scripts/api/apiClient";
import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
      throw new Error(error.message);
    }

    set({ loggedIn: true });
  },
  logout: async () => {
    console.log("[useAuthStore] logout");
    const { error } = await GET("/api/v0/auth/logout");

    if (error) {
      throw new Error(error.message);
    }
    set({ loggedIn: false });
  },
}));

export const initAuthStore = async (): Promise<void> => {
  console.log("[useAuthStore] initAuthStore");
  const { error } = await GET("/api/v0/auth/check");

  if (error) {
    throw new Error(error.message);
  }

  useAuthStore.setState({ loggedIn: true });
};
