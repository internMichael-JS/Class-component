import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../utils/interfaces';

interface windowState {
  pokemons: Pokemon[];
  window: boolean;
}

export const initialState: windowState = {
  pokemons: [],
  window: false,
};

export const likePokemonSlice = createSlice({
  name: 'likePokemon',
  initialState,
  reducers: {
    addPokemon(state, action: PayloadAction<Pokemon>) {
      const exists = state.pokemons.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.pokemons.push(action.payload);
        state.window = true;
      }
    },
    removePokemon(state, action: PayloadAction<number>) {
      state.pokemons = state.pokemons.filter((p) => p.id !== action.payload);
      if (state.pokemons.length === 0) {
        state.window = false;
      }
    },
    clearPokemons(state) {
      state.pokemons = [];
      state.window = false;
    },
  },
});

export const { addPokemon, removePokemon, clearPokemons } =
  likePokemonSlice.actions;

export default likePokemonSlice.reducer;
