import './PokemonList.css';
import Button from '../../../utils/Button';
import { useAppContext } from '../../../app/appContext';
import React from 'react';
import { PokemonDetails } from '../../PokemonDetails/PokemonDetails';
import { useSearchParams } from 'react-router-dom';

export const PokemonList = () => {
  const { pokemons, handlePrevious, handleNext, prev, next } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsId = searchParams.get('details');
  const selectedPokemon = pokemons.find((p) => p.id === Number(detailsId));

  return (
    <div className="list-wrapper">
      <div className="list-container">
        <h1>Pokémon List</h1>
        <div className="list-item">
          <div className="card-item">
            {pokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="pokemon-item"
                onClick={() => {
                  searchParams.set('details', pokemon.id.toString());
                  setSearchParams(searchParams);
                }}
              >
                <img
                  src={pokemon.img}
                  alt={pokemon.name}
                  className="pokemon-img"
                />
                <h4 className="pokemon-name">
                  <strong>{pokemon.name.toLocaleUpperCase()}</strong>
                </h4>
                <p className="pokemon-types">
                  <b>Type:</b> {pokemon.types}
                </p>
                <p className="pokemon-types">
                  <b>Experience:</b> {pokemon.experience}
                </p>
              </div>
            ))}
          </div>
          {selectedPokemon && (
            <PokemonDetails
              pokemon={selectedPokemon}
              onClose={() => {
                searchParams.delete('details');
                setSearchParams(searchParams);
              }}
            />
          )}
        </div>

        <div className="buttons-container">
          <Button onClick={handlePrevious} disabled={prev === null}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={next === null}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MemoizedPokemonList = React.memo(PokemonList);
