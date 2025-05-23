import { useMemo, useState } from "react";

import { SortOption } from "../types";
import { ThreadProps } from "@/components/Thread/types";

export const useThreadSort = (threads: ThreadProps[]) => {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedThreads = useMemo(() => {
    return threads.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "mostLiked":
          return (b.likes || 0) - (a.likes || 0);
        case "mostCommented":
          return (Array.isArray(b.comments) ? b.comments.length : 0) - (Array.isArray(a.comments) ? a.comments.length : 0);
        default:
          return 0;
      }
    });
  }, [threads, sortBy]);

  return {
    sortBy,
    setSortBy,
    sortedThreads,
  };
}; 