"use client";

import { Payload } from "@/lib/_tokenProvider";
import { LoginRequest, LoginResponse } from "@/lib/auth/_authService";
import { GET, POST } from "@/scripts/api/apiClient";
import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  payload: Payload | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  payload: null,
  login: async (id: string, password: string): Promise<void> => {
    console.log("[useAuthStore] login");
    const { result, error } = await POST<LoginRequest, LoginResponse>("/api/v0/auth/login", {
      loginid: id,
      loginpw: password,
    } as LoginRequest);

    if (error) {
      throw new Error(error.message);
    }

    if (result != null) {
      set({ loggedIn: true });
    }
  },
  logout: async () => {
    console.log("[useAuthStore] logout");
    const { result, error } = await POST("/api/v0/auth/logout");

    if (error) {
      throw new Error(error.message);
    }

    if (result != null) {
      set({ loggedIn: false, payload: null });
    }
  },
}));

export const initAuthStore = async (): Promise<void> => {
  const { result, error } = await GET<Payload>("/api/v0/auth/payload");

  if (error) {
    throw new Error(error.message);
  }

  if (result != null) {
    useAuthStore.setState({ loggedIn: true, payload: result.data });
  }
};
