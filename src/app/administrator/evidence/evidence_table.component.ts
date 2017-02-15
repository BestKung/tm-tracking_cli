import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {EvidenceModel} from "../../model/evidence-model";
import {FormTypeModel} from "../../model/form-type-model";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
/**
 * Created by pramoth on 10/1/2016 AD.
 */
@Component({
    moduleId:module.id,
    selector:'evidence-table',
    templateUrl:'evidence_table.html'
})
export class EvidenceTableComponent implements OnInit {

    @Input() evidences : EvidenceModel[];

    @Input() formType: FormTypeModel;

    @Output() deleteCompleted:EventEmitter<string> = new EventEmitter<string>();

    constructor(private http: Http,
                private toasts: ToastsManager) {

    }

    ngOnInit(): void {
    }

    private addMainEvidence(evidences: EvidenceModel[]) {
        let evd = new EvidenceModel();
        evd.formType = this.formType;
        evd.formType = this.formType;
        evd.delPermit = true;
        evd.visible = true;
        evd.isCategory = false;
        evidences.push(evd);
        console.log('add new main evidence, ', evd);
    }

    private addSubEvidence(evidence: EvidenceModel) {
        let evd = new EvidenceModel();
        evd.formType = this.formType;
        evd.delPermit = true;
        evd.visible = true;
        evd.isCategory = false;
        evidence.child.push(evd);
        console.log('add new sub evidence, ', evd);
    }

    private removeEvidence(evidences: EvidenceModel[], removeItem: EvidenceModel) {
        console.log('evidence remove ,', evidences);
        for(let idx = 0; idx < evidences.length; idx ++) {
            if(evidences[idx] === removeItem) {
                evidences[idx].delState = true;
                if(evidences[idx].id == null) {
                    evidences.splice(idx, 1);
                    return;
                }
                this.http.post('/api/evidence/delete', evidences[idx]).subscribe(resp => {
                    if(resp.ok) {
                        this.toasts.warning("ลบข้อมูลสำเร็จ");
                        this.deleteCompleted.emit(this.formType.id);
                    }
                },  err=> {
                    if(err.json().exception.includes('DataIntegrityViolationException')) {
                        this.toasts.warning("ไม่สามารถลบข้อมูลนี้ได้ เนื่องจากมีการใช้งานอยู่");
                    }
                });
                // evidences.splice(idx, 1);
                return;
            }
        }
    }
}