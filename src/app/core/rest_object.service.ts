/**
 * Created by neng on 12/9/2559.
 */
import {Injectable} from "@angular/core";
import Any = jasmine.Any;
import {EvidenceModel} from "../model/evidence-model";
import {VerifyEvidencePk} from "../model/verify-evidence-model";
import {Contract, AbsenceAgreementModel} from "../model/absence-agreement-model";
import {DateSupportURLSearchParams} from "../shared/date-support-url-search-params";
import {PageEvent} from "../shared/paging/page_event";
import {Http} from "@angular/http";
import {AbsenceAgreement} from "../follow-case/absence_agreement";
import {Observable} from "rxjs";
import {Page} from "../shared/page";
import {InterceptHttp} from "../shared/intercept_http";
@Injectable()
export class RestObjectService {

    evidences: {[id: string]: EvidenceModel} = {};
    pk: VerifyEvidencePk[] = [];
    agreementId: number;
    contract: Contract = new Contract();
    ids: number[] = []; //agreement is after saved first;
    officerName: string = '';
    officerPosition: string = '';

    public trNo: number;
    public reqDateFrom: string|Date;
    public reqDateTo: string|Date;
    public urlSearch: string = 'api/absence-agreement';

    static formIds = ['01', '04', '05', '06', '07', '08'];

    constructor(private _http: InterceptHttp) {
        console.log('RestObjectService loaded...');
    }

    public searchAction(pageEvent: PageEvent): Observable<Page<AbsenceAgreement>> {

        let params = new DateSupportURLSearchParams();
        params.set('requestNumber', this.trNo || null);
        params.set('startDate', this.reqDateFrom  || null);
        params.set('endDate', this.reqDateTo || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        console.log("param to search " + this.trNo + " " + this.reqDateFrom + " " + this.reqDateTo);
        return this._http.get(this.urlSearch, {search: params}).map(resp => <Page<AbsenceAgreement>> resp.json());
    }
}