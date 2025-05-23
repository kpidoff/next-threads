import { ReactNode } from "react";
import { User } from "@/types/types";

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likes?: number;
}

export interface Hashtag {
  label: string;
  color: string;
}

export interface ThreadProps {
  id: string;
  author: User;
  content: ReactNode;
  createdAt: Date;
  likes?: number;
  comments?: number;
  shares?: number;
  commentList?: Comment[];
  onLike?: () => void;
  onComment?: () => Promise<void>;
  onShare?: () => void;
  onReply?: (content: string) => Promise<Comment>;
  onRemoveComment?: (commentId: string) => Promise<void>;
  isAdmin?: boolean;
  currentUser: User;
  hashtags?: Hashtag[];
}

export interface ThreadHeaderProps {
  author: User;
  createdAt: Date;
  content: ReactNode;
  hashtags?: Hashtag[];
}

export interface ThreadActionsProps {
  likes?: number;
  comments?: number;
  shares?: number;
  isLoadingComments?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export interface ReplyFormProps {
  currentUser: User;
  onSubmit: (content: string) => Promise<void>;
  disabled?: boolean;
}

export interface CommentListProps {
  comments: Comment[];
  currentUser: User;
  onReply: (content: string) => Promise<void>;
  isReplying?: boolean;
  onRemoveComment?: (commentId: string) => Promise<void>;
  isAdmin?: boolean;
} 