import { useAppDispatch, useAppSelector } from 'hooks/store';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingState } from 'lib/constants';
import { Post } from 'lib/types';
import { Spinner } from 'components/Spinner';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectAllPosts, fetchPosts } from './model';

const PostExcerpt: React.FC<{ post: Post }> = ({ post }) => {
  const { id, title, user, date, content } = post;

  return (
    <article className="post-excerpt" key={id}>
      <h3>{title}</h3>
      <PostAuthor userId={user} />
      <TimeAgo timestamp={date} />
      <p className="post-content">{content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: posts } = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === LoadingState.IDLE) {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  const getContent = () => {
    switch (postStatus) {
      case LoadingState.FAILED:
        return <div>Failed to load posts.</div>;
      case LoadingState.SUCCEEDED:
        return posts
          .toSorted((a, b) => b.date.localeCompare(a.date))
          .map((post) => <PostExcerpt key={post.id} post={post} />);
      case LoadingState.LOADING:
      default:
        return <Spinner text="Loading..." />;
    }
  };

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {getContent()}
    </section>
  );
};
