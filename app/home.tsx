"use client";

import { getPokemons } from "@/api/get-pokemons";
import Container from "@/components/container";
import { PokemonList } from "@/components/pokemon-list";
import SearchInput from "@/components/search-input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <div className="z-10 flex justify-center items-center flex-1 p-12 flex-col">
        <Image
          src="/images/pokedex-svg.svg"
          width={300}
          height={300}
          alt="Pokeball Icon"
          className="mb-8"
        />
        <SearchInput />
      </div>
      <PokemonList pokemons={data.results} />
    </Container>
  );
}
