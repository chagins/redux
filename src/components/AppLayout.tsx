import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};
