import { useAppDispatch, useAppSelector } from 'hooks/store';
import React, { useState } from 'react';
import { postAdded } from './model';

export const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (canSave) {
      dispatch(postAdded({ title, content, userId }));

      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="" />
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
