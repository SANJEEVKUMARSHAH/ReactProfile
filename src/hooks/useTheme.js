import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

// Dark is the default. The inline script in index.html applies the same
// rule before React loads, which prevents a flash of the wrong theme.
function getInitialTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Whenever `theme` changes: update <html> and remember the choice.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage can be blocked; the theme still works for this visit */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
