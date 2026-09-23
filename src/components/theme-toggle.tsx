"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (callback) => {
      window.addEventListener("edison-theme-change", callback);
      return () => window.removeEventListener("edison-theme-change", callback);
    },
    () => {
      const saved = window.localStorage.getItem("theme") as Theme | null;
      return (
        saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      );
    },
    () => "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
    window.dispatchEvent(new Event("edison-theme-change"));
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "light" ? "切换为深色模式" : "切换为浅色模式"}
    >
      {theme === "light" ? (
        <Moon size={18} strokeWidth={1.5} />
      ) : (
        <Sun size={18} strokeWidth={1.5} />
      )}
    </button>
  );
}
