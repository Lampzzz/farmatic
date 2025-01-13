"use client";

import { getPokemon } from "@/api/get-pokemon";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Pokemon() {
  const { pokemonName } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => getPokemon(pokemonName as string),
  });

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white rounded-lg shadow">
      Pokemon
    </div>
  );
}
