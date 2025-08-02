import type { OnePokemon, PokemonTypeSlot } from '../utils/interfaces';

export const mapToPokemonCard = (details: OnePokemon) => ({
  name: details.name,
  id: details.id,
  img: details.sprites.front_default,
  types: details.types.map((t: PokemonTypeSlot) => t.type.name).join(', '),
  experience: details.base_experience,
});
