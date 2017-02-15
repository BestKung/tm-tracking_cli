import {Injectable} from "@angular/core";
import {PageEvent} from "../paging/page_event";
import {FollowSearch} from "../follow_search";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {Http} from "@angular/http";
import {FollowChange} from "../../follow-case/follow-change/follow_change";
import {Page} from "../page";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {InterceptHttp} from "../intercept_http";
/**
 * Created by neng on 15/11/2559.
 */
@Injectable()
export class FollowChangeRestObjectService {

    public searchRequest: FollowSearch = new FollowSearch();
    public stepDesc = {
        "101": "ตรวจสอบเอกสารรับคำขอ",
        "202": "นายทะเบียนพิจารณา"
    };

    constructor(private http: InterceptHttp) {

    }

    clearParam(): void {
        this.searchRequest = new FollowSearch();
    }

    public searchFollowChange(pageEvent: PageEvent): Observable<Page<FollowChange>> {
        let params = new DateSupportURLSearchParams();
        params.set('trNo', this.searchRequest.trNo);
        params.set('stepCode', this.searchRequest.stepCode || null);
        params.set('startDate', this.searchRequest.startDateStr);
        params.set('endDate', this.searchRequest.endDateStr);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-change', {search: params}).map(data => <Page<FollowChange>>data.json());
    }
}