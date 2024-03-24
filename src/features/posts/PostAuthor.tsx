import { selectUserById } from 'features/users/model';
import { useAppSelector } from 'hooks/store';
import React from 'react';

interface PostAuthorProps {
  userId: string;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const author = useAppSelector(selectUserById(userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
