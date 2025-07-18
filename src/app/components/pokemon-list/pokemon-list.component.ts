import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NamedAPIResource } from 'pokenode-ts';
import { injectTwHostClass } from 'util/inject-tw-host-class.util';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-pokemon-list',
    template: `
        <header class="relative flex items-start z-[2]">
            <nav
                class="z-[2] flex bg-pokedex-red py-8 pr-16 pl-[30px] rounded-tl-2xl rounded-br-2xl [clip-path:polygon(100%_0,_100%_5rem,_6rem_100%,_0_100%,_0_0)]"
            >
                <button class="big-button blue"></button>
            </nav>
            <div class="z-1 absolute left-0 bottom-0 w-6 shadow-nav"></div>

            <div class="flex grow h-20 py-5 ml-[-1rem] z-[2] bg-pokedex-red shadow-large top-bar-bg">
                <button class="small-button red"></button>
                <button class="small-button yellow"></button>
                <button class="small-button green"></button>
            </div>
        </header>

        <div class="flex [max-height:calc(100%_-_76px)] grow mt-[-3rem] p-8 pt-0 bg-pokedex-red rounded-bl-4xl">
            <section
                class="flex flex-col bg-black text-white grow overflow-auto p-2 pt-12 inset-shadow rounded-4xl rounded-bl-2xl rounded-tr-none"
            >
                <div class="px-4 my-4 w-full flex items-center gap-2">
                    <input
                        class="flex-1 rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Search Pokémon..."
                        type="text"
                        [(ngModel)]="searchInput"
                        (keyup.enter)="onSearch()"
                    />
                    <button
                        class="rounded-md bg-blue-600 text-white font-bold px-6 py-2 shadow hover:bg-blue-700 transition"
                        (click)="onSearch()"
                    >
                        Search
                    </button>
                </div>
                @for (pokemon of pokemonList(); let index = $index; track pokemon.name) {
                    <app-pokemon-list-item [index]="$index" [pokemon]="pokemon" />
                }
                @if (isLoading()) {
                    <p>Loading...</p>
                } @else if (canFetchMorePokemon()) {
                    <button
                        (click)="loadNextPokemonPage()"
                        class="w-full text-black bg-cyan-300 p-2 rounded-md mt-4 hover:bg-cyan-400 transition-colors"
                    >
                        Fetch more pokemon!
                    </button>
                }
            </section>
        </div>

        <footer></footer>
    `,
    styleUrl: './pokemon-list.component.scss',
    imports: [PokemonListItemComponent, FormsModule],
})
export class PokemonListComponent {
    readonly isLoading = input<boolean>(false);
    readonly pokemonList = input<NamedAPIResource[]>([]);
    readonly canFetchMorePokemon = input<boolean>(true);
    getNextPokemonPage = output<void>();

    private router = inject(Router);

    searchInput = '';

    onSearch() {
        if (this.searchInput.trim()) {
            this.router.navigate(['', { outlets: { detail: [this.searchInput.trim().toLowerCase()] } }]);
        }
    }

    loadNextPokemonPage() {
        this.getNextPokemonPage.emit();
    }

    constructor() {
        injectTwHostClass(() => 'flex flex-col');
    }
}
