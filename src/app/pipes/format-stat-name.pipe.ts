import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatStatName',
    standalone: true
})
export class FormatStatNamePipe implements PipeTransform {
    transform(value: string): string {
        return value.replace('special-', 'sp-');
    }
}
