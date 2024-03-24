import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState, ReactionEmoji } from 'lib/constants';
import { Post, ReactionEmojiCount } from 'lib/types';
import { addPost, fetchPosts } from './thunks';

interface PostsSliceState {
  data: Post[];
  status: LoadingState;
  error: string | null;
}

const initialState: PostsSliceState = {
  data: [],
  status: LoadingState.IDLE,
  error: null,
};

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
        state.data.push(action.payload);
      },
      prepare(payload: Omit<Post, 'id' | 'date' | 'reactions'>) {
        const { title, content, user } = payload;
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user,
            date: new Date().toISOString(),
            reactions: { ...initialReactions },
          },
        };
      },
    },
    postUpdated: {
      reducer(state, action: PayloadAction<Post>) {
        const { id, title, content, date } = action.payload;
        const existingPost = state.data.find((post) => post.id === id);

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
      const existingPost = state.data.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingState.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = LoadingState.SUCCEEDED;
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = LoadingState.FAILED;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export const { reducer: postsReducer } = postsSlice;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
