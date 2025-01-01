import axios from "axios";

export async function getPokemon(name: string) {
  try {
    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    return pokemon;
  } catch (error: any) {
    console.error("Error fetching pokemon:", error.message);
  }
}

export async function getPokemonSpecies(name: string) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${name}/`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching pokemon:", error.message);
  }
}
