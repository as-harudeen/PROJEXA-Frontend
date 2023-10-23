import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: {
    user_name: string;
    user_id: string;
  } | null;
  updateUser: (
    newUserDetails: { user_name: string; user_id: string } | null
  ) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      updateUser: (
        newUserDetails: { user_name: string; user_id: string } | null
      ) => set(() => ({ user: newUserDetails })),
    }),
    { name: "user" }
  )
);
