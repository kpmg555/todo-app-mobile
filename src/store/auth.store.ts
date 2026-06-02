import { create } from "zustand";
import { setItem, getItem, deleteItem } from "../lib/storage";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isRestoring: boolean;
  setAuth: (user: User, token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isRestoring: true,

  setAuth: async (user, token) => {
    await setItem("jwt_token", token);
    await setItem("user_data", JSON.stringify(user));
    set({ user, token });
  },

  clearAuth: async () => {
    await deleteItem("jwt_token");
    await deleteItem("user_data");
    set({ user: null, token: null });
  },

  restoreSession: async () => {
    try {
      const token = await getItem("jwt_token");
      const userData = await getItem("user_data");
      if (token && userData) {
        set({ token, user: JSON.parse(userData) });
      }
    } finally {
      set({ isRestoring: false });
    }
  },
}));
