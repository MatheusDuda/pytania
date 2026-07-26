import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="inline-flex items-center gap-2 rounded-full border border-brown/40 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-brown/10"
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
      {isDark ? "Tema claro" : "Tema escuro"}
    </button>
  );
}
