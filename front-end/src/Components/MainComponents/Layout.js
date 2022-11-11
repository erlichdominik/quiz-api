import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <h1 className="text-2xl text-red-500">Layout component</h1>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
