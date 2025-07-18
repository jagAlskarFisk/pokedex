import { Pokemon } from 'pokenode-ts';
import { PokemonCries } from './pokemon-cry.type';

export interface PokemonWithCries extends Pokemon {
    cries: PokemonCries;
}
