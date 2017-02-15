import {Component, Input} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
/**
 * Created by best on 23/10/2559.
 */
@Component({
    selector: 'detail-report-button',
    template: `
    <a class="ui button blue" (click)="goToDetail()">{{label}}</a>
`
})

export class DetailReportButtomComponent {
    @Input()
    label:string = 'รายละเอียด';

    @Input()
    trNo:string;

    @Input()
    pathUrl:string;

    @Input()
    formType:string;

    constructor(private http:Http, private router:Router) {

    }

    goToDetail():void {
        let url = [this.pathUrl, this.trNo, this.formType];
        this.router.navigate(url);
    }
}