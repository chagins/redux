import { useAppDispatch, useAppSelector } from 'hooks/store';
import React, { useState } from 'react';
import { LoadingState } from 'lib/constants';
import { selectAllUsers } from 'features/users/model';
import { addPost } from './model';

export const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');
  const [requestStatus, setRequestStatus] = useState<LoadingState>(LoadingState.IDLE);

  const canSave = [title, content, user].every(Boolean) && requestStatus === LoadingState.IDLE;

  const usersOptions = users.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUser(e.target.value);

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus(LoadingState.LOADING);
        await dispatch(addPost({ title, content, user })).unwrap();
        setTitle('');
        setContent('');
        setUser('');
      } catch (error) {
        console.error('Error adding post', error);
      } finally {
        setRequestStatus(LoadingState.IDLE);
      }
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
        <select id="postAuthor" value={user} onChange={onAuthorChanged}>
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
