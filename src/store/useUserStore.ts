import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  isLoggedIn: boolean;
  toggleIsLoggedIn: (loginStatus: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      toggleIsLoggedIn: (status: boolean) =>
        set(() => ({ isLoggedIn: status })),
    }),
    { name: "user" }
  )
);
