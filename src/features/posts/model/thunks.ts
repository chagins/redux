import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from 'api/client';
import { InitialPost, Post } from 'lib/types';

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

export const addPost = createAsyncThunk<Post, InitialPost>(
  'posts/addPost',
  async (post: InitialPost) => {
    const response = await client.post('/fakeApi/posts', post);
    return response.data;
  }
);
