import { useAppSelector } from 'hooks/store';
import React from 'react';

interface PostAuthorProps {
  userId: string;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const author = useAppSelector((state) => state.users.find((user) => user.id === userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
