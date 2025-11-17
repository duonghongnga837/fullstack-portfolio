import React, { useState, createContext, useMemo, useCallback } from 'react';

// Context definition
export const ThemeContext = createContext({ 
  isDarkMode: false, 
  toggleTheme: () => {} 
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); 

  // Memoize the function to prevent unnecessary re-renders in consumers
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []); 
  
  // Memoize the context value object
  const contextValue = useMemo(() => ({
    isDarkMode, 
    toggleTheme,
  }), [isDarkMode, toggleTheme]); 

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};