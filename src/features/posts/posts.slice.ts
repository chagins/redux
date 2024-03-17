import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ReactionEmoji } from 'lib/constants';
import { Post, ReactionEmojiCount } from 'lib/types';

/**
 * Represents the initial state of the posts slice.
 */
const initialState: Post[] = [];

const initialReactions: ReactionEmojiCount = {
  eyes: 0,
  heart: 0,
  hooray: 0,
  rocket: 0,
  thumbsUp: 0,
};

/**
 * Represents the posts slice.
 */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(payload: Omit<Post, 'id' | 'date' | 'reactions'>) {
        const { title, content, userId } = payload;
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: { ...initialReactions },
          },
        };
      },
    },
    postUpdated: {
      reducer(state, action: PayloadAction<Post>) {
        const { id, title, content, date } = action.payload;
        const existingPost = state.find((post) => post.id === id);

        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
          existingPost.date = date;
        }
      },
      prepare(payload: Omit<Post, 'date'>) {
        return {
          payload: {
            ...payload,
            date: new Date().toISOString(),
          },
        };
      },
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionEmoji }>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
});

export const { reducer: postsReducer } = postsSlice;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
