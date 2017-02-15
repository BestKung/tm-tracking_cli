/**
 * Created by neng on 13/10/2559.
 */
import {Component, Input, ElementRef, ViewChild, Output, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'discard-request',
    templateUrl: 'discard-request.html'
})
export class DiscardRequestComponent {

    @Input()
    private labelColor;

    @Input()
    private agreementId;

    @ViewChild("discard_modal") discardModal :ElementRef;

    @Output()
    private completed :EventEmitter<number> = new EventEmitter<number>();

    private discard: DiscardRequest = new DiscardRequest();

    constructor(private http: Http,
                private toastsManager: ToastsManager) {
    }

    private discardRequest() {
        this.discard.agreementId = this.agreementId;
        console.log(this.discard);
        if(!this.discard.discardDate) {
            this.toastsManager.warning('กรุณาเลือกวันที่ละทิ้ง');
            return;
        }
        this.http.post('/api/discard-request', this.discard).subscribe(resp => {
            console.log(resp);
            if(resp.status = 200) {
                this.completed.emit(this.agreementId);
                jQuery(this.discardModal.nativeElement).modal('hide');
            }
        });
    }

    showDiscardModal() {
        jQuery(this.discardModal.nativeElement).modal('toggle');
    }
}

export class DiscardRequest {

    agreementId: number;
    reason: string;
    discardDate: Date|string;
}