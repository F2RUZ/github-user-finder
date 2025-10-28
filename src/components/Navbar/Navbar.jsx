import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorMode } from "../../modules/theme/ThemeProvider";

const Navbar = () => {
  const { toggleColorMode, mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        pt: "50px",
      }}
    >
      <AppBar
        position="static"
        sx={{
          maxWidth: "1200px",
          width: "90%",
          mx: "auto",
          borderRadius: "20px",
          bgcolor: isDark
            ? "rgba(15, 17, 55, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(5px)",

          border: 1,
          borderColor: "divider",
          boxShadow: 3,
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            py: 0.5,
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1,
            }}
          >
            <GitHubIcon sx={{ fontSize: 28, color: "text.primary" }} />

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "700",
                color: "text.primary",
                ml: 0.5,
              }}
            >
              GitHub Finder
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              size="medium"
              sx={{
                borderRadius: "8px",
                p: 1,
                bgcolor: isDark
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              {isDark ? (
                <DarkModeIcon sx={{ color: "primary.light" }} />
              ) : (
                <LightModeIcon sx={{ color: "text.secondary" }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
