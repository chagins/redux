import { AppLayout } from 'components/AppLayout';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <section>
              <h2>Welcome to the Redux Essentials example app!</h2>
            </section>
          }
        />
      </Route>
    </Routes>
  );
};
