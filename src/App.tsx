import { useCallback, useEffect, useReducer } from 'react';
import './App.css';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import { fetchPokemonByName } from './api/getOnePokemon.ts';
import { fetchAllPokemonsFromUrl } from './api/getAllPokemons.ts';
import type { OnePokemon, PokemonTypeSlot } from './utils/interfaces.ts';
import { initialState, reducer } from './app/appState.ts';
import { Outlet } from 'react-router-dom';
import { AppContext } from './app/appContext.ts';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mapToPokemonCard = (details: OnePokemon) => ({
    name: details.name,
    id: details.id,
    img: details.sprites.front_default,
    types: details.types.map((t: PokemonTypeSlot) => t.type.name).join(', '),
    experience: details.base_experience,
  });

  const loadPage = async (url: string) => {
    dispatch({ type: 'LOAD_START' });

    try {
      const data = await fetchAllPokemonsFromUrl(url);

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();

          return {
            name: details.name,
            id: details.id,
            img: details.sprites.front_default,
            types: details.types
              .map((t: PokemonTypeSlot) => t.type.name)
              .join(', '),
            experience: details.base_experience,
          };
        })
      );

      dispatch({
        type: 'LOAD_SUCCESS',
        payload: {
          pokemons: detailedPokemons,
          next: data.next,
          prev: data.previous,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOAD_ERROR',
        payload: 'Failed to load pokemons',
      });
    }
  };

  const handleSearch = useCallback(
    async (name: string) => {
      dispatch({ type: 'LOAD_START' });

      try {
        const details = await fetchPokemonByName(name);
        const pokemonCard = mapToPokemonCard(details);

        dispatch({
          type: 'LOAD_SUCCESS',
          payload: {
            pokemons: [pokemonCard],
            next: null,
            prev: null,
          },
        });

        localStorage.setItem('searchQuery', name.trim());
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unexpected error';

        dispatch({
          type: 'LOAD_ERROR',
          payload: errorMessage,
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      handleSearch(savedQuery);
    } else {
      loadPage('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    }
  }, [handleSearch]);

  const handleNext = () => {
    if (state.next) {
      loadPage(state.next);
    }
  };

  const handlePrevious = () => {
    if (state.prev) {
      loadPage(state.prev);
    }
  };

  return (
    <div className="app-container">
      <div className="item-container">
        <header>
          <Header onSearch={handleSearch} />
        </header>

        <main className="main">
          <AppContext
            value={{
              pokemons: state.pokemons,
              isLoading: state.isLoading,
              error: state.error,
              next: state.next,
              prev: state.prev,
              loadPage,
              handleNext,
              handlePrevious,
            }}
          >
            <Outlet />
          </AppContext>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default App;
