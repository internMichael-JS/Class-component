import Loader from './Loader/Loader';
import './Main.css';
import PokemonList from './PokemonList/PokemonList';
import type { Pokemon } from '../../utils/interfaces';

type MainProps = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  next: string | null;
  prev: string | null;
  loadPage: (url: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
};

const Main = (props: MainProps) => {
  const { isLoading, error } = props;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  return <PokemonList {...props} />;
};

export default Main;
