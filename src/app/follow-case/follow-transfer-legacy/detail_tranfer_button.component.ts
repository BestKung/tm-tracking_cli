import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
/**
 * Created by best on 8/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'detail-tranfer-button',
    template: `
    <a  class="ui label blue" style="font-size: 12px" (click)="gotoDetailTranfer()">{{label}}</a>
`
})
export class DetailTranferButtonComponent {
    @Input()
    label:string = 'รายละเอียด';
    @Input()
    trNo:string;

    constructor(private router:Router) {

    }

    gotoDetailTranfer():void {
        let url = ['follow/transfer-legacy/detail/', this.trNo];
        this.router.navigate(url);
    }

}