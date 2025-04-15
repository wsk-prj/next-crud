"use client";

import { UserProfile } from "@/app/api/service/user/dto/response/UserProfile";
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
    console.log(`[useUserProfile] fetchUserProfile`);

    const { result, error } = await GET<UserProfile>(`/api/v0/user/profile`);

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
