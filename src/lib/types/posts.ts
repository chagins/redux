import { ReactionEmoji } from 'lib/constants';

/**
 * Represents a post.
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: ReactionEmojiCount;
}

export type ReactionEmojiValues = Record<ReactionEmoji, string>;
export type ReactionEmojiCount = Record<ReactionEmoji, number>;
