import axios from "axios";

export async function getPokemons() {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const data = response.data;
  // console.log(JSONstringify(data, null, 2));
  return data;
}
