"use client";

import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  token: string | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setToken: (token: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  token: typeof window === "undefined" ? null : localStorage.getItem("token"),
  setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
  setToken: (token: string | null) => {
    console.log(`setToken: ${token}`);
    if (typeof window === "undefined") {
      return;
    }
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
}));

export default useAuthStore;
