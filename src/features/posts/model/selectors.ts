export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (postId: string | undefined) => (state: RootState) =>
  state.posts.data.find((post) => post.id === postId);
