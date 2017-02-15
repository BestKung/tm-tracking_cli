import {Injectable} from "@angular/core";
import {FollowSearch} from "../follow_search";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {PageEvent} from "../paging/page_event";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {Observable} from "rxjs";
import {FollowCancelRegisteration} from "../../follow-case/follow-cancel-registration/follow_cancel_registeration";
import {Page} from "../page";
/**
 * Created by neng on 16/11/2559.
 */
@Injectable()
export class FollowCancelRestService {

    public searchRequest: FollowSearch = new FollowSearch();
    public stepDesc = {
        '101': 'ตรวจสอบเอกสารรับคำขอ',
        '202': 'นายทะเบียนพิจารณา'
    };

    constructor(private http: Http) {
    }

    public searchFollowCancel(pageEvent: PageEvent): Observable<Page<FollowCancelRegisteration>> {

        let params = new DateSupportURLSearchParams();
        params.set('trNo', this.searchRequest.trNo || null);
        params.set('stepCode', this.searchRequest.stepCode || null);
        params.set('startDate', this.searchRequest.startDateStr || null);
        params.set('endDate', this.searchRequest.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-cancel-registration', {search: params})
            .map(data => data.json() as Page<FollowCancelRegisteration>);
    }

    clearParam(): void {
        this.searchRequest = new FollowSearch();
    }
}