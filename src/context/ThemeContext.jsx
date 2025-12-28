import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Store the theme in LocalStorage so it remembers your choice
  const [theme, setTheme] = useLocalStorage('aesthetic-theme', 'pink');

  // Automatically update the <body> tag when theme changes