/**
 * Created by neng on 23/10/2559.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: 'datethai'
})

export class DateThaiTransformPipe implements PipeTransform {

    public transform(value: any, options: any={year: 'numeric', month: '2-digit', day: '2-digit' }): string {
        console.log(typeof value,value)
        if (value) {
            if((typeof value)  == 'string'){
                value = new Date(value);
            }
            return value.toLocaleDateString("th-TH", options);
        } else {
            return "";
        }

    }
}