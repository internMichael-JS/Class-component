import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { AppContext } from '../../../app/appContext';
import { PokemonList } from './PokemonList';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { renderWithStore } from '../../../tests-utils/renderWithStore';

const mockPokemons = [
  { id: 1, name: 'Bulbasaur', img: 'img1.png', types: 'grass', experience: 64 },
  { id: 2, name: 'Charmander', img: 'img2.png', types: 'fire', experience: 62 },
];

const defaultProps = {
  theme: 'light',
  toggleTheme: vi.fn(),
  loadPage: vi.fn(),
  handlePrevious: vi.fn(),
  handleNext: vi.fn(),
};

describe('PocemonList component', () => {
  test('renders correct number of Pokémon items', () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <AppContext value={defaultProps}>
          <PokemonList />
        </AppContext>
      </MemoryRouter>,
      {
        load: {
          pokemons: mockPokemons,
          isLoading: true,
          error: null,
          next: null,
          prev: null,
        },
      }
    );
    const items = screen.getAllByRole('heading', { level: 4 });
    expect(items).toHaveLength(2);
  });

  test('displays "no results" message when no Pokémon are available', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppContext.Provider value={{ ...defaultProps }}>
            <PokemonList />
          </AppContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0);
  });

  test('correctly displays name, types, and experience', () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={defaultProps}>
          <PokemonList />
        </AppContext.Provider>
      </MemoryRouter>,
      {
        load: {
          pokemons: mockPokemons,
          isLoading: true,
          error: null,
          next: null,
          prev: null,
        },
      }
    );
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/64/i)).toBeInTheDocument();
  });

  test('handles missing data gracefully', () => {
    const incompleteData = [
      { id: 3, name: '', img: '', types: '', experience: 0 },
    ];
    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={defaultProps}>
          <PokemonList />
        </AppContext.Provider>
      </MemoryRouter>,
      {
        load: {
          pokemons: incompleteData,
          isLoading: true,
          error: null,
          next: null,
          prev: null,
        },
      }
    );
    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience:/i)).toBeInTheDocument();
  });

  test('Prev and Next buttons call appropriate handlers', async () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={defaultProps}>
          <PokemonList />
        </AppContext.Provider>
      </MemoryRouter>,
      {
        load: {
          pokemons: mockPokemons,
          isLoading: false,
          error: null,
          next: 'next-url',
          prev: 'prev-url',
        },
      }
    );
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /prev/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(defaultProps.handlePrevious).toHaveBeenCalled();
    expect(defaultProps.handleNext).toHaveBeenCalled();
  });

  test('Disables Prev button when no prev URL', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <AppContext.Provider value={{ ...defaultProps }}>
            <PokemonList />
          </AppContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });

  vi.mock('react-router-dom', async () => {
    const actual =
      await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
    return {
      ...actual,
      useSearchParams: vi.fn(() => {
        const params = new URLSearchParams();
        const setSearchParams = vi.fn();
        return [params, setSearchParams];
      }),
    };
  });

  test('calls setSearchParams with correct ID when Pokémon card is clicked', async () => {
    const user = userEvent.setup();

    const setSearchParams = vi.fn();
    const params = new URLSearchParams();

    (useSearchParams as unknown as Mock).mockReturnValue([
      params,
      setSearchParams,
    ]);

    renderWithStore(
      <MemoryRouter>
        <AppContext.Provider value={defaultProps}>
          <PokemonList />
        </AppContext.Provider>
      </MemoryRouter>,
      {
        load: {
          pokemons: mockPokemons,
          isLoading: false,
          error: null,
          next: null,
          prev: null,
        },
      }
    );

    const card = screen.getByRole('heading', { name: /bulbasaur/i });
    await user.click(card);

    expect(setSearchParams).toHaveBeenCalled();
    expect(setSearchParams.mock.calls[0][0].get('details')).toBe('1');
  });

  test('renders PokemonDetails when details param is present and matches a Pokemon', async () => {
    renderWithStore(
      <MemoryRouter initialEntries={['/?details=1']}>
        <AppContext.Provider value={defaultProps}>
          <PokemonList />
        </AppContext.Provider>
      </MemoryRouter>,
      {
        load: {
          pokemons: mockPokemons,
          isLoading: false,
          error: null,
          next: null,
          prev: null,
        },
      }
    );

    expect(
      await screen.findByRole('button', { name: /✖/ })
    ).toBeInTheDocument();
  });
});
