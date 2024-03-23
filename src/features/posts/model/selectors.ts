export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, postId: string | undefined) =>
  state.posts.data.find((post) => post.id === postId);
