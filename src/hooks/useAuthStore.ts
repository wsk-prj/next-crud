"use client";

import { Payload } from "@/lib/jwt";
import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  token: string | null;
  userInfo: Payload | null;
  login: (token: string, userInfo: Payload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  token: null,
  userInfo: null,
  login: (token: string, userInfo: Payload) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    set({ loggedIn: true, token, userInfo });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    }
    set({ loggedIn: false, token: null, userInfo: null });
  },
}));

export const initAuthStore = (): void => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const userInfoString = localStorage.getItem("userInfo");

    if (token && userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        useAuthStore.setState({ loggedIn: true, token, userInfo });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
      }
    }
  }
};
