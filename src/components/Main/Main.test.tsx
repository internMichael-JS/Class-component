import { render, screen } from '@testing-library/react';
import Main from './Main';
import { describe, expect, test, vi } from 'vitest';
import { AppContext } from '../../app/appContext';

vi.mock('../common/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));
vi.mock('../PokemonList', () => ({
  default: () => <div data-testid="pokemon-list">Pokemons here</div>,
}));

const defaultProps = {
  pokemons: [],
  next: null,
  prev: null,
  loadPage: () => {},
  handleNext: () => {},
  handlePrevious: () => {},
  isLoading: false,
  error: null,
};

describe('Main component', () => {
  test('renders loader when isLoading is true', () => {
    render(
      <AppContext.Provider value={{ ...defaultProps, isLoading: true }}>
        <Main />
      </AppContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    render(
      <AppContext.Provider
        value={{ ...defaultProps, error: 'Something went wrong' }}
      >
        <Main />
      </AppContext.Provider>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('renders PokemonList when no loading or error', () => {
    render(
      <AppContext.Provider value={{ ...defaultProps }}>
        <Main />
      </AppContext.Provider>
    );
    expect(screen.getByText('Pokémon List')).toBeInTheDocument();
  });
});
