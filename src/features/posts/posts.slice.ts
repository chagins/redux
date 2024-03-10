import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents a post.
 */
interface Post {
  id: string;
  title: string;
  content: string;
}

/**
 * Represents the initial state of the posts slice.
 */
const initialState: Post[] = [];

/**
 * Represents the posts slice.
 */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<Post>) {
      state.push(action.payload);
    },
  },
});

/**
 * The reducer function for the posts slice.
 */
export const { reducer: postsReducer } = postsSlice;
export const { postAdded } = postsSlice.actions;
