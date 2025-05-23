import { Comment } from "../Thread";
import { ThreadProps } from "../Thread/types";
import { User } from "@/types/types";

export type SortOption = 'newest' | 'oldest' | 'mostLiked' | 'mostCommented';

export interface ThreadListProps {
  threads: Omit<ThreadProps, "currentUser">[];
  onThreadLike?: (threadId: string) => void;
  onThreadComment?: (threadId: string) => Promise<void>;
  onThreadShare?: (threadId: string) => void;
  onThreadReply?: (threadId: string, content: string) => Promise<Comment>;
  onThreadRemoveComment?: (threadId: string, commentId: string) => Promise<void>;
  isAdmin?: boolean;
  currentUser: User;
} 