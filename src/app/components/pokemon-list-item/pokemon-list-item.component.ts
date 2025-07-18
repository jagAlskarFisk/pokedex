import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NamedAPIResource } from 'pokenode-ts';

@Component({
    selector: 'app-pokemon-list-item',
    template: `
        <a class="block p-2 rounded-sm text-white no-underline hover:bg-list-item-hover" [routerLink]="['', { outlets: { detail: [pokemon().name] } }]">
            {{ index() + 1 }}
            {{ pokemon().name | uppercase }}
        </a>
    `,
    imports: [RouterLink, UpperCasePipe],
})
export class PokemonListItemComponent {
    readonly index = input.required<number>();
    readonly pokemon = input.required<NamedAPIResource>();
}
