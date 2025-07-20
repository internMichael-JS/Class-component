import { fetchAllPokemonsFromUrl } from './getAllPokemons';
import { vi, describe, expect, test } from 'vitest';

describe('fetchAllPokemonsFromUrl', () => {
  const mockUrl = 'https://pokeapi.co/api/v2/pokemon';

  test('returns data on successful response', async () => {
    const mockData = { results: [{ name: 'bulbasaur', url: '...' }] };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const data = await fetchAllPokemonsFromUrl(mockUrl);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
  });

  test('throws an error on unsuccessful response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchAllPokemonsFromUrl(mockUrl)).rejects.toThrow(
      'Failed to fetch pokemons'
    );
  });
});
