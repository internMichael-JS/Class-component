import { render, screen } from '@testing-library/react';
import Main from './Main';
import { describe, expect, test, vi } from 'vitest';
import { AppContext } from '../../app/appContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonList } from './PokemonList/PokemonList';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { renderWithStore } from '../../tests-utils/renderWithStore.tsx';

const defaultProps = {
  loadPage: () => {},
  handleNext: () => {},
  handlePrevious: () => {},
};

vi.mock('../common/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));
vi.mock('../PokemonList', () => ({
  default: () => <div data-testid="pokemon-list">Pokemons here</div>,
}));

describe('Main component', () => {
  test('renders loader when isLoading is true', () => {
    renderWithStore(<Main />, {
      load: {
        pokemons: [],
        isLoading: true,
        error: null,
        next: null,
        prev: null,
      },
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    renderWithStore(<Main />, {
      load: {
        pokemons: [],
        isLoading: false,
        error: 'something went wrong',
        next: null,
        prev: null,
      },
    });
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('renders PokemonList when no loading or error', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <AppContext.Provider value={{ ...defaultProps }}>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route index element={<PokemonList />} />
              </Route>
            </Routes>
          </AppContext.Provider>
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Pokémon List/i)).toBeInTheDocument();
  });
});
