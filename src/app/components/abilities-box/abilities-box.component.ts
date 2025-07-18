import { Component, computed, input, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PokemonAbility } from 'pokenode-ts';
import { getPokemonAbilityDetailsByName } from '../../../api/pokemon';
import { AbilityDetailsComponent } from './ability-details/ability-details.component';

@Component({
    selector: 'app-abilities-box',
    imports: [AbilityDetailsComponent],
    template: `
        <div class="w-full h-full overflow-y-auto relative">
            <ul class="list-disc ml-4 space-y-2">
                @for (ability of visibleAbilities(); track $index) {
                    <li class="marker:text-black">
                        <div class="pl-2">
                            <app-ability-details
                                [ability]="ability"
                                (onToggleAbilityDescription)="toggleDescription()"
                                (setAbilityName)="setSelectedAbilityName($event)"
                            />
                        </div>
                    </li>
                }
            </ul>
            @if (showAbilityDescription()) {
                <div
                    class="absolute inset-0 bg-black/80 bg-opacity-70 flex flex-col items-center justify-center z-20 rounded-md px-2"
                >
                    <button
                        class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-white text-2xl hover:text-gray-300 focus:outline-none cursor-pointer"
                        (click)="toggleDescription()"
                        aria-label="Close overlay"
                    >
                        &times;
                    </button>
                    <div class="text-white text-xs max-w-full text-center">
                        @if (pokemonAbilityDetailsQuery.isFetching()) {
                            <p>Loading...</p>
                        } @else {
                            {{ englishShortEffect }}
                        }
                    </div>
                </div>
            }
        </div>
    `,
})
export class AbilitiesBoxComponent {
    protected readonly abilities = input<PokemonAbility[]>();
    protected readonly showAbilityDescription = signal(false);
    protected readonly selectedAbilityName = signal<string | null>(null);

    protected readonly visibleAbilities = computed(() => {
        return this.abilities()?.filter((ability) => !ability.is_hidden) ?? [];
    });

    pokemonAbilityDetailsQuery = injectQuery(() => ({
        queryKey: ['pokemon-ability-details', this.selectedAbilityName()],
        queryFn: () => getPokemonAbilityDetailsByName(this.selectedAbilityName()),
        enabled: this.showAbilityDescription() && this.selectedAbilityName() !== null,
    }));

    get englishShortEffect(): string | undefined {
        const data = this.pokemonAbilityDetailsQuery.data();
        return (
            data?.effect_entries?.find((e) => e.language?.name === 'en')?.short_effect ??
            'No english description exists for this ability'
        );
    }

    toggleDescription() {
        this.showAbilityDescription.update((v) => !v);
    }

    setSelectedAbilityName(name: string) {
        this.selectedAbilityName.set(name);
    }
}
