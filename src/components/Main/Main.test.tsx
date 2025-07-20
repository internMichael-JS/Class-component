import { render, screen } from '@testing-library/react';
import Main from './Main';
import { describe, expect, test, vi } from 'vitest';

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
    render(<Main {...defaultProps} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    render(<Main {...defaultProps} error="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('renders PokemonList when no loading or error', () => {
    render(<Main {...defaultProps} />);
    expect(screen.getByText('Pokémon List')).toBeInTheDocument();
  });
});
