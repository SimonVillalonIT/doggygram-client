import { create } from "zustand";
import {
  googleAuth,
  logIn,
  logOut,
  refreshToken,
  register,
} from "../utils/auth";
import { persist } from "zustand/middleware";

interface userData {
  user: string;
  email?: string;
  password: string;
}

export type Store = {
  token: string;
  expiresIn: number;
  error: string;
  isLoggedIn: boolean;
};

export type Actions = {
  register: (user: userData) => Promise<void>;
  logIn: (user: userData) => Promise<void>;
  googleLogIn: (response: any) => Promise<void>;
  refreshToken: () => Promise<void>;
  setTime: () => void;
  setLoggedIn: (bool: boolean) => void;
  logOut: () => void;
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
        const result = await register(userData);
        console.log(result);
        set((state) => ({
          ...state,
          token: result.token,
          error: "",
          expiresIn: result.expiresIn,
        }));
        get().setTime();
      },
      logIn: async (userData) => {
        const result = await logIn(userData);
        console.log(result);
        set((state) => ({
          ...state,
          token: result.token,
          error: "",
          expiresIn: result.expiresIn,
        }));
        get().setLoggedIn(true);
        get().setTime();
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
      logOut: async () => {
        await logOut();
        set((state) => ({
          ...state,
          token: "",
          expiresIn: 0,
          error: "",
          isLoggedIn: false,
        }));
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
