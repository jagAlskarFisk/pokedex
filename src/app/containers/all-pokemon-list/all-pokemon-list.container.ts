import { Component, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { NamedAPIResource } from 'pokenode-ts';
import { getPokemonListPaginated } from '../../../api/pokemon';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-all-pokemon-list',
    imports: [PokemonListComponent],
    template: `
        <app-pokemon-list
            [pokemonList]="allPokemon()"
            [isLoading]="pokemonListQuery.isFetching()"
            [canFetchMorePokemon]="!!nextPageUrl()"
            (getNextPokemonPage)="getNextPokemonPage()"
        />
    `,
})
export class AllPokemonListContainer {
    nextPageUrl = signal<string | null>(null);
    allPokemon = signal<NamedAPIResource[]>([]);

    pokemonListQuery = injectQuery(() => ({
        queryKey: ['pokemon-list'],
        queryFn: () => {
            // since the response includes the property `next`, which is the intended paginated url
            // we can use it to fetch the next page
            if (this.nextPageUrl()) {
                return fetch(this.nextPageUrl()).then((res) => res.json());
            }
            // initial api call
            return getPokemonListPaginated(0, 20);
        },
        select: (data) => {
            this.nextPageUrl.set(data.next);
            this.allPokemon.update((current) => [...current, ...data.results]);
            return data;
        },
    }));

    getNextPokemonPage() {
        this.pokemonListQuery.refetch();
    }
}
