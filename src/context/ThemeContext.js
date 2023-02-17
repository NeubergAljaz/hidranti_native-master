import React, { createContext, useState } from 'react';

const ThemeContext = createContext({
  isDarkModeEnabled: false,
  setIsDarkModeEnabled: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkModeEnabled, setIsDarkModeEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;