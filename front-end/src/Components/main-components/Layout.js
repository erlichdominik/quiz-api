import { Outlet } from 'react-router-dom';
import { QuizProvider } from '../../context/QuizProvider';
import Navbar from '../ui/Navbar';

const Layout = () => {
  return (
    <>
      <QuizProvider>
        <Outlet></Outlet>
      </QuizProvider>
    </>
  );
};

export default Layout;
