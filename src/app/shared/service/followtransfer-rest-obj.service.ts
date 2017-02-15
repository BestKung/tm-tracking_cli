import {Injectable} from "@angular/core";
import {PageEvent} from "../paging/page_event";
import {Observable} from "rxjs";
import {FollowTranfer} from "../../follow-case/follow-transfer-legacy/follow_tranfer";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {FollowSearch} from "../follow_search";
import {Page} from "../page";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
/**
 * Created by neng on 15/11/2559.
 */
@Injectable()
export class FollowTransferRestObjectService {

    public searchRequest:FollowSearch = new FollowSearch();
    public stepDesc = {
        '101': 'ตรวจสอบเอกสารรับคำขอ',
        '202': 'นายทะเบียนพิจารณา',
        '308': 'ออกหนังสือแสดงรายการการโอนหรือรับมรดก'
    };

    constructor(private http: Http) {
    }

    public searchTransferLegacy(pageEvent: PageEvent): Observable<Page<FollowTranfer>> {
        console.log('stepCode search .... ', this.searchRequest.stepCode);
        let params = new DateSupportURLSearchParams();
        params.set('trNo', this.searchRequest.trNo || null);
        params.set('stepCode', this.searchRequest.stepCode || null);
        params.set('startDate', this.searchRequest.startDateStr || null);
        params.set('endDate', this.searchRequest.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-tranfer', {search: params}).map(data=><Page<FollowTranfer>>data.json());
    }

    clearParam(): void {
        this.searchRequest = new FollowSearch();
    }

}