import { AppLayout } from 'components/AppLayout';
import { AddPostForm, PostsList } from 'features/posts';
import { Routes, Route } from 'react-router-dom';

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
      </Route>
    </Routes>
  );
};
