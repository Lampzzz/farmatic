import { getPokemon } from "@/api/get-pokemon";
import { PokemonCardProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function PokemonCard({ pokemon }: { pokemon: PokemonCardProps }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["pokemon", pokemon.name],
    queryFn: () => getPokemon(pokemon.name),
  });

  return (
    <div className="p-4 rounded-lg bg-white shadow z-10">
      <h1 className="text-black font-bold capitalize text-xl">
        {pokemon.name}
      </h1>
    </div>
  );
}
