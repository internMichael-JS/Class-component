import { Outlet } from 'react-router-dom';
import Loader from './Loader/Loader';
import './Main.css';
import { useAppSelector } from '../../hooks/reduxHooks';

const Main = () => {
  const load = useAppSelector((state) => state.load);

  if (load.isLoading) {
    return <Loader />;
  }

  if (load.error) {
    return <p style={{ color: 'red' }}>{load.error}</p>;
  }
  return (
    <div className="list-section">
      <Outlet />
    </div>
  );
};

export default Main;
