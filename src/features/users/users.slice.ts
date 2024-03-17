import { createSlice } from '@reduxjs/toolkit';
import { User } from 'lib/types';

/**
 * Represents the initial state of the users slice.
 */
const initialState: User[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
];

/**
 * Represents the users slice.
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const { reducer: usersReducer } = usersSlice;
