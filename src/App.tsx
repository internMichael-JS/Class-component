import { useCallback, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import { fetchPokemonByName } from './api/getOnePokemon.ts';
import { fetchAllPokemonsFromUrl } from './api/getAllPokemons.ts';
import type { PokemonTypeSlot } from './utils/interfaces.ts';

import { Outlet, useSearchParams } from 'react-router-dom';
import { AppContext } from './app/appContext.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks.ts';
import {
  loadError,
  loadStart,
  loadSuccess,
} from './redux/pokemonLoadingSlice.ts';
import { mapToPokemonCard } from './app/mapPokemonCard.ts';

const App = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const load = useAppSelector((state) => state.load);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const page = Number(searchParams.get('page')) || 1;

  const loadPage = useCallback(
    async (pageOrUrl: number | string) => {
      dispatch(loadStart());

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
        dispatch(
          loadSuccess({
            pokemons: detailedPokemons,
            next: data.next,
            prev: data.previous,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(loadError('Failed to load pokemons'));
      }
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    async (name: string) => {
      dispatch(loadStart());

      try {
        const details = await fetchPokemonByName(name);
        const pokemonCard = mapToPokemonCard(details);
        dispatch(
          loadSuccess({
            pokemons: [pokemonCard],
            next: null,
            prev: null,
          })
        );

        setSearchQuery(name.trim());
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unexpected error';
        dispatch(loadError(errorMessage));
      }
    },
    [dispatch, setSearchQuery]
  );

  useEffect(() => {
    document.body.className = theme;
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
    theme,
  ]);

  const handleNext = () => {
    if (load.next) {
      setSearchParams({ page: String(page + 1) });
    }
  };

  const handlePrevious = () => {
    if (load.prev && page > 1) {
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
