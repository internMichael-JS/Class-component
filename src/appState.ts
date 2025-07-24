import type { Pokemon, State } from './utils/interfaces';

export const initialState: State = {
  pokemons: [],
  isLoading: false,
  error: null,
  next: null,
  prev: null,
};

export type Action =
  | { type: 'LOAD_START' }
  | {
      type: 'LOAD_SUCCESS';
      payload: {
        pokemons: Pokemon[];
        next: string | null;
        prev: string | null;
      };
    }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SEARCH_SUCCESS'; payload: Pokemon }
  | { type: 'RESET_ERROR' };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        pokemons: action.payload.pokemons,
        next: action.payload.next,
        prev: action.payload.prev,
        isLoading: false,
      };
    case 'LOAD_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SEARCH_SUCCESS':
      return {
        pokemons: [action.payload],
        isLoading: false,
        error: null,
        next: null,
        prev: null,
      };
    case 'RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}
