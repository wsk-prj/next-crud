"use client";

import { PUBLIC_PATHS, routes } from "@/utils/routes";
import { GET, POST } from "@/scripts/api/apiClient";
import { create } from "zustand";
import { clearAccessToken, setAccessToken } from "@/scripts/storage/tokenStore";
import { Token } from "@/types/Token";
import { AuthRequest } from "@/app/api/service/auth/dto/request/AuthRequest";

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
    const { result, error } = await POST<AuthRequest, Token>(routes.api.v0.auth.login.uri(), {
      loginid: id,
      loginpw: password,
    });

    if (error) {
      set({ loggedIn: false });
      throw error;
    }

    if (result) {
      set({ loggedIn: true });
      setAccessToken(result.data.token);
    }
  },
  logout: async (): Promise<void> => {
    console.log("[useAuthStore] logout");
    clearAccessToken();
    set({ loggedIn: false });

    const { error } = await GET(routes.api.v0.auth.logout.uri());

    if (error) {
      throw error;
    }
  },
  checkAuth: async (): Promise<void> => {
    const currentPath = window.location.pathname;
    console.log("[useAuthStore] currentPath", currentPath);
    if (PUBLIC_PATHS.includes(currentPath)) {
      return;
    }

    console.log("[useAuthStore] checkAuth");
    const { error } = await GET(routes.api.v0.auth.check.uri());

    if (error) {
      set({ loggedIn: false });
      if (error?.code === "SESSION_EXPIRED") {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `${routes.auth.login.uri({ callbackUrl: currentPath })}`;
        return;
      }
      throw error;
    }
  },
}));
