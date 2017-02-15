/**
 * Created by neng on 20/9/2559.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {EvidenceModel} from "../../model/evidence-model";
import {RestObjectService} from "../../core/rest_object.service";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
@Component({
    moduleId: module.id,
    selector: "checklist-page",
    templateUrl: "checklist_page.html"
})

export class CheckListPageComponent implements OnInit {

    private evidence: EvidenceModel;
    private formTypeId: string;

    constructor(private restObjectService: RestObjectService,
                private route: ActivatedRoute,
                private http: Http) {
    }

    ngOnInit(): void {
        this.route.params.filter(p => p['formId']).forEach(p=>this.formTypeId = p['formId']);

        if (this.restObjectService.evidences[this.formTypeId]) {
            this.evidence = this.restObjectService.evidences[this.formTypeId];
        } else {
            this.loadEvidencesFromServer();
        }

    }

    private loadEvidencesFromServer() {
        if(this.restObjectService.agreementId) {
            let params = new DateSupportURLSearchParams();
            params.set("agreementId", this.restObjectService.agreementId);
            params.set("formTypeId", this.formTypeId);
            this.http.get('/api/absence-evidence/find-absence-evidences', {search: params}).map(resp => resp.json()).subscribe(evidence => {
                this.evidence = evidence;
                console.log("evidence loaded 1 ", this.evidence);
            });
        } else {
            this.http.get(`/api/evidence/${this.formTypeId}`)
                .map(response => response.json())
                .subscribe(evidence => {
                    this.evidence = evidence;
                    console.log("evidence loaded 2 ", this.evidence);
                });
        }
    }

    addChecklistToRest() {
        this.restObjectService.evidences[this.formTypeId] = this.evidence;
        this.back()
    }

    private handleError(error: any) {
        console.log("Error occured ! >> " + error);
        return Observable.throw(error);
    }

    private clearChecklist() {
        console.log('in clear');
        this.loadEvidencesFromServer();
    }

    back() {
        window.history.back();
    }
}
