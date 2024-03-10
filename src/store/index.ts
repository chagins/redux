import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from 'features/posts';

/**
 * The Redux store instance.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

/**
 * The root state type of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The type of the dispatch function in the Redux store.
 */
export type AppDispatch = typeof store.dispatch;
