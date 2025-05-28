import "moment/locale/fr";

import { Card, Collapse, Divider, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { CommentList } from "../CommentList";
import { ThreadActions } from "./components/ThreadActions";
import { ThreadHeader } from "./components/ThreadHeader";
import { ThreadProps } from "./types";
import moment from "moment";

export const Thread: React.FC<ThreadProps> = ({
  author,
  content,
  createdAt,
  likes,
  comments,
  shares,
  commentList = [],
  onLike,
  onComment,
  onShare,
  onReply,
  onRemoveComment,
  currentUser,
  isAdmin = false,
  hashtags = [],
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [localComments, setLocalComments] = useState(commentList);
  const hasHadComments = useRef(commentList.length > 0);
  const theme = useTheme();
  moment.locale("fr");

  useEffect(() => {
    if (!hasHadComments.current && commentList.length > 0) {
      setLocalComments(commentList);
      hasHadComments.current = true;
    }
  }, [commentList]);

  const handleCommentClick = async () => {
    if (!showComments && onComment) {
      setIsLoadingComments(true);
      try {
        await onComment();
      } finally {
        setIsLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleReply = async (reply: string) => {
    if (onReply) {
      setIsReplying(true);
      try {
        const newComment = await onReply(reply);
        setLocalComments([...localComments, newComment]);
      } finally {
        setIsReplying(false);
      }
    }
  };

  const handleRemoveComment = async (commentId: string) => {
    if (onRemoveComment) {
      try {
        await onRemoveComment(commentId);
        setLocalComments(
          localComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error("Error removing comment:", error);
      }
    }
  };

  return (
    <Card
      elevation={1}
      sx={{
        p: {
          xs: 2,
          sm: 3,
        },
        pl: {
          xs: 2,
          sm: 3,
        },
        pr: {
          xs: 2,
          sm: 3,
        },
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <ThreadHeader
        author={author}
        createdAt={createdAt}
        content={content}
        hashtags={hashtags}
      />

      <Divider sx={{ my: 2 }} />

      <ThreadActions
        likes={likes}
        comments={comments}
        shares={shares}
        isLoadingComments={isLoadingComments}
        onLike={onLike}
        onComment={handleCommentClick}
        onShare={onShare}
      />

      <Collapse in={showComments}>
        <CommentList
          comments={localComments}
          currentUser={currentUser}
          onReply={handleReply}
          isReplying={isReplying}
          onRemoveComment={handleRemoveComment}
          isAdmin={isAdmin}
        />
      </Collapse>
    </Card>
  );
};

export { ThreadHeader } from "./components/ThreadHeader";
export { ThreadActions } from "./components/ThreadActions";
export { ReplyForm } from "../CommentList/components/ReplyForm";
export * from "./types";
