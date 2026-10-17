const API_BASE_URL = "https://pokeapi.co/api/v2";
const SAVED_POKEMON_KEY = "pokedexter:saved-pokemon";

async function readResponse(response) {
  if (!response.ok) {
    throw new Error(`La solicitud a la Pokédex falló (${response.status}).`);
  }
  return response.json();
}

export async function fetchPokemonList({ limit = 24, signal } = {}) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=0`,
    { signal },
  );
  const data = await readResponse(response);

  return data.results.map(({ name, url }) => {
    const id = Number(url.split("/").filter(Boolean).pop());
    return { id, name };
  });
}

export async function fetchPokemon(name, signal) {
  const response = await fetch(
    `${API_BASE_URL}/pokemon/${encodeURIComponent(name.toLowerCase())}`,
    { signal },
  );
  return readResponse(response);
}

export function getPokemonArtwork(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getSavedPokemon() {
  const savedPokemon = localStorage.getItem(SAVED_POKEMON_KEY);
  if (!savedPokemon) {
    return [];
  }

  const parsedPokemon = JSON.parse(savedPokemon);
  if (
    !Array.isArray(parsedPokemon) ||
    parsedPokemon.some(
      (pokemon) =>
        !Number.isInteger(pokemon.id) || typeof pokemon.name !== "string",
    )
  ) {
    throw new Error("La lista de Pokémon guardados no tiene un formato válido.");
  }

  return parsedPokemon;
}

export function savePokemon(pokemon) {
  const savedPokemon = getSavedPokemon();
  if (!savedPokemon.some((saved) => saved.id === pokemon.id)) {
    localStorage.setItem(
      SAVED_POKEMON_KEY,
      JSON.stringify([...savedPokemon, { id: pokemon.id, name: pokemon.name }]),
    );
  }
}

export function removeSavedPokemon(id) {
  const savedPokemon = getSavedPokemon().filter((pokemon) => pokemon.id !== id);
  localStorage.setItem(SAVED_POKEMON_KEY, JSON.stringify(savedPokemon));
  return savedPokemon;
}
