import { typeColors } from "@/constant";

type PokemonTypesListProps = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export function PokemonTypesList({
  pokemonTypes,
}: {
  pokemonTypes: PokemonTypesListProps[];
}) {
  // console.log(pokemonTypes);

  return (
    <div className="flex items-center space-x-2 mb-2">
      {pokemonTypes?.map((type) => (
        <PokemonTypes key={type.type.name} type={type.type.name} />
      ))}
    </div>
  );
}

function PokemonTypes({ type }: { type: string }) {
  return (
    <div
      className="px-4 py-2 rounded-full capitalize"
      style={{ backgroundColor: typeColors[type] }}
    >
      <p className="text-xs font-semibold">{type}</p>
    </div>
  );
}
