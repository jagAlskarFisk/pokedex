import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NamedAPIResource } from 'pokenode-ts';

@Component({
    selector: 'app-pokemon-list-item',
    template: `
        <a [routerLink]="['', { outlets: { detail: [pokemon().name] } }]">
            {{ index() + 1 }}
            {{ pokemon().name | uppercase }}
        </a>
    `,
    styleUrl: './pokemon-list-item.component.scss',
    imports: [RouterLink, UpperCasePipe],
})
export class PokemonListItemComponent {
    readonly index = input.required<number>();
    readonly pokemon = input.required<NamedAPIResource>();
}
