/**
 * Created by neng on 19/9/2559.
 */

import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    moduleId: module.id,
    selector: "checklist-component",
    template: `
<a class="ui tiny primary button" (click)="goToChecklistPage()">
    ตรวจสอบเอกสาร
</a>
`
})

export class CheckListButtonComponent {

    @Input()
    formId: string;

    constructor(private router: Router) {
    }

    goToChecklistPage() {
        let redirectUrl = ['/verify-evidences/checklist', this.formId];
        this.router.navigate(redirectUrl);
    }
}
