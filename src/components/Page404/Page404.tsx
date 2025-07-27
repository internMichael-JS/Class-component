import { Link } from 'react-router-dom';
import './Page404.css';

const Page404 = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-text">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="notfound-button">
        Go to Search page
      </Link>
    </div>
  );
};

export default Page404;
