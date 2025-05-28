import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useState } from "react";

import { CommentListProps } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReplyForm } from "./components/ReplyForm";
import { UserAvatar } from "../UserAvatar";
import { formatDate } from "../../utils/dateUtils";
import { useDeviceType } from "../../hooks/useDeviceType";

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUser,
  onReply,
  isReplying = false,
  onRemoveComment,
  isAdmin = false,
}) => {
  const theme = useTheme();
  const { isMobile } = useDeviceType();
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const handleRemoveComment = async (commentId: string) => {
    if (onRemoveComment) {
      setDeletingCommentId(commentId);
      try {
        await onRemoveComment(commentId);
      } finally {
        setDeletingCommentId(null);
      }
    }
  };

  return (
    <Box
      mt={2}
      pl={{
        xs: 1,
        sm: 4,
      }}
    >
      <CSSTransition
        in={comments.length === 0}
        timeout={300}
        classNames="no-comments"
        unmountOnExit
      >
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          py={2}
          sx={{
            "&.no-comments-enter": {
              opacity: 0,
            },
            "&.no-comments-enter-active": {
              opacity: 1,
              transition: "opacity 300ms ease-in",
            },
            "&.no-comments-exit": {
              opacity: 1,
            },
            "&.no-comments-exit-active": {
              opacity: 0,
              transition: "opacity 300ms ease-out",
            },
          }}
        >
          Aucun commentaire pour le moment
        </Typography>
      </CSSTransition>

      {comments.length > 0 && (
        <TransitionGroup>
          {comments.map((comment) => (
            <CSSTransition key={comment.id} timeout={300} classNames="comment">
              <Box
                mb={2}
                sx={{
                  p: { xs: 0, sm: 2 },
                  borderRadius: 1,
                  borderBottom: {
                    xs: `1px solid ${theme.palette.divider}`,
                    sm: "none",
                  },
                  pb: { xs: 2, sm: 3 },
                  bgcolor: { xs: "transparent", sm: theme.palette.grey[50] },
                  "&.comment-enter": {
                    opacity: 0,
                    transform: "translateY(-20px)",
                  },
                  "&.comment-enter-active": {
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "all 300ms ease-in",
                  },
                  "&.comment-exit": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                  "&.comment-exit-active": {
                    opacity: 0,
                    transform: "translateY(-20px)",
                    transition: "all 300ms ease-out",
                  },
                }}
              >
                <Box
                  display="flex"
                  alignItems="flex-start"
                  mb={1}
                  px={{ xs: 1, sm: 0 }}
                >
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" alignItems="center">
                      <UserAvatar
                        avatar={comment.author.avatar}
                        name={comment.author.name}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {comment.author.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(comment.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {onRemoveComment &&
                    (isAdmin || comment.author.id === currentUser.id) && (
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveComment(comment.id)}
                        disabled={deletingCommentId === comment.id}
                        color="error"
                        sx={{ ml: "auto" }}
                      >
                        {deletingCommentId === comment.id ? (
                          <CircularProgress size={20} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    )}
                </Box>
                <Typography variant="body2" px={{ xs: 1, sm: 0 }}>
                  {comment.content}
                </Typography>
              </Box>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}

      {onReply && (
        <ReplyForm
          currentUser={currentUser}
          onSubmit={onReply}
          disabled={isReplying}
        />
      )}
    </Box>
  );
};
