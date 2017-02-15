/**
 * Created by best on 14/10/2559.
 */
import {Component, Input} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
@Component({
    selector: 'detail-approve-button',
    template: `
            <a style="font-size: 12px" class="ui label blue" (click)="gotoDetailApprove()">{{label}}</a>
             `
})
export class DetailApproveButtonComponent {
    @Input()
    private label:string = 'รายละเอียด';

    @Input()
    private trNo:number;

    constructor(private  router:Router) {

    }

    gotoDetailApprove():void {
        let url = ['follow/approve/detail/', this.trNo];
        this.router.navigate(url);
    }
}