import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonDetails } from './PokemonDetails';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  img: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
  types: 'grass',
  experience: 64,
  weight: 69,
  height: 7,
};

describe('PokemonDetails component', () => {
  test('renders all Pokémon details', () => {
    render(<PokemonDetails pokemon={mockPokemon} onClose={() => {}} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', mockPokemon.img);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/experience:/i)).toBeInTheDocument();
    expect(screen.getByText(/64/i)).toBeInTheDocument();
    expect(screen.getByText(/weight:/i)).toBeInTheDocument();
    expect(screen.getByText(/69/i)).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
  });

  test('calls onClose when ✖ button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(<PokemonDetails pokemon={mockPokemon} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: /✖/i });
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
