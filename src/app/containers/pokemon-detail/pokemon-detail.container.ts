import { Component, computed, inject, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { ActivatedRoute } from '@angular/router';
import { AbilitiesBoxComponent } from 'components/abilities-box/abilities-box.component';
import { SoundsBoxComponent } from 'components/sounds-box/sounds-box.component';
import { StatsBoxComponent } from 'components/stats-box/stats-box.component';
import { TabButtonComponent } from 'components/tab-button/tab-button.component';
import { PokemonListsService } from 'services/pokemon-lists.service';
import { injectTwHostClass } from 'util/inject-tw-host-class.util';
import { getPokemonByName } from '../../../api/pokemon';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';

@Component({
    selector: 'app-pokemon-detail',
    imports: [PokemonInfoComponent, TabButtonComponent, StatsBoxComponent, AbilitiesBoxComponent, SoundsBoxComponent],
    template: `
        <div class="w-full bg-black text-white h-32 p-2 rounded-md shadow-inner relative">
            <app-pokemon-info
                [pokemonInfo]="currentPokemonInfo.data()"
                [isFetching]="currentPokemonInfo.isFetching()"
                [isError]="currentPokemonInfo.isError()"
            />
            @if (!currentPokemonInfo.isError() && !currentPokemonInfo.isFetching()) {
                <div class="absolute bottom-1 right-1 flex gap-2">
                    <button
                        class="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
                        (click)="toggleCaught()"
                    >
                        @if (isPokemonCaught()) {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        } @else {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        }
                    </button>
                    <button
                        class="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
                        (click)="toggleWishlist()"
                    >
                        @if (isInWishlist()) {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                                />
                            </svg>
                        } @else {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        }
                    </button>
                </div>
            }
        </div>
        <div class="flex flex-row *:flex-auto gap-2">
            @for (tab of tabs(); track $index) {
                <app-tab-button [tabName]="tab" (onTabClick)="changeTab($event)" />
            }
        </div>

        <div class="grow bg-gray-200 rounded-md">
            @if (currentPokemonInfo.isFetching()) {
                <p>Loading...</p>
            } @else if (currentPokemonInfo.isError()) {
                <p>Something went wrong</p>
            } @else {
                @switch (selectedTab()) {
                    @case ('Abilities') {
                        <app-abilities-box [abilities]="currentPokemonInfo.data()?.abilities ?? []" />
                    }
                    @case ('Stats') {
                        <app-stats-box [stats]="currentPokemonInfo.data()?.stats ?? []" />
                    }
                    @case ('Listen to it!') {
                        <app-sounds-box [sound]="currentPokemonInfo.data()?.cries ?? null" />
                    }
                    @default {
                        <app-abilities-box [abilities]="currentPokemonInfo.data()?.abilities ?? []" />
                    }
                }
            }
        </div>
    `,
})
export class PokemonDetailContainer {
    private pokemonListsService = inject(PokemonListsService);

    private readonly pokemonId = signal('bulbasaur');
    private readonly activatedRoute = inject(ActivatedRoute);
    protected readonly tabs = signal<string[]>(['Abilities', 'Stats', 'Listen to it!']);
    protected readonly selectedTab = signal<string>('Abilities');

    protected readonly isPokemonCaught = computed(() => 
        this.pokemonListsService.isCaught(this.pokemonId())
    );

    protected readonly isInWishlist = computed(() => 
        this.pokemonListsService.isInWishlist(this.pokemonId())
    );

    protected toggleCaught() {
        const pokemonName = this.pokemonId();
        if (this.isPokemonCaught()) {
            this.pokemonListsService.removeFromCaught(pokemonName);
        } else {
            this.pokemonListsService.addToCaught(pokemonName);
        }
    }

    protected toggleWishlist() {
        const pokemonName = this.pokemonId();
        if (this.isInWishlist()) {
            this.pokemonListsService.removeFromWishlist(pokemonName);
        } else {
            this.pokemonListsService.addToWishlist(pokemonName);
        }
    }

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
