/**
 * Created by best on 10/9/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {FormTypeModel} from "../../model/form-type-model";
import {EvidenceModel} from "../../model/evidence-model";
import {Page} from "../../shared/page";
import {ToastsManager} from "ng2-toastr/ng2-toastr";

@Component({
    moduleId: module.id,
    selector: 'administrator-evidence',
    templateUrl: 'administrator_evidence.html'
})
export class EvidenceComponent implements OnInit {

    private formTypes: FormTypeModel[];
    private resp: Page<EvidenceModel> = new Page<EvidenceModel>();
    private evidence: EvidenceModel;
    private currentFormTypeId: number;

    constructor(private http: Http , public toastr:ToastsManager) {
    }

    ngOnInit(): void {
        this.http.get("/api/form-type")
            .map(response => response.json())
            .subscribe(formTypes => {
                this.formTypes = formTypes;
            });
    }

    private findByFormTypeId(id: any) {
        console.log(id);
        this.http.get(`/api/evidence/${id}`).map(resp => resp.json()).subscribe(evidence => {
            console.log('this is evidences of formtype, ', evidence);
            this.evidence = evidence;
        });
    }

    private saveEvidence() {
        this.http.post('/api/administrator/evidence', this.evidence).subscribe(resp => {
            console.log(resp);
            this.toastr.success('บันทึกข้อมูลสำเร็จ');
            this.fetchDataTable();
        });

    }

    private saveEvidences() {
        this.http.post('/api/evidence/', this.evidence).subscribe(resp => {
            console.log(resp);
            this.evidence = new EvidenceModel();
            this.onChangeFormType(this.currentFormTypeId);
        });
    }

    private fetchDataTable() {
        this.http.get('/api/administrator/evidence').map(resp => resp.json()).subscribe(result => {
            this.resp = result;
        });
    }

    private delete(id: number) {
        this.http.post('/api/administrator/evidence/delete/', {"id": id}).subscribe(result => {
            console.log(result);
        });

        this.fetchDataTable();
    }

    public onChangeFormType(id: number) {
        this.currentFormTypeId = id;
        this.findByFormTypeId(this.currentFormTypeId);
    }

    private back() {
        window.history.back();
    }
}
