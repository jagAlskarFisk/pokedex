import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { PokemonCries } from 'types/pokemon-cry.type';

@Component({
    selector: 'app-sounds-box',
    imports: [CommonModule],
    template: `
        <div class="w-full h-full flex flex-col justify-center items-center">
            @if (sound().legacy) {
                <button
                    class="w-24 h-24 rounded-full flex items-center justify-center text-white text-5xl cursor-pointer"
                    (click)="playLegacySound()"
                    aria-label="Play legacy sound"
                >
                    ▶
                </button>
            } @else {
                <p class="text-gray-500 text-lg">There is no legacy sound for this pokemon</p>
            }
        </div>
    `,
})
export class SoundsBoxComponent {
    protected readonly sound = input<PokemonCries | null>();

    protected playLegacySound() {
        if (this.sound()?.legacy) {
            const audio = new Audio(this.sound().legacy);
            audio.volume = 0.5;
            audio.play();
        }
    }
}
