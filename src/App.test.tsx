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

  test('overwrites existing localStorage value on new search', async () => {
    localStorage.setItem('searchQuery', 'oldvalue');
    const mockDetails = {
      name: 'newvalue',
      id: 100,
      sprites: {
        front_default: 'newvalue.png',
      },
      types: [
        {
          slot: 1,
          type: {
            name: 'normal',
            url: 'https://pokeapi.co/api/v2/type/13/',
          },
        },
      ],
      base_experience: 99,
    };

    vi.spyOn(api, 'fetchAllPokemonsFromUrl').mockResolvedValue(mockAllPokemons);
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockDetails,
    } as Response);

    render(<App />);

    const input = await screen.findByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'newvalue');
    await userEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('newvalue');
  });
});
