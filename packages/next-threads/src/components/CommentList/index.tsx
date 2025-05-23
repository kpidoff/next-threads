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

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  currentUser,
  onReply,
  isReplying = false,
  onRemoveComment,
  isAdmin = false,
}) => {
  const theme = useTheme();
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
    <Box mt={2} pl={4}>
      {comments.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          py={2}
        >
          Aucun commentaire pour le moment
        </Typography>
      ) : (
        <TransitionGroup>
          {comments.map((comment) => (
            <CSSTransition key={comment.id} timeout={300} classNames="comment">
              <Box
                mb={2}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: theme.palette.grey[50],
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
                <Box display="flex" alignItems="center" mb={1}>
                  <UserAvatar
                    avatar={comment.author.avatar}
                    name={comment.author.name}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.author.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {formatDate(comment.createdAt)}
                  </Typography>
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
                <Typography variant="body2">{comment.content}</Typography>
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
