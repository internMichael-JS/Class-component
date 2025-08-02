import { configureStore } from '@reduxjs/toolkit';
import type { State } from '../utils/interfaces';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import pokemonReducer from '../redux/pokemonLoadingSlice';

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
    },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>, options),
    store,
  };
}
