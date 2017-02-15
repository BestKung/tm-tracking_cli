/**
 * Created by best on 12/9/2559.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
    selector: 'update-button',
    template: `<button class="ui teal button" (click)="onUpdate($event)">{{label}}</button>`
})
export class UpdateButtonComponent {

    @Input() label:string = 'Update';

    @Input() key:any;

    @Output() updateEvent:EventEmitter<any> = new EventEmitter<any>();

    onUpdate($event:any) {
        this.updateEvent.emit(this.key);
    }
}
