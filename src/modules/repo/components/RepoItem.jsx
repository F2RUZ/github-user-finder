import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
  Link,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";

const RepoItem = ({ repo }) => {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";
  const primaryLightColor = isDark
    ? theme.palette.primary.light
    : theme.palette.primary.main;

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: 2,
        mb: 1.5,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s, transform 0.2s",
        boxShadow: isDark
          ? "0 2px 10px rgba(0,0,0,0.4)"
          : "0 2px 10px rgba(0,0,0,0.08)",

        "&:hover": {
          bgcolor: isDark ? "#2A2A2A" : theme.palette.grey[100],
          transform: "translateY(-2px)",
          boxShadow: isDark
            ? "0 4px 15px rgba(0,0,0,0.6)"
            : "0 4px 15px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Link
        href={repo.html_url}
        target="_blank"
        rel="noopener"
        underline="none"
        sx={{ width: "100%" }}
      >
        <Typography
          variant="h5"
          color={primaryLightColor}
          sx={{
            fontWeight: "700",
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {repo.name}
        </Typography>
      </Link>

      <ListItemText
        secondary={repo.description || "Bu repository uchun tavsif berilmagan."}
        secondaryTypographyProps={{
          color: "text.secondary",
          sx: { mb: 1.5, fontSize: "0.95rem" },
        }}
        sx={{ my: 0 }}
      />

      <Box display="flex" gap={1.5} alignItems="center">
        <Chip
          icon={<StarIcon sx={{ fontSize: 16 }} />}
          label={repo.stargazers_count.toLocaleString()}
          size="small"
          sx={{
            color: primaryLightColor,
            borderColor: primaryLightColor,
            fontWeight: "600",
            bgcolor: isDark
              ? "rgba(93, 173, 226, 0.1)"
              : "rgba(0, 123, 255, 0.1)",
            "& .MuiChip-icon": { color: primaryLightColor },
          }}
        />

        {repo.language && (
          <Chip
            icon={<CodeIcon sx={{ fontSize: 16 }} />}
            label={repo.language}
            size="small"
            variant="filled"
            sx={{
              fontWeight: "600",
              color: theme.palette.text.primary,
              "& .MuiChip-icon": { color: theme.palette.text.primary, ml: 0.5 },
            }}
          />
        )}

        {!repo.language && (
          <Chip
            icon={<LanguageIcon sx={{ fontSize: 16 }} />}
            label="Til aniqlanmagan"
            size="small"
            variant="outlined"
            color="warning"
          />
        )}
      </Box>
    </ListItem>
  );
};

export default RepoItem;
