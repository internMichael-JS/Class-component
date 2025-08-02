import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../redux/pokemonLoadingSlice';

export const store = configureStore({
  reducer: {
    load: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
