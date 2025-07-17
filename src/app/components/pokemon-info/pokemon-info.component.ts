import { Component, computed, input } from '@angular/core';

import { Pokemon } from 'pokenode-ts';
import { TypewriterComponent } from '../../typewriter/typewriter.component';

@Component({
    selector: 'app-pokemon-info',
    imports: [TypewriterComponent],
    template: `
        @if (isFetching()) {
            <p>Loading...</p>
        } @else {
            <app-typewriter [text]="pokemonInfo()?.name" />
            <app-typewriter [text]="pokemonHeight()" />
            <app-typewriter [text]="pokemonWeight()" />
            <app-typewriter [text]="pokemonTypes()" />

            <div class="sprite-wrapper">
                @if (pokemonInfo(); as pokemonInfo) {
                    <div
                        class="sprite"
                        [style.background-image]="'url(' + pokemonInfo.sprites['front_default'] + ')'"
                    ></div>
                }
            </div>
        }
    `,
    styleUrl: './pokemon-info.component.scss',
})
export class PokemonInfoComponent {
    readonly pokemonInfo = input<Pokemon>();
    readonly isFetching = input<boolean>(false);
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
}
