/**
 * Created by best on 11/9/2559.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
    moduleId:module.id,
    selector:'delete-button',
    template:`<button class="ui red button" (click)="onDelete($event)">{{label}}</button>`
})
export class DeleteButtonComponent {
    @Input()label:string = 'Delete';

    @Input()key:any;

    @Output()deleteEvent:EventEmitter<any> = new EventEmitter<any>();

    onDelete($event:any){
        this.deleteEvent.emit(this.key);
    }
}
