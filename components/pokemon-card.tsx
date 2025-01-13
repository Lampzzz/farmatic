import { getPokemon, getPokemonSpecies } from "@/api/get-pokemon";
import { PokemonCardProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { PokemonTypesList } from "./pokemon-types";
import { useRouter } from "next/navigation";

export function PokemonCard({ pokemon }: { pokemon: PokemonCardProps }) {
  const { push } = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ["pokemon", pokemon.name],
    queryFn: () => getPokemon(pokemon.name),
  });

  const {
    isPending: isPendingSpecies,
    error: errorSpecies,
    data: pokemonSpecies,
  } = useQuery({
    queryKey: ["pokemon-species", pokemon.name],
    queryFn: () => getPokemonSpecies(pokemon.name),
  });

  const pokemonOrder = String(data?.data.order).padStart(3, "0");
  const pokemonDescription = pokemonSpecies?.flavor_text_entries[0].flavor_text;

  const handleClick = (pokemonName: string) => {
    push(`/pokemon/${pokemonName}`);
  };

  return (
    <button
      className="p-4 rounded-lg bg-white shadow z-10"
      onClick={() => handleClick(pokemon.name)}
    >
      <div className="flex items-center justify-between">
        <PokemonTypesList pokemonTypes={data?.data.types} />
        <p className="text-black text-lg font-bold"># {pokemonOrder}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1 text-left">
          <h1 className="text-black font-bold capitalize text-xl mb-2">
            {pokemon.name}
          </h1>
          <p className="text-gray-500 text-sm">{pokemonDescription}</p>
        </div>
        <div className="w-40 h-40 flex items-center justify-center overflow-hidden">
          <img
            src={data?.data.sprites.front_default}
            alt={pokemon.name}
            className="w-full h-full"
            style={{
              imageRendering: "pixelated",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </button>
  );
}
