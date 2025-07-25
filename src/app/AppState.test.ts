import { describe, expect, test } from 'vitest';
import { reducer, initialState, type Action } from './appState';
import type { Pokemon } from '../utils/interfaces';

const mockPokemon: Pokemon = {
  name: 'pikachu',
  id: 1,
  img: 'image-url',
  types: 'electric',
  experience: 112,
};
const mockPokemons: Pokemon[] = [mockPokemon];

describe('appReducer', () => {
  test('should handle LOAD_START', () => {
    const action: Action = { type: 'LOAD_START' };
    const result = reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  test('should handle LOAD_SUCCESS', () => {
    const action: Action = {
      type: 'LOAD_SUCCESS',
      payload: {
        pokemons: mockPokemons,
        next: 'next-url',
        prev: 'prev-url',
      },
    };

    const result = reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      pokemons: mockPokemons,
      next: 'next-url',
      prev: 'prev-url',
      isLoading: false,
    });
  });

  test('should handle SEARCH_SUCCESS', () => {
    const action: Action = {
      type: 'SEARCH_SUCCESS',
      payload: mockPokemon,
    };

    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      pokemons: [mockPokemon],
      next: null,
      prev: null,
      isLoading: false,
      error: null,
    });
  });

  test('should handle LOAD_ERROR', () => {
    const action: Action = {
      type: 'LOAD_ERROR',
      payload: 'Something went wrong',
    };
    const result = reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      error: 'Something went wrong',
      isLoading: false,
    });
  });

  test('should return the same state for unknown action', () => {
    const action = { type: 'UNKNOWN' } as never;
    const result = reducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
