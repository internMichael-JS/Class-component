export interface Pokemon {
  experience: number;
  name: string;
  img: string;
  types: string;
  id: number;
  height?: number;
  weight?: number;
}
export interface OnePokemon {
  base_experience: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonTypeSlot[];
  id: number;
}
export interface State {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  next: string | null;
  prev: string | null;
}
export type PokemonTypeSlot = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonTypeSlot[];
  base_experience: number;
}

export interface AppContextProps {
  loadPage: (url: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}
