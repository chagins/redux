import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from 'api/client';
import { Post } from 'lib/types';

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});
