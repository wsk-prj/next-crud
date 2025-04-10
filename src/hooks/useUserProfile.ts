"use client";

import User, { UserProfile } from "@/lib/user/User";
import { GET } from "@/scripts/api/apiClient";
import { create } from "zustand";

interface UserProfileState {
  userProfile: UserProfile | null;
  fetchUserProfile: (id: User["id"]) => Promise<void>;
}

export const useUserProfile = create<UserProfileState>((set) => ({
  userProfile: null,
  fetchUserProfile: async (id: User["id"]) => {
    console.log(`[useUserProfile] fetchUserProfile: ${id}`);

    const { result, error } = await GET<UserProfile>(`/api/v0/user/${id}`);

    if (error) {
      throw new Error(error.message);
    }

    if (result != null) {
      set({ userProfile: result.data });
    }
  },
}));

export const initUserProfile = async (id: User["id"]): Promise<void> => {
  console.log(`[useUserProfile] initUserProfile: ${id}`);
  const { result, error } = await GET<UserProfile>(`/api/v0/user/${id}`);

  if (error) {
    throw new Error(error.message);
  }

  if (result != null) {
    useUserProfile.setState({ userProfile: result.data });
  }
};
