import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const FollowersStats = ({ followers, following }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      gap={2}
      mt={2}
      mb={2}
      bgcolor="action.hover"
      p={1.5}
      borderRadius={1}
      sx={{
        width: "100%",
        maxWidth: 300,
      }}
    >
      <Box textAlign="center" flexGrow={1}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {followers?.toLocaleString() || 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Obunachilar
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ height: "30px", mx: 1 }} />

      <Box textAlign="center" flexGrow={1}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {following?.toLocaleString() || 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Obunada
        </Typography>
      </Box>
    </Box>
  );
};

export default FollowersStats;
