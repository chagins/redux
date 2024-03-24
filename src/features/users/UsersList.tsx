import React from 'react';
import { useAppSelector } from 'hooks/store';
import { Link } from 'react-router-dom';
import { selectAllUsers } from './model';

export const UsersList: React.FC = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};
