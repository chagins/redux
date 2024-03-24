export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (id: string) => (state: RootState) =>
  state.users.find((user) => user.id === id);
