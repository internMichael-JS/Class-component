import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import * as api from './api/getAllPokemons';
import * as getOne from './api/getOnePokemon';
import userEvent from '@testing-library/user-event';

const mockAllPokemons = {
  count: 1302,
  results: [
    {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    },
  ],
  next: null,
  previous: null,
};

const mockDetails = {
  name: 'pikachu',
  id: 25,
  sprites: {
    front_default: 'pikachu.png',
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  base_experience: 112,
};

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('App component', () => {
  test('Makes initial API call on component mount', async () => {
    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue(mockAllPokemons);
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);
    await screen.findByText(/Find your pokemon/i);
    await screen.findByText(/pikachu/i);
  });

  test('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchQuery', 'pikachu');

    vi.spyOn(getOne, 'fetchPokemonByName').mockResolvedValue(mockDetails);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  test('overwrites existing searchQuery in localStorage when performing new search via UI', async () => {
    localStorage.setItem('searchQuery', 'bulbasaur');

    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue(mockAllPokemons);
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);
    const input = await screen.findByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'pikachu');

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

    expect(localStorage.getItem('searchQuery')).toBe('pikachu');
  });

  test('saves trimmed search query in localStorage on search button click', async () => {
    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue(mockAllPokemons);
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, ' pikachu ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('pikachu');
  });

  test('renders searched pokemon with trimmed value', async () => {
    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue(mockAllPokemons);
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '   pikachu   ');
    await userEvent.click(button);

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  });

  test('handles error when fetchAllPokemonsFromUrl fails', async () => {
    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockRejectedValue(
      new Error('API down')
    );

    render(<App />);

    expect(
      await screen.findByText(/failed to load pokemons/i)
    ).toBeInTheDocument();
  });

  test('shows error message when search fails (handleSearch catch)', async () => {
    vi.spyOn(getOne, 'fetchPokemonByName').mockRejectedValue(
      new Error('Pokemon not found (status 404)')
    );

    render(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'invalidpokemon');
    await userEvent.click(button);

    expect(await screen.findByText(/pokemon not found/i)).toBeInTheDocument();
  });

  test('rendered card has correct fields from mapToPokemonCard', async () => {
    const mockDetails = {
      name: 'pikachu',
      id: 25,
      sprites: { front_default: 'pikachu.png' },
      types: [{ slot: 1, type: { name: 'electric', url: 'url' } }],
      base_experience: 112,
    };

    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue({
      count: 1,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    });

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);
    const input = await screen.findByPlaceholderText(/search/i);
    await userEvent.type(input, 'pikachu');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/112/)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  test('clicking Next button triggers loadPage with next url', async () => {
    const mockNextUrl = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';

    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue({
      count: 1,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
      next: mockNextUrl,
      previous: null,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);
    const nextBtn = await screen.findByRole('button', { name: /next/i });
    await userEvent.click(nextBtn);
  });

  test('clicking Previous button triggers loadPage with previous url', async () => {
    const mockPrevUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue({
      count: 1,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
      next: null,
      previous: mockPrevUrl,
    });

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);
    const prevBtn = await screen.findByRole('button', { name: /prev/i });
    await userEvent.click(prevBtn);
  });
});
