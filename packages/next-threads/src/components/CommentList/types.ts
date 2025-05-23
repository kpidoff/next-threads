import { Comment } from "../Thread";
import { User } from "@/types/types";

export interface ThreadCommentProps {
  comment: Comment;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, content: string) => Promise<void>;
  level?: number;
} 

export interface CommentListProps {
    comments: Comment[];
    currentUser: User;
    onReply?: (content: string) => Promise<void>;
    isReplying?: boolean;
    onRemoveComment?: (commentId: string) => Promise<void>;
    isAdmin?: boolean;
}
  