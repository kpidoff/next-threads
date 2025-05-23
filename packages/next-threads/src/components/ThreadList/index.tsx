import { Box } from "@mui/material";
import React from "react";
import { SortSelector } from "./components/SortSelector";
import { Thread } from "../Thread";
import { ThreadListProps } from "./types";
import { useThreadSort } from "./hooks/useThreadSort";

export const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  onThreadLike,
  onThreadComment,
  onThreadShare,
  onThreadReply,
  onThreadRemoveComment,
  isAdmin = false,
  currentUser,
}) => {
  const { sortBy, setSortBy, sortedThreads } = useThreadSort(
    threads.map((thread) => ({
      ...thread,
      currentUser,
    }))
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <SortSelector value={sortBy} onChange={setSortBy} />
      {sortedThreads.map((thread) => (
        <Thread
          key={thread.id}
          hashtags={thread.hashtags}
          {...thread}
          {...(onThreadLike && { onLike: () => onThreadLike(thread.id) })}
          {...(onThreadComment && {
            onComment: async () => await onThreadComment(thread.id),
          })}
          {...(onThreadShare && { onShare: () => onThreadShare(thread.id) })}
          onReply={
            onThreadReply
              ? async (content: string) =>
                  await onThreadReply(thread.id, content)
              : undefined
          }
          onRemoveComment={
            onThreadRemoveComment
              ? async (commentId: string) =>
                  await onThreadRemoveComment(thread.id, commentId)
              : undefined
          }
          isAdmin={isAdmin}
          currentUser={currentUser}
        />
      ))}
    </Box>
  );
};
