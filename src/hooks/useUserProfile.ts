"use client";

import { UserProfile } from "@/app/api/service/user/User";
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
      throw new Error(error.message);
    }

    if (result != null) {
      set({ userProfile: result.data });
    }
  },
  removeUserProfile: () => {
    set({ userProfile: null });
  },
}));

export const initUserProfile = async (): Promise<void> => {
  console.log(`[useUserProfile] initUserProfile`);
  const { result, error } = await GET<UserProfile>(`/api/v0/user/profile`);

  if (error) {
    throw new Error(error.message);
  }

  if (result != null) {
    useUserProfile.setState({ userProfile: result.data });
  }
};
