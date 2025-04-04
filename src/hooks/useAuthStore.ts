import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const useAuthStore = create<AuthState>((set: (partial: Partial<AuthState>) => void) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => set({ loggedIn }),
}));

export default useAuthStore;
