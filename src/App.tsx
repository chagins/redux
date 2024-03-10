import { AppLayout } from 'components/AppLayout';
import { AddPostForm, EditPostForm, PostsList, SinglePostPage } from 'features/posts';
import { Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <>
              <AddPostForm />
              <PostsList />
            </>
          }
        />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/editPost/:postId" element={<EditPostForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
