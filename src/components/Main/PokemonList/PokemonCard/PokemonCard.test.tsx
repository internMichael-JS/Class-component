import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContext } from '../../../../app/appContext';
import { store } from '../../../../app/store';
import { PokemonCard } from './PokemonCard';
import { describe, expect, test, vi } from 'vitest';
import { mockContext } from '../../../../tests-utils/mockContext';

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  types: 'electric',
  experience: 112,
  height: 4,
  weight: 60,
  img: 'https://example.com/pikachu.png',
};

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

const renderCard = () => {
  render(
    <Provider store={store}>
      <AppContext value={mockContext}>
        <MemoryRouter>
          <PokemonCard
            pokemon={mockPokemon}
            searchParams={mockSearchParams}
            setSearchParams={mockSetSearchParams}
          />
        </MemoryRouter>
      </AppContext>
    </Provider>
  );
};

describe('PokemonCard', () => {
  test('renders pokemon data', () => {
    renderCard();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Type:/)).toBeInTheDocument();
    expect(screen.getByText(/Experience:/)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      mockPokemon.img
    );
  });

  test('toggles like on button click', () => {
    renderCard();
    const button = screen.getByRole('button', { name: /like/i });
    fireEvent.click(button);
    expect(
      store.getState().like.pokemons.some((p) => p.id === mockPokemon.id)
    ).toBe(true);

    fireEvent.click(button);
    expect(
      store.getState().like.pokemons.some((p) => p.id === mockPokemon.id)
    ).toBe(false);
  });
});
