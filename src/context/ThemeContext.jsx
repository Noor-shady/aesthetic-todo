import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Store the theme in LocalStorage so it remembers my choice
  const [theme, setTheme] = useLocalStorage('aesthetic-theme', 'pink');

  // Automatically update the <body> tag when theme changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme anywhere easily
export const useTheme = () => useContext(ThemeContext);