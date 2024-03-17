import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from 'features/posts';
import { usersReducer } from 'features/users';

/**
 * The Redux store instance.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
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
