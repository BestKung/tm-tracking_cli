/**
 * Created by neng on 15/10/2559.
 */

import {Component, Input, ElementRef, ViewChild, OnInit, Output, EventEmitter} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
declare var jQuery:any;

@Component({
    moduleId: module.id,
    selector: 'save-return-detail',
    templateUrl: 'save-return-detail.html'
})
export class SaveReturnDetailComponent {

    @Input()
    private agreementId: number;

    @Input()
    private returnedDate: Date;

    @Input()
    private invokedDate: Date|string;

    @Input()
    private visible: boolean = true;

    @Output()
    private completed :EventEmitter<number> = new EventEmitter<number>();

    @ViewChild("save_return_detail_modal") saveReturnDetailModal :ElementRef;

    @ViewChild("returnedDueDate_value") returnedDueDateValue :ElementRef;

    private static DATE_PLUS_15: number = 15;

    private returnedDueDate: Date;

    constructor(private http: Http) {

    }

    saveAction() {
        this.http.post('/api/return-request/3nd-save-return-detail',
            {
                agreementId: this.agreementId || null,
                invokeDate: this.invokedDate || null,
                returnedDate: this.returnedDate || null,
                returnedDueDate: jQuery(this.returnedDueDateValue.nativeElement).val() || null
            }
        ).subscribe(resp => {
            console.log(resp);
            this.completed.emit(this.agreementId);
            jQuery(this.saveReturnDetailModal.nativeElement).modal('hide');
        });
    }

    showSaveReturnDetailModal() {
        let params = new URLSearchParams();
        params.set("agreementId", this.agreementId.toString());
        this.http.get('/api/absence-agreement/id/', {search: params}).map(resp => resp.json()).subscribe(result => {
            console.log(result);
            this.agreementId = result.id;
            if(result.returnRequest) {
                this.returnedDate = result.returnRequest.returnedDate;
                this.returnedDueDate = result.returnRequest.returnedDueDate;
                this.invokedDate = result.returnRequest.invokedDate;
            } else {
                let agreementId = result.id;
                this.http.get(`/api/return-request/get-by-agreementid/${agreementId}`)
                    .filter(resp =>resp.text()!=='')
                    .map(reps => reps.json())
                    .subscribe(reps => {
                        console.log("this is resp return request   ", reps);
                        if(reps != null) {
                            this.returnedDate = reps.returnedDate;
                            this.returnedDueDate = reps.returnedDueDate;
                            this.invokedDate = reps.invokedDate;
                        }
                    });
            }
            jQuery(this.saveReturnDetailModal.nativeElement).modal('toggle');
        });
    }

    changeReturnDueDate() {
        console.log(this.returnedDate);
        if(this.returnedDate) {
            this.returnedDueDate = this.returnedDate;
            this.returnedDueDate = new Date(this.returnedDueDate.toString());
            this.returnedDueDate.setDate(new Date(
                this.returnedDueDate.toString()).getDate() + SaveReturnDetailComponent.DATE_PLUS_15);
        }
    }
}