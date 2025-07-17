import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-tab-button',
    imports: [],
    template: `<button class="p-2 bg-cyan-300 rounded-md text-center w-full" (click)="onTabClicked()">
        {{ tabName() }}
    </button>`,
})
export class TabButtonComponent {
    readonly tabName = input<string>('');
    onTabClick = output<string>();

    onTabClicked() {
        this.onTabClick.emit(this.tabName());
    }
}
