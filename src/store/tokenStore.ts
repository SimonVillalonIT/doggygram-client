import { create } from "zustand";
import { googleAuth, logIn, refreshToken, register } from "../utils/auth";
import { persist } from "zustand/middleware";
import { userData } from "@/hooks/useUserData";

export type Store = {
  token: string;
  expiresIn: number;
  error: string;
  isLoggedIn: boolean;
};

export type Actions = {
  register: (user: userData) => void;
  logIn: (user: userData) => void;
  googleLogIn: (response: any) => void;
  refreshToken: () => void;
  setTime: () => void;
  setLoggedIn: (bool: boolean) => void;
};

export const useTokenStore = create(
  persist<Store & Actions>(
    (set, get) => ({
      token: "",
      expiresIn: 0,
      error: "",
      isLoggedIn: false,
      setLoggedIn: (bool) => {
        set((state) => ({ ...state, isLoggedIn: bool }));
      },
      register: async (userData) => {
        console.log(userData);
        try {
          const result = await register(userData);
          set((state) => ({
            ...state,
            token: result.token,
            error: "",
            expiresIn: result.expiresIn,
          }));
          get().setTime();
        } catch (error: any) {
          console.log(error);
          set((state) => ({ ...state, error: error.response.data.error }));
        }
      },
      logIn: async (userData) => {
        try {
          const result = await logIn(userData);
          set((state) => ({
            ...state,
            token: result.token,
            error: "",
            expiresIn: result.expiresIn,
          }));
          get().setLoggedIn(true);
          get().setTime();
        } catch (error: any) {
          console.log(error);
          set((state) => ({ ...state, error: error.response.data.error }));
        }
      },
      googleLogIn: async (response) => {
        try {
          const result = await googleAuth(response);
          set((state) => ({
            ...state,
            error: "",
            token: result.token,
            expiresIn: result.expiresIn,
          }));
          get().setLoggedIn(true);
          get().setTime();
        } catch (error: any) {
          console.log(error);
          set((state) => ({ ...state, error: error.response.data.error }));
        }
      },
      refreshToken: async () => {
        try {
          const result = await refreshToken();
          set((state) => ({
            ...state,
            error: "",
            token: result.token,
            expiresIn: result.expiresIn,
          }));
          get().setTime();
        } catch (error: any) {
          console.log(error);
        }
      },
      setTime: async () => {
        const refresh = get().refreshToken;
        const expiresIn = get().expiresIn;
        setTimeout(async () => {
          refresh();
          console.log("refreshing token...");
        }, expiresIn - 6000);
      },
    }),
    {
      name: "token-storage",
      partialize: (state) =>
        ({
          token: state.token,
          expiresIn: state.expiresIn,
          error: state.error,
          isLoggedIn: state.isLoggedIn,
        } as any),
    }
  )
);
