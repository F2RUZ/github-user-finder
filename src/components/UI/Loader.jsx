import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Ma'lumotlar yuklanmoqda...", size = 40 }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "200px", p: 4 }}
    >
      <CircularProgress size={size} sx={{ mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
