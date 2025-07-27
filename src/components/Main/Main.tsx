import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../app/appContext';
import Loader from './Loader/Loader';
import './Main.css';

const Main = () => {
  const { isLoading, error } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  return (
    <div className="list-section">
      <Outlet />
    </div>
  );
};

export default Main;
