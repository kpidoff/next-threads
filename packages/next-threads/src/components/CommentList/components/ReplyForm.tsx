import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";

import { ReplyFormProps } from "../../Thread/types";
import { UserAvatar } from "../../UserAvatar";

export const ReplyForm: React.FC<ReplyFormProps> = ({
  currentUser,
  onSubmit,
  disabled = false,
}) => {
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        sx={{ width: 32, height: 32 }}
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
    </Box>
  );
};
