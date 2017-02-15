import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'flattenStringList'
})
export class FlattenStringListPipe implements PipeTransform {

    transform(value: string[], args: string[]): string {
        if (!value) {
            return '';
        }
        return value.reduce((first: string, second: string) => first + ', ' + second);
    }

}
