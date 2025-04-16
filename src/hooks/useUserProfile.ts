"use client";

import { UserProfile } from "@/app/api/service/user/dto/response/UserProfile";
import { PUBLIC_PATHS, routes } from "@/utils/routes";
import { GET } from "@/scripts/api/apiClient";
import { create } from "zustand";

interface UserProfileState {
  userProfile: UserProfile | null;
  fetchUserProfile: () => Promise<void>;
  removeUserProfile: () => void;
}

export const useUserProfile = create<UserProfileState>((set) => ({
  userProfile: null,
  fetchUserProfile: async () => {
    const currentPath = window.location.pathname;
    if (PUBLIC_PATHS.includes(currentPath)) {
      return;
    }

    console.log(`[useUserProfile] fetchUserProfile`);
    const { result, error } = await GET<UserProfile>(routes.api.v0.user.profile.uri());

    if (error) {
      set({ userProfile: null });
      throw error;
    }

    if (result != null) {
      set({ userProfile: result.data });
    }
  },
  removeUserProfile: () => {
    set({ userProfile: null });
  },
}));
