import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../redux/pokemonLoadingSlice';
import themeReducer from '../redux/themeSlice';

export const store = configureStore({
  reducer: {
    load: pokemonReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
