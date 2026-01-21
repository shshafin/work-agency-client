import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  user: any | null;
  token: string | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token });
        // Middleware এর জন্য কুকি সেট করা
        Cookies.set("accessToken", token, { expires: 7 });
      },
      logout: () => {
        set({ user: null, token: null });
        Cookies.remove("accessToken");
        localStorage.removeItem("auth-storage");
        window.location.href = "/login";
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
