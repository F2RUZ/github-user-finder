import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { LocationOn, People, Business } from "@mui/icons-material";

import { useAppSelector } from "../../../app/hooks";

const ProfileCard = () => {
  const user = useAppSelector((state) => state.user.data);

  if (!user) {
    return null;
  }

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        boxShadow: "0px 3px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          spacing={3}
        >
          {/* Avatar */}
          <Avatar
            src={user.avatar_url}
            alt={user.login}
            sx={{
              width: { xs: 100, sm: 150 },
              height: { xs: 100, sm: 150 },
              border: "2px solid",
              borderColor: "divider",
            }}
          />

          {/* Info */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ wordBreak: "break-word" }}
            >
              {user.name || user.login}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              @{user.login}
            </Typography>

            {user.bio && (
              <Typography variant="body1" sx={{ mb: 2, color: "text.primary" }}>
                {user.bio}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={3}
              flexWrap="wrap"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              {user.location && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.location}
                  </Typography>
                </Stack>
              )}

              {user.company && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Business fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {user.company}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" alignItems="center" spacing={1}>
                <People fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {user.followers} followers • {user.following} following
                </Typography>
              </Stack>
            </Stack>

            <Button
              variant="contained"
              color="primary"
              size="small"
              component={Link}
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
