"use client";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700'
      aria-label='Toggle theme'
    >
      {theme === "light" ? (
        <Moon className='w-5 h-5' />
      ) : (
        <Sun className='w-5 h-5 text-white' />
      )}
    </button>
  );
}
