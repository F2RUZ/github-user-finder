import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Switch,
  FormControlLabel,
  Button,
  Link,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// Import yo'li ikki daraja yuqoriga chiqarildi
import { useColorMode } from "../../modules/theme/ThemeProvider";

/**
 * Zamonaviy (Modern) Navigatsiya Paneli (Ijtimoiy tarmoq uslubida)
 * GitHub User Finder
 */
const Navbar = () => {
  const { toggleColorMode, mode } = useColorMode();
  const isDark = mode === "dark";

  // O'zgaruvchilar: Rasm namunasidagi oltin rang uchun
  const primaryGold = isDark ? "#FFD700" : "#E0B800";
  const primaryDarkBg = "#1E2328"; // Rasmga yaqin to'q fon rangi

  const NavLink = ({ label }) => (
    <Link
      href="#"
      color="inherit"
      underline="none"
      variant="body2"
      sx={{
        fontWeight: 500,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        transition: "background-color 0.2s",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.1)", // To'q fonda yengil hover
        },
      }}
    >
      {label}
    </Link>
  );

  return (
    // AppBar endi butun ekran kengligini emas, balki aniq o'lchamni egallaydi va markazlashadi
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1, // Boshqa elementlardan yuqori turishi uchun
        // Yangi talablar shu yerda qo'shildi
        pt: "50px", // margin-top o'rniga padding-top ishlatildi, shunda AppBarning o'zi yopishib turadi
      }}
    >
      <AppBar
        position="static" // Sticky o'rniga static ishlatildi, chunki butun Box sticky
        sx={{
          // Talab qilingan o'lcham va bo'shliqlar
          maxWidth: "1200px",
          width: "90%", // Markazlashish uchun 90% kenglik (kichik ekranlar uchun)
          mx: "auto", // O'rtaga joylash
          borderRadius: "20px", // Talab qilingan border radius

          bgcolor: isDark ? primaryDarkBg : "background.paper",
          borderBottom: 1,
          borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "divider",
          boxShadow: 8, // Katta soya
          color: isDark ? "#FFFFFF" : "text.primary",
        }}
      >
        <Toolbar
          sx={{
            width: "100%", // Toolbar to'liq AppBar ichiga joylashadi
            py: 0.5,
            px: { xs: 2, md: 4 }, // Markazlashishni bekor qilmasdan bo'shliq berish
          }}
        >
          {/* Chap qism: Logo va Navigatsiya Linklari */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Logo Bloki (Oltin Nuqta bilan) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                mr: 2,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  bgcolor: primaryGold,
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "700",
                  color: isDark ? primaryGold : "text.primary",
                }}
              >
                GitHub Finder
              </Typography>
            </Box>

            {/* Navigatsiya Linklari (Rasm namunasiga o'xshatish) */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <NavLink label="Profil Qidirish" />
              <NavLink label="Repo List" />
            </Stack>
          </Box>

          {/* Bo'sh joy qo'shish */}
          <Box sx={{ flexGrow: 1 }} />

          {/* O'ng qism: Dark Mode va Ro'yxatdan O'tish */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Dark/Light Mode Switch */}
            <IconButton onClick={toggleColorMode} color="inherit" size="small">
              {isDark ? (
                <DarkModeIcon sx={{ color: "#90CAF9" }} />
              ) : (
                <LightModeIcon sx={{ color: "#FFD700" }} />
              )}
            </IconButton>

            {/* Ro'yxatdan O'tish Tugmasi (GitHub uchun almashtirilgan) */}
            <Button
              variant="contained"
              size="small"
              startIcon={<GitHubIcon />}
              sx={{
                bgcolor: primaryGold,
                color: primaryDarkBg,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#F3C500",
                },
              }}
            >
              GitHub Profil
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
