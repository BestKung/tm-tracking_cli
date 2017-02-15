/**
 * Created by neng on 6/10/2559.
 */
import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
@Component({
    moduleId: module.id,
    selector: 'detail-button',
    template: `<a class="ui primary mini button" style="font-size: 10px" (click)="redirectToDetailPage()">
                รายละเอียด
               </a>`
})
export class DetailButtonComponent {

    @Input()
    private trNo:number;

    constructor(private router:Router) {
    }

    redirectToDetailPage() {
        let redirectUrl = ['cancel-registration/detail', this.trNo];
        this.router.navigate(redirectUrl);
    }
}
