import React from 'react';
import './PokemonList.css';
import Button from '../../../utils/Button';
import type { Pokemon } from '../../../utils/interfaces';

type PokemonListProps = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  next: string | null;
  prev: string | null;
  loadPage: (url: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
};

class PokemonList extends React.Component<PokemonListProps> {
  render() {
    const { pokemons, handlePrevious, handleNext } = this.props;
    return (
      <div>
        <h1>Pokémon List</h1>
        <div className="list-item">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-item">
              <img
                src={pokemon.img}
                alt={pokemon.name}
                className="pokemon-img"
              />
              <h4 className="pokemon-name">{pokemon.name}</h4>
              <p className="pokemon-types">Type: {pokemon.types}</p>
              <p className="pokemon-types">Experience: {pokemon.experience}</p>
            </div>
          ))}
        </div>

        <div className="buttons-container">
          <Button onClick={handlePrevious} disabled={this.props.prev === null}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={this.props.next === null}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default PokemonList;
