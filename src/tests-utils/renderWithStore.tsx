import { configureStore } from '@reduxjs/toolkit';
import type { State } from '../utils/interfaces';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import pokemonReducer from '../redux/pokemonLoadingSlice';
import likeReducer from '../redux/likePokemonSlice';
interface RootState {
  load: State;
}

export function renderWithStore(
  ui: React.ReactElement,
  preloadedState: RootState,
  options?: Omit<RenderOptions, 'queries'>
) {
  const store = configureStore({
    reducer: {
      load: pokemonReducer,
      like: likeReducer,
    },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>, options),
    store,
  };
}
