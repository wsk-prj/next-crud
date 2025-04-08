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

const useAuthStore = create<AuthState>((set) => ({
  loggedIn: typeof window === "undefined" ? false : !!localStorage.getItem("token"),
  token: typeof window === "undefined" ? null : localStorage.getItem("token"),
  userInfo: typeof window === "undefined" ? null : JSON.parse(localStorage.getItem("userInfo") || "null"),
  login: (token: string, userInfo: Payload) => {
    console.log(`login token: ${token}`);
    console.log(`login userInfo: ${userInfo}`);
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    set({ loggedIn: true, token, userInfo });
  },
  logout: () => {
    console.log("logout");
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    set({ loggedIn: false, token: null, userInfo: null });
  },
}));

export default useAuthStore;
