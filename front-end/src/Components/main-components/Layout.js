import { Outlet } from 'react-router-dom';
import { QuizProvider } from '../../context/QuizProvider';

const Layout = () => {
  return (
    <>
      <h1 className="text-2xl text-red-500">Layout component</h1>
      <QuizProvider>
        <Outlet></Outlet>
      </QuizProvider>
    </>
  );
};

export default Layout;
