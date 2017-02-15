import {Component, OnInit, Input} from "@angular/core";
import {Page} from "../../shared/page";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
import {VerifyEvidenceModel, VerifyEvidenceSearch, VerifyEvidencePk} from "../../model/verify-evidence-model";
import {RestObjectService} from "../../core/rest_object.service";
import {PageEvent} from "../../shared/paging/page_event";
import {Contract} from "../../model/absence-agreement-model";
import {VerifyEvidenceRestObjectService} from "../../shared/service/verify-evidence.rest-obj.service";
import {InterceptHttp} from "../../shared/intercept_http";
import {SelectItem} from 'primeng/primeng';
/**
 * Created by pramoth on 8/29/2016 AD.
 */
@Component({
    moduleId: module.id,
    selector: 'search-evidence',
    templateUrl: 'search_evidence.html'
})
export class SearchComponent implements OnInit {

    private pageData: Page<VerifyEvidenceSearch> = new Page<VerifyEvidenceSearch>();
    private currentPage: number = 0;
    private pageSize: number = 10;

    officers: SelectItem[] = [];
    selectedOfficer: string;

    constructor(private router: Router,
                private http: InterceptHttp,
                private restObject: RestObjectService,
                private verifyEvidenceRestObj: VerifyEvidenceRestObjectService) {

        if(this.verifyEvidenceRestObj.verifyEvidences.length == 0) {
            this.addVerifyEvidenceModel();
        }
    }

    ngOnInit(): void {
        this.restObject.evidences = {};
        this.restObject.pk = [];
        // this.searchAction();
        this.loadOfficerServiceFloor3FromServer();
    }

    private loadOfficerServiceFloor3FromServer() {

        this.http.get('/api/officer/service-floor3').map(resp => resp.json()).subscribe(resp => {
            this.officers = [];
            resp.forEach(e => this.officers.push({label: e.label, value: e.value}));
        });
    }

    clear() {

        this.verifyEvidenceRestObj.verifyEvidences = new Array();
        this.verifyEvidenceRestObj.trNos = [];
        this.verifyEvidenceRestObj.officerName = '';
        this.verifyEvidenceRestObj.officerPosition = '';
        this.selectedOfficer = this.verifyEvidenceRestObj.officerName;
        console.log('this.selectedOfficer >> ', this.selectedOfficer );
        this.addVerifyEvidenceModel();
    }

    private addVerifyEvidenceModel() {
        for (var i = 0; i < 5; i++) {
            var verifyEvidence = new VerifyEvidenceModel();
            this.verifyEvidenceRestObj.verifyEvidences.push(verifyEvidence);
        }
    }

    private removeVerifyEvidenceModel(index: number) {
        this.verifyEvidenceRestObj.verifyEvidences.splice(index, 1);
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void  {
        console.log('this.selectedOfficer > ', this.selectedOfficer);
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.verifyEvidenceRestObj.trNos = this.extractTrNoArrayBeforeSearch();
        this.verifyEvidenceRestObj.officerName = this.selectedOfficer;
        this.verifyEvidenceRestObj.searchAction(pageEvent).subscribe(result => {
            this.pageData = result;
            console.log(this.pageData);
        });
    }

    onChangeSearchOwnerName(verif: VerifyEvidenceModel, trNo: number) {
        verif.trNo = trNo;
        if (trNo) {
            this.http.get(`/api/search-ownername/${trNo}`).subscribe((result: Response) => {
                verif.ownerName = result.text();
            });
        } else {
            verif.ownerName = "";
        }
        console.log(verif);
    }

    verifySelect(pk: VerifyEvidencePk) {
        this.clearRestObjectService();
        this.restObject.pk.push(pk);
        let redirectToUrl = ['verify-evidences/agreement/'];
        this.router.navigate(redirectToUrl);
    }

    verifyAll(verifyEvidences: VerifyEvidenceSearch[]) {
        console.log(verifyEvidences);
        this.clearRestObjectService();
        for(let itm of verifyEvidences) {
            this.restObject.pk.push(itm.verifyEvidencePk);
        }
        let redirectToUrl = ['verify-evidences/agreement/'];

        this.router.navigate(redirectToUrl);
    }

    private clearRestObjectService() {
        this.restObject.pk = [];
        this.restObject.evidences = {};
        this.restObject.contract = new Contract();
        this.restObject.agreementId = undefined;
        this.restObject.ids = [];
    }

    private extractTrNoArrayBeforeSearch(): number[] {
        let arrayOfReqNo: number[] = [];
        for (let idx = 0; idx < this.verifyEvidenceRestObj.verifyEvidences.length; idx++) {
            if (this.verifyEvidenceRestObj.verifyEvidences[idx].trNo != undefined) {
                arrayOfReqNo.push(this.verifyEvidenceRestObj.verifyEvidences[idx].trNo);
            }
        }
        return arrayOfReqNo;
    }

    private getFormTypesSeq(formTypes: string): string {
        if(formTypes) {
            return formTypes.replace('0', 'ก.0');
        } else {
            return '';
        }
    }
}
export class OfficerSearch {

    label: string;
}
