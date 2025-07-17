import { Component, input, output } from '@angular/core';

import { NamedAPIResource } from 'pokenode-ts';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-pokemon-list',
    template: `
        <header>
            <nav>
                <button class="big-button blue"></button>
            </nav>
            <div class="nav-shadow"></div>

            <div class="top-bar">
                <button class="small-button red"></button>
                <button class="small-button yellow"></button>
                <button class="small-button green"></button>
            </div>
        </header>

        <div class="section-wrapper">
            <section>
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
    imports: [PokemonListItemComponent],
})
export class PokemonListComponent {
    readonly isLoading = input<boolean>(false);
    readonly pokemonList = input<NamedAPIResource[]>([]);
    readonly canFetchMorePokemon = input<boolean>(true);
    getNextPokemonPage = output<void>();

    loadNextPokemonPage() {
        this.getNextPokemonPage.emit();
    }
}
