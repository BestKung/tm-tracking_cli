import {Component, Input, EventEmitter, Output} from "@angular/core";
/**
 * Created by best on 16/10/2559.
 */
@Component({
    selector: 'map-message-button',
    template: `
            <button class="ui basic button" style="width: 140px;" (click)="onClickMessage($event)">{{label}}</button>
             `
})
export class MapMessageButtonComponent {
    @Input()
    private label:string = '';

    @Input()
    private message:string = '';

    @Input()
    private text:string = '';

    @Output()
    private clickEvent:EventEmitter<any> = new EventEmitter<any>();

    onClickMessage($event:any) {
        if (!this.text) {
            this.text = '';
        }
        this.text = this.text + this.message;
        this.clickEvent.emit(this.text);
    }
}