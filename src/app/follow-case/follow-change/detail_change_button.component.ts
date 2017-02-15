import {Input, Component} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by best on 5/10/2559.
 */
@Component({
    selector: 'detail-change-button',
    template: `
     <div class="ui button blue" style="font-size: 10px" (click)="gotoDetailChange()">{{lebel}}</div>
`
})
export class DetailChangeButtonComponent {
    @Input()
    lebel:string = 'รายละเอียด';
    @Input()
    trNo:string;

    constructor(private router:Router) {

    }

    private gotoDetailChange():void {
        let url = ['follow/change/detail/', this.trNo];
        this.router.navigate(url);
    }
}