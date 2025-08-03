import './PokemonList.css';
import Button from '../../../utils/Button/Button';
import { useAppContext } from '../../../app/appContext';
import React from 'react';
import { PokemonDetails } from '../../PokemonDetails/PokemonDetails';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { PokemonCard } from './PokemonCard/PokemonCard';

export const PokemonList = () => {
  const load = useAppSelector((state) => state.load);
  const { handlePrevious, handleNext } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsId = searchParams.get('details');
  const selectedPokemon = load.pokemons.find((p) => p.id === Number(detailsId));

  return (
    <div className="list-wrapper">
      <div className="list-container">
        <h1>Pokémon List</h1>
        <div className="list-item">
          <div className="card-item">
            {load.pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
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
          <Button onClick={handlePrevious} disabled={load.prev === null}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={load.next === null}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MemoizedPokemonList = React.memo(PokemonList);
