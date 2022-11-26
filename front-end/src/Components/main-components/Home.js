import { Link } from 'react-router-dom';
import Navbar from '../ui/Navbar';

const Home = () => {
  return (
    <section>
      <Navbar />
      <h1 className="text-5xl text-center">Welcome to the home page</h1>
    </section>
  );
};

export default Home;
