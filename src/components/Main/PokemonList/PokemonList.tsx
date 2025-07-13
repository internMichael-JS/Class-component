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
            <div
              key={pokemon.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                margin: '7px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                width: '150px',
              }}
            >
              <img
                src={pokemon.img}
                alt={pokemon.name}
                style={{ width: '80px', height: '80px' }}
              />
              <h4 style={{ margin: '8px 0 4px' }}>{pokemon.name}</h4>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Type: {pokemon.types}
              </p>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Experience: {pokemon.experience}
              </p>
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
