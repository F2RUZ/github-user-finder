import React from "react";
import { Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const EmptyState = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        p: 4,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <GitHubIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        GitHub User Finder'ga xush kelibsiz!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Qidiruvni boshlash uchun yuqoridagi maydonga istalgan GitHub
        foydalanuvchi nomini kiriting.
      </Typography>
    </Box>
  );
};

export default EmptyState;
