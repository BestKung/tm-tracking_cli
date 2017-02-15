import {Router} from "@angular/router";
import {Component, Input} from "@angular/core";
/**
 * Created by best on 2/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'detail-trademark-button',
    template: ` <a class="ui button blue" style="font-size: 10px" (click)="goToDetailTrademark()">{{label}}</a>`
})
export class DetailTrademarkButton {

    @Input()
    trNo:number;

    @Input()
    label:string = 'รายละเอียด';


    constructor(private router:Router) {

    }

    private goToDetailTrademark() {
        let redirectToUrl = ['follow/trademark/detail', this.trNo];
        this.router.navigate(redirectToUrl);
    }
}