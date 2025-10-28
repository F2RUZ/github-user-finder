import React, { useState, useMemo, createContext, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { lightPalette, darkPalette } from "./palette";

// Context yaratish
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

const ThemeProvider = ({ children }) => {
  // Boshlang'ich holat
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      // Theme toggling funksiyasi
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  // Theme obyektini yaratish
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" ? lightPalette : darkPalette),
        },
        typography: {
          fontFamily: '"Roboto", "Arial", sans-serif',
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow:
                  mode === "light"
                    ? "0 4px 15px rgba(0,0,0,0.08)"
                    : "0 4px 15px rgba(255,255,255,0.08)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
