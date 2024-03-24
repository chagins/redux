import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from 'api/client';
import { User } from 'lib/types';

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.data;
});
