/**
 * Created by neng on 15/10/2559.
 */
import {Component, ElementRef, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'kor20',
    templateUrl: 'kor20.html'
})
export class Kor20Component {

    @Input()
    private ageementId: number;

    @Input()
    private requestNo: number;

    @Output()
    private completed :EventEmitter<number> = new EventEmitter<number>();

    private recvKor20Date: Date;

    @ViewChild("kor20_modal") kor20Modal: ElementRef;

    @ViewChild("confirm_modal") confirmModal: ElementRef;

    constructor(private http: Http,
                private toastsManager: ToastsManager) {

    }

    private showKor20Modal() {
        jQuery(this.kor20Modal.nativeElement).modal({observeChanges: true}).modal('toggle');
    }

    private saveKor20Date() {
        this.http.post('/api/absence-agreement/3nd-save-kor20', {
            agreementId: this.ageementId,
            kor20Date: this.recvKor20Date
        }).filter(resp=>resp.status === 200)
            .subscribe(resp => {
                console.log(resp);
                this.completed.emit(this.ageementId);
                this.toastsManager.success("บันทึกข้อมูลสำเร็จ");
                jQuery(this.confirmModal.nativeElement).modal('hide');
            });
    }

    private showConfirmDialog() {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    }

    private cancelSaveKor20Date() {
        jQuery(this.kor20Modal.nativeElement).modal('show');
    }
}