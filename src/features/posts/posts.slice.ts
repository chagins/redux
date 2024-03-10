import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

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
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(payload: Omit<Post, 'id'>) {
        const { title, content } = payload;
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { reducer: postsReducer } = postsSlice;
export const { postAdded, postUpdated } = postsSlice.actions;
