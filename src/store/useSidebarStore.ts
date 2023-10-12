import { create } from "zustand";


interface SidebarStoreInterface {
    isSidebarOpen: boolean;
    toggle: (newStatus: boolean) => void
}

export const useSidebarStore = create<SidebarStoreInterface>(set => ({
    isSidebarOpen: false,
    toggle: (newStatus: boolean) => (set({isSidebarOpen: newStatus}))
}))