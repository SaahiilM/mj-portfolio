"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getThemeFromClient(): Theme {
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  // Always start with "light" so server and first client render match (avoids hydration mismatch)
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getThemeFromClient();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) applyTheme(theme);
  }, [theme, mounted]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-lg text-foreground transition-colors hover:bg-foreground/5"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
