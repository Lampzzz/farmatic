import { PokemonCardProps } from "@/types";
import { PokemonCard } from "./pokemon-card";

export function PokemonList({ pokemons }: { pokemons: PokemonCardProps[] }) {
  if (!pokemons || !Array.isArray(pokemons)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
