/**
 * Created by best on 30/10/2559.
 */
import {Input, Component} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by best on 5/10/2559.
 */
@Component({
    selector: 'detail-calcel-registeration-button',
    template: `
     <div class="ui button blue" style="font-size: 10px" (click)="gotoDetailCancel()">{{lebel}}</div>
`
})
export class DetailCancelRegisterationButtonComponent {
    @Input()
    lebel:string = 'รายละเอียด';
    @Input()
    trNo:string;

    constructor(private router:Router) {

    }

    private gotoDetailCancel():void {
        let url = ['follow/cancel-registration/search/detail/', this.trNo];
        this.router.navigate(url);
    }
}