import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../redux/pokemonLoadingSlice';
import themeReducer from '../redux/themeSlice';
import likeReducer from '../redux/likePokemonSlice';

export const store = configureStore({
  reducer: {
    load: pokemonReducer,
    theme: themeReducer,
    like: likeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
