import { Component, input } from '@angular/core';
import { PokemonStat } from 'pokenode-ts';
import { FormatStatNamePipe } from '../../../pipes/format-stat-name.pipe';
import { statsRanges } from '../../../types/pokemon-stat-range.type';

@Component({
    selector: 'app-stat-bar',
    imports: [FormatStatNamePipe],
    template: `
        <div class="flex flex-col items-center h-full w-full">
            <div class="flex flex-col-reverse justify-between h-full w-full">
                @for (segment of Array(10); track $index) {
                    <div class="w-4 h-1 rounded-sm mx-auto" [class]="getSegmentColor($index)"></div>
                }
            </div>
            <small class="font-semibold">{{ pokemonStat().base_stat }}</small>
            <small class="text-black">{{ pokemonStat().stat.name | formatStatName }}</small>
        </div>
    `,
})
export class StatBarComponent {
    protected readonly pokemonStat = input.required<PokemonStat>();
    protected readonly Array = Array;

    protected getStatPercentage(): number {
        const rawName = this.pokemonStat().stat.name;
        const statName = rawName
            .replace('special-attack', 'specialAttack')
            .replace('special-defense', 'specialDefense');
        const range = statsRanges[statName as keyof typeof statsRanges];
        const value = this.pokemonStat().base_stat;
        return ((value - range.min) / (range.max - range.min)) * 100;
    }

    protected getFilledSegments(): number {
        return Math.round((this.getStatPercentage() / 100) * 10);
    }

    protected getSegmentColor(index: number): string {
        if (index >= this.getFilledSegments()) return 'bg-gray-400';

        const percentage = this.getStatPercentage();
        if (percentage <= 30) return 'bg-red-500';
        if (percentage <= 50) return 'bg-yellow-500';
        if (percentage <= 70) return 'bg-green-500';
        return 'bg-blue-500';
    }
}
