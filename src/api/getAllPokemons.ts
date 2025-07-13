export const fetchAllPokemonsFromUrl = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemons');
  }
  return response.json();
};
