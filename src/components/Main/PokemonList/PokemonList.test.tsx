import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockPokemons = [
  { id: 1, name: 'Bulbasaur', img: 'img1.png', types: 'grass', experience: 64 },
  { id: 2, name: 'Charmander', img: 'img2.png', types: 'fire', experience: 62 },
];

const defaultProps = {
  pokemons: mockPokemons,
  isLoading: false,
  error: null,
  next: 'next-url',
  prev: 'prev-url',
  loadPage: vi.fn(),
  handlePrevious: vi.fn(),
  handleNext: vi.fn(),
};

describe('PocemonList component', () => {
  test('renders correct number of Pokémon items', () => {
    render(<PokemonList {...defaultProps} />);
    const items = screen.getAllByRole('heading', { level: 4 });
    expect(items).toHaveLength(2);
  });

  test('displays "no results" message when no Pokémon are available', () => {
    render(<PokemonList {...defaultProps} pokemons={[]} />);
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0);
  });

  test('correctly displays name, types, and experience', () => {
    render(<PokemonList {...defaultProps} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type: grass/i)).toBeInTheDocument();
    expect(screen.getByText(/experience: 64/i)).toBeInTheDocument();
  });

  test('handles missing data gracefully', () => {
    const incompleteData = [
      { id: 3, name: '', img: '', types: '', experience: 0 },
    ];
    render(<PokemonList {...defaultProps} pokemons={incompleteData} />);
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
    expect(screen.getByText(/experience: 0/i)).toBeInTheDocument();
  });

  test('Prev and Next buttons call appropriate handlers', async () => {
    render(<PokemonList {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /prev/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(defaultProps.handlePrevious).toHaveBeenCalled();
    expect(defaultProps.handleNext).toHaveBeenCalled();
  });

  test('Disables Prev button when no prev URL', () => {
    render(<PokemonList {...defaultProps} prev={null} />);
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });
});
