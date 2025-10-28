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

const RepoItem = ({ repo }) => {
  const theme = useTheme();
  return (
    <ListItem
      divider
      sx={{
        display: "block",
        "&:hover": {
          bgcolor: theme.palette.mode === "light" ? "#f5f5f5" : "#272727",
        },
        transition: "background-color 0.2s",
      }}
    >
      <Link
        href={repo.html_url}
        target="_blank"
        rel="noopener"
        underline="none"
      >
        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: "bold" }}
        >
          {repo.name}
        </Typography>
      </Link>
      <ListItemText
        secondary={repo.description || "Tavsifi yo'q."}
        sx={{ my: 1 }}
      />
      <Box display="flex" gap={2} alignItems="center" sx={{ mt: 1 }}>
        <Chip
          icon={<StarIcon sx={{ fontSize: 16 }} />}
          label={repo.stargazers_count.toLocaleString()}
          size="small"
          variant="outlined"
        />
        {repo.language && (
          <Chip
            icon={<CodeIcon sx={{ fontSize: 16 }} />}
            label={repo.language}
            size="small"
            sx={{
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.dark,
            }}
          />
        )}
      </Box>
    </ListItem>
  );
};

export default RepoItem;
