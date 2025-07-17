import { Component, inject, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { ActivatedRoute } from '@angular/router';
import { StatsBoxComponent } from 'components/stats-box/stats-box.component';
import { TabButtonComponent } from 'components/tab-button/tab-button.component';
import { injectTwHostClass } from 'util/inject-tw-host-class.util';
import { getPokemonByName } from '../../../api/pokemon';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';

@Component({
    selector: 'app-pokemon-detail',
    imports: [PokemonInfoComponent, TabButtonComponent, StatsBoxComponent],
    template: `
        <div class="w-full bg-black text-white h-32 p-2 rounded-md shadow-inner">
            <app-pokemon-info
                [pokemonInfo]="currentPokemonInfo.data()"
                [isFetching]="currentPokemonInfo.isFetching()"
            />
        </div>
        <div class="flex flex-row *:flex-auto gap-2">
            @for (tab of tabs(); track $index) {
                <app-tab-button [tabName]="tab" (onTabClick)="changeTab($event)" />
            }
        </div>

        <div class="grow bg-gray-200 p-2 rounded-md">
            @if (currentPokemonInfo.isFetching()) {
                <p>Loading...</p>
            } @else {
                @switch (selectedTab()) {
                    @case ('Abilities') {
                        <p>Abilities content goes here...</p>
                    }
                    @case ('Moves') {
                        <p>Moves content goes here...</p>
                    }
                    @case ('Stats') {
                        <app-stats-box [stats]="currentPokemonInfo.data()?.stats ?? []" />
                    }
                }
            }
        </div>
    `,
})
export class PokemonDetailContainer {
    private readonly pokemonId = signal('bulbasaur');
    private readonly activatedRoute = inject(ActivatedRoute);
    protected readonly tabs = signal<string[]>(['Abilities', 'Moves', 'Stats']);
    protected readonly selectedTab = signal<string>('Abilities');

    readonly currentPokemonInfo = injectQuery(() => ({
        queryKey: ['pokemon', this.pokemonId()],
        queryFn: () => getPokemonByName(this.pokemonId()),
    }));

    changeTab(tabName: string) {
        this.selectedTab.set(tabName);
    }

    constructor() {
        injectTwHostClass(() => 'flex flex-col gap-4 p-5 pt-20');

        // Subscribe to route parameter changes
        this.activatedRoute.params.subscribe((params) => {
            if (params['pokemonId']) {
                this.pokemonId.set(params['pokemonId']);
            }
        });
    }
}
