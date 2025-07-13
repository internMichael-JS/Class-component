export type PokemonResult = {
  name: string;
  id: number;
  type: string;
  image: string;
};

export async function fetchPokemonByName(name: string): Promise<PokemonResult> {
  const trimmed = name.trim().toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${trimmed}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Pokemon not found(status ${response.status})`);
  }

  const data = await response.json();

  return data;
}
