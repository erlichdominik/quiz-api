import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section>
      <h1 className="text-5xl">Welcome to the home page</h1>
      <div>
        <Link to="/quiz">Start a quiz</Link>
      </div>
    </section>
  );
};

export default Home;
