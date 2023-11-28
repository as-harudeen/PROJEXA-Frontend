import { create } from "zustand";

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const setDarkModeClassFromHtmlElement = () => {
  const htmlElement = document.querySelector("html")!;
  if (!htmlElement.classList.contains("dark")) {
    htmlElement.classList.add("dark");
  }
};

const removeDarkModeClassFromHtmlElement = () => {
  const htmlElement = document.querySelector("html")!;
  htmlElement.classList.remove("dark");
};

const initialState = () => {
  const darkModeFromLocalStorage = localStorage.getItem("theme");
  if (darkModeFromLocalStorage) {
    const { isDarkModeEnabled } = JSON.parse(darkModeFromLocalStorage) as {
      isDarkModeEnabled: boolean;
    };
    if (typeof isDarkModeEnabled === "boolean") {
      if (isDarkModeEnabled) setDarkModeClassFromHtmlElement();
      else removeDarkModeClassFromHtmlElement();
      return isDarkModeEnabled;
    }
  }
  if (isDarkMode()) {
    setDarkModeClassFromHtmlElement();
    return true;
  } else {
    return false;
  }
};

interface ThemeStoreInterface {
  isDarkModeEnabled: boolean;
  toggle: (newStatus: boolean) => void;
}

export const useThemeStore = create<ThemeStoreInterface>((set) => ({
  isDarkModeEnabled: initialState(),
  toggle: (newState: boolean) => {
    if (newState) {
      setDarkModeClassFromHtmlElement();
    } else {
      removeDarkModeClassFromHtmlElement();
    }
    localStorage.setItem(
      "theme",
      JSON.stringify({ isDarkModeEnabled: newState })
    );
    return set({ isDarkModeEnabled: newState });
  },
}));
