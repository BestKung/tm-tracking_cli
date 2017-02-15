import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {PageEvent} from "../paging/page_event";
import {Observable} from "rxjs";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {VerifyEvidenceSearch, VerifyEvidenceModel} from "../../model/verify-evidence-model";
import {Page} from "../page";
import {InterceptHttp} from "../intercept_http";
/**
 * Created by neng on 15/11/2559.
 */
@Injectable()
export class VerifyEvidenceRestObjectService {

    public trNos: number[] = [];
    officerName: string = '';
    officerPosition: string = '';
    public verifyEvidences: Array<VerifyEvidenceModel> = new Array();

    constructor(private _http: InterceptHttp,
                private _route: Router) {
        this._route.events.subscribe((val) => {
            console.log('this trNos ', this.trNos.toString());
            if (val.url.startsWith("/verify-evidences/search") && this.trNos.length > 0) {
                this.searchAction({currentPage: 0, pageSize: 10});
            } else {
                this.trNos = [];
            }
        });
    }

    public searchAction(pageEvent: PageEvent): Observable<Page<VerifyEvidenceSearch>> {
        let params = new DateSupportURLSearchParams();
        params.set("reqNos", (this.trNos.length == 0 ? null : this.trNos.toString()));
        params.set("officerName", this.officerName || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this._http.get('/api/search', {search: params}).map(resp => resp.json());
    }
}