import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by best on 15/10/2559.
 */
@Component({
    selector: 'detail-renew-button',
    template: `
            <a class="ui label blue" style="font-size: 12px" (click)="gotoDetailRenew()">{{label}}</a>
              `
})
export class DetailRenewButtonComponent {

    @Input()
    label:string = 'รายละเอียด';
    @Input()
    trNo:string;

    constructor(private router:Router) {

    }

    gotoDetailRenew():void {
        let url = ['follow/renew/detail/', this.trNo];
        this.router.navigate(url);
    }
}