import { fetchPokemonByName } from './getOnePokemon';
import { vi, describe, expect, test } from 'vitest';

describe('fetchPokemonByName', () => {
  const name = 'pikachu';
  const mockUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

  test('returns data on successful response', async () => {
    const mockData = { name: 'pikachu', id: 25 };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const data = await fetchPokemonByName(name);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
  });

  test('throws an error if the pokemon is not found', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchPokemonByName(name)).rejects.toThrow(
      'Pokemon not found(status 404)'
    );
  });
});
