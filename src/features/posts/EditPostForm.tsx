import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/store';
import { useParams, useNavigate } from 'react-router-dom';
import { postUpdated } from './posts.slice';

export const EditPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useAppSelector((state) => state.posts.find((item) => item.id === postId));

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSavePostClicked = () => {
    if (title && content && postId) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};
