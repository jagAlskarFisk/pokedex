import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PokemonAbility } from 'pokenode-ts';

@Component({
    selector: 'app-ability-details',
    imports: [CommonModule],
    template: `
        <div class="flex items-center gap-2 w-fit relative">
            <p class="font-semibold">{{ ability().ability.name | uppercase }}</p>
            <button
                title="Click to show ability description"
                class="rounded-full w-5 h-5 flex items-center justify-center border border-black text-black hover:bg-gray-100 cursor-pointer"
                (click)="onQuestionIconClicked()"
            >
                ?
            </button>
        </div>
    `,
})
export class AbilityDetailsComponent {
    protected readonly ability = input<PokemonAbility>();
    protected onToggleAbilityDescription = output<void>();
    protected setAbilityName = output<string>();

    protected onQuestionIconClicked() {
        this.onToggleAbilityDescription.emit();
        this.setAbilityName.emit(this.ability().ability.name);
    }
}
