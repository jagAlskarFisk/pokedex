import { NamedAPIResource, PokemonClient } from 'pokenode-ts';

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

const pokemonClient = new PokemonClient();

export const getPokemonListPaginated = (offset: number, limit: number): Promise<PokemonListResponse> => {
    return pokemonClient.listPokemons(offset, limit);
};

export const getPokemonByName = (name: string) => {
    return pokemonClient.getPokemonByName(name);
};
