import { NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { PokemonWithCries } from 'types/pokemon-with-cries.type';

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

export const getPokemonByName = (name: string): Promise<PokemonWithCries> => {
    return pokemonClient.getPokemonByName(name) as Promise<PokemonWithCries>;
};

export const getPokemonAbilityDetailsByName = (name: string) => {
    return pokemonClient.getAbilityByName(name);
};
