import { useAppContext } from '../../app/appContext';
import Loader from './Loader/Loader';
import './Main.css';
import PokemonList from './PokemonList/PokemonList';

const Main = () => {
  const { isLoading, error } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  return <PokemonList />;
};

export default Main;
