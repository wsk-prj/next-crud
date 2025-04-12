import { create } from "zustand";

interface ErrorState {
  error: string;
  setError: (message: string) => void;
}

export const useError = create<ErrorState>((set) => ({
  error: "",
  setError: (message: string) => {
    set({
      error: message,
    });
  },
}));
