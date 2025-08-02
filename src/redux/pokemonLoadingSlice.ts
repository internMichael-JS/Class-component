import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon, State } from '../utils/interfaces';

export const initialState: State = {
  pokemons: [],
  isLoading: false,
  error: null,
  next: null,
  prev: null,
};

export const pokemonLoadingSlice = createSlice({
  name: 'pokemonLoading',
  initialState,
  reducers: {
    loadStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadSuccess(
      state,
      action: PayloadAction<{
        pokemons: Pokemon[];
        next: string | null;
        prev: string | null;
      }>
    ) {
      state.pokemons = action.payload.pokemons;
      state.next = action.payload.next;
      state.prev = action.payload.prev;
      state.isLoading = false;
    },
    loadError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    searchSuccess(state, action: PayloadAction<Pokemon>) {
      state.pokemons = [action.payload];
      state.isLoading = false;
      state.error = null;
      state.next = null;
      state.prev = null;
    },
    resetError(state) {
      state.error = null;
    },
  },
});

export const { loadStart, loadSuccess, loadError, searchSuccess, resetError } =
  pokemonLoadingSlice.actions;

export default pokemonLoadingSlice.reducer;
