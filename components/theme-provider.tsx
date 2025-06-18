'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'cyrlab-ui-theme',
  attribute = 'data-theme',
  enableSystem = false,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      return storedTheme as Theme;
    }
    
    if (enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      return systemTheme;
    }
    
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const oldTheme = root.getAttribute(attribute);

    if (disableTransitionOnChange && oldTheme !== theme) {
      root.classList.add('no-transitions');
      window.setTimeout(() => {
        root.classList.remove('no-transitions');
      }, 0);
    }

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.setAttribute(attribute, theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, attribute, storageKey, disableTransitionOnChange]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};