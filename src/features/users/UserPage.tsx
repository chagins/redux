import React from 'react';
import { useAppSelector } from 'hooks/store';
import { useParams, Link } from 'react-router-dom';
import { selectAllPosts } from 'features/posts/model';
import { selectUserById } from './model';

export const UserPage: React.FC = () => {
  const { userId } = useParams();
  const user = useAppSelector(selectUserById(userId || ''));
  const posts = useAppSelector(selectAllPosts).data.filter((post) => post.user === userId);
  const renderedPostTitles = posts.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>{renderedPostTitles}</ul>
    </section>
  );
};
