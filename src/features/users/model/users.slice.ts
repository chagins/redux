import { createSlice } from '@reduxjs/toolkit';
import { User } from 'lib/types';
import { fetchUsers } from './thunks';

/**
 * Represents the initial state of the users slice.
 */
const initialState: User[] = [];

/**
 * Represents the users slice.
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export const { reducer: usersReducer } = usersSlice;
