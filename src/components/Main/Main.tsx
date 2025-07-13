import React from 'react';
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

class Main extends React.Component<MainProps> {
  render() {
    const { pokemons, isLoading, error } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }
    console.log(pokemons);
    return <PokemonList {...this.props} />;
  }
}

export default Main;
