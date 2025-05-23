import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

import { Comment as CommentIcon } from "@mui/icons-material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import React from "react";
import { Share as ShareIcon } from "@mui/icons-material";
import { ThreadActionsProps } from "../types";

export const ThreadActions: React.FC<ThreadActionsProps> = ({
  likes,
  comments,
  shares,
  isLoadingComments,
  onLike,
  onComment,
  onShare,
}) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {onLike && (
        <IconButton
          onClick={onLike}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.error.main,
            },
          }}
        >
          <FavoriteIcon />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            {likes}
          </Typography>
        </IconButton>
      )}

      {onComment && (
        <IconButton
          onClick={onComment}
          disabled={isLoadingComments}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          {isLoadingComments ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <CommentIcon />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {comments}
              </Typography>
            </>
          )}
        </IconButton>
      )}

      {onShare && (
        <IconButton
          onClick={onShare}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.success.main,
            },
          }}
        >
          <ShareIcon />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            {shares}
          </Typography>
        </IconButton>
      )}
    </Box>
  );
};
