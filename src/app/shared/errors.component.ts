/**
 * Created by best on 27/10/2559.
 */
import {Component, Input} from "@angular/core";
import {HttpStatusBus} from "./http_status_bus";
@Component({
    selector: 'gt-errors',
    template: `
        <label style="color: red">{{message}}</label>
             `
})
export class ErrorsComponent {

    @Input()
    violation:string = '';

    message:string = '';


    constructor(private httpStatus:HttpStatusBus) {
        httpStatus.completed.subscribe(data=> {
            this.message = '';
        });
        httpStatus.error.subscribe(err=> {
            if(err.json().type == 'validation'){
                if (this.violation) {
                    if (err.json().violations[this.violation]) {
                        this.message = err.json().violations[this.violation].message;
                    }
                }
                if (!this.violation) {
                    this.message = err.json().violations.message.message;
                }
            }
        });
    }


}


