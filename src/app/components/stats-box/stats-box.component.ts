import { Component, input } from '@angular/core';
import { PokemonStat } from 'pokenode-ts';
import { StatBarComponent } from './stat-bar/stat-bar.component';

@Component({
    selector: 'app-stats-box',
    imports: [StatBarComponent],
    template: `<div class="w-full h-full overflow-y-auto grid grid-cols-6 gap-2 p-2">
        @for (stat of stats(); track $index) {
            <app-stat-bar [pokemonStat]="stat" />
        }
    </div>`,
})
export class StatsBoxComponent {
    protected readonly stats = input<PokemonStat[]>();
}
