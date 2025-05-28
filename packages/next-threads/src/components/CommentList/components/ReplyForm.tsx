import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { ReplyFormProps } from "../../Thread/types";
import SendIcon from "@mui/icons-material/Send";
import { UserAvatar } from "../../UserAvatar";
import { useDeviceType } from "../../../hooks/useDeviceType";

export const ReplyForm: React.FC<ReplyFormProps> = ({
  currentUser,
  onSubmit,
  disabled = false,
}) => {
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useDeviceType();

  const handleSubmit = async () => {
    if (reply.trim()) {
      setIsLoading(true);
      try {
        await onSubmit(reply);
        setReply("");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1,
        mt: 2,
      }}
    >
      <UserAvatar
        avatar={currentUser.avatar}
        name={currentUser.name}
        sx={{
          width: { xs: 28, sm: 32 },
          height: { xs: 28, sm: 32 },
          mt: { xs: 0.5, sm: 0 },
        }}
      />
      <TextField
        fullWidth
        size="small"
        placeholder="Écrire une réponse..."
        value={reply}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length === 1) {
            setReply(value.toUpperCase());
          } else {
            setReply(value);
          }
        }}
        disabled={disabled || isLoading}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          "& .MuiInputBase-input": {
            padding: "8px 14px",
            lineHeight: "1.5",
          },
          "& .MuiInputLabel-root": {
            lineHeight: "1.5",
          },
        }}
      />
      {isMobile ? (
        <IconButton
          type="button"
          color="primary"
          disabled={!reply.trim() || disabled || isLoading}
          onClick={handleSubmit}
          sx={{
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground",
              color: "action.disabled",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      ) : (
        <Button
          type="button"
          variant="contained"
          disabled={!reply.trim() || disabled || isLoading}
          onClick={handleSubmit}
          sx={{ borderRadius: 2, minWidth: 100 }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Répondre"
          )}
        </Button>
      )}
    </Box>
  );
};
