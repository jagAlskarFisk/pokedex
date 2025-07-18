import { Component, computed, input } from '@angular/core';

import { Pokemon } from 'pokenode-ts';
import { injectTwHostClass } from 'util/inject-tw-host-class.util';
import { TypewriterComponent } from '../../typewriter/typewriter.component';

@Component({
    selector: 'app-pokemon-info',
    imports: [TypewriterComponent],
    template: `
        @if (isFetching()) {
            <p>Loading...</p>
        } @else if (isError()) {
            <p>Something went wrong, are you sure this Pokémon exists?</p>
        } @else {
            <app-typewriter [text]="pokemonInfo()?.name" />
            <app-typewriter [text]="pokemonHeight()" />
            <app-typewriter [text]="pokemonWeight()" />
            <app-typewriter [text]="pokemonTypes()" />

            <div class="absolute top-0 right-0 w-full h-full max-w-24 max-h-24">
                @if (pokemonInfo(); as pokemonInfo) {
                    <div
                        class="w-full h-full bg-center bg-contain [image-rendering:pixelated] grayscale brightness-150"
                        [style.background-image]="'url(' + pokemonInfo.sprites['front_default'] + ')'"
                    ></div>
                }
            </div>
        }
    `,
})
export class PokemonInfoComponent {
    readonly pokemonInfo = input<Pokemon>();
    readonly isFetching = input<boolean>(false);
    readonly isError = input<boolean>(false);
    readonly pokemonHeight = computed(() => {
        return this.pokemonInfo() ? `height: ${this.pokemonInfo()!.height * 10}cm` : '';
    });
    readonly pokemonWeight = computed(() => {
        return this.pokemonInfo() ? `weight: ${this.pokemonInfo()!.weight / 10}kg` : '';
    });
    readonly pokemonTypes = computed(() => {
        const types = this.pokemonInfo()
            .types.map((type) => type.type.name)
            .join(', ');
        return `types: ${types}`;
    });

    constructor() {
        injectTwHostClass(() => 'relative block w-full h-full');
    }
}
