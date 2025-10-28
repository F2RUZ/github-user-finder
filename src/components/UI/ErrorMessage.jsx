import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              Qayta urinish
            </Button>
          )
        }
      >
        <AlertTitle>Xato yuz berdi!</AlertTitle>
        <strong>{message}</strong> Iltimos, ma'lumotni tekshirib ko'ring yoki
        keyinroq urinib ko'ring.
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
