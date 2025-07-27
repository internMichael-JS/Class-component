import { useCallback, useEffect, useReducer } from 'react';
import './App.css';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import { fetchPokemonByName } from './api/getOnePokemon.ts';
import { fetchAllPokemonsFromUrl } from './api/getAllPokemons.ts';
import type { OnePokemon, PokemonTypeSlot } from './utils/interfaces.ts';
import { initialState, reducer } from './app/appState.ts';
import { Outlet, useSearchParams } from 'react-router-dom';
import { AppContext } from './app/appContext.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const page = Number(searchParams.get('page')) || 1;

  const mapToPokemonCard = useCallback(
    (details: OnePokemon) => ({
      name: details.name,
      id: details.id,
      img: details.sprites.front_default,
      types: details.types.map((t: PokemonTypeSlot) => t.type.name).join(', '),
      experience: details.base_experience,
    }),
    []
  );

  const loadPage = useCallback(
    async (pageOrUrl: number | string) => {
      dispatch({ type: 'LOAD_START' });

      const url =
        typeof pageOrUrl === 'string'
          ? pageOrUrl
          : `https://pokeapi.co/api/v2/pokemon?offset=${(pageOrUrl - 1) * 20}&limit=20`;

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
              weight: details.weight,
              height: details.height,
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
        console.error(error);
        dispatch({
          type: 'LOAD_ERROR',
          payload: 'Failed to load pokemons',
        });
      }
    },
    [dispatch]
  );

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

        setSearchQuery(name.trim());
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unexpected error';

        dispatch({
          type: 'LOAD_ERROR',
          payload: errorMessage,
        });
      }
    },
    [dispatch, mapToPokemonCard, setSearchQuery]
  );

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    }

    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadPage(page);
    }
  }, [
    searchParams,
    setSearchParams,
    searchQuery,
    handleSearch,
    loadPage,
    page,
  ]);

  const handleNext = () => {
    if (state.next) {
      setSearchParams({ page: String(page + 1) });
    }
  };

  const handlePrevious = () => {
    if (state.prev && page > 1) {
      setSearchParams({ page: String(page - 1) });
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
