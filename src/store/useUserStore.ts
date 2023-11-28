import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  user_name: string;
  user_id: string;
  isTwoFacAuthEnabled: boolean;
}

interface UserStore {
  user: User| null;
  updateUser: (
    newUserDetails: User | null
  ) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      updateUser: (
        newUserDetails: User | null
      ) => set(() => ({ user: newUserDetails })),
    }),
    { name: "user" }
  )
);
