import {Injectable} from "@angular/core";
import {FollowSearch} from "../follow_search";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {PageEvent} from "../paging/page_event";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {Page} from "../page";
import {FollowRenew} from "../../follow-case/follow-renew/follow_renew";
import {Observable} from "rxjs";
/**
 * Created by neng on 16/11/2559.
 */
@Injectable()
export class FollowRenewRestObjectService {

    public search: FollowSearch = new FollowSearch();

    constructor(private http: Http) {
    }

    public searchFollowRenew(pageEvent: PageEvent): Observable<Page<FollowRenew>> {
        let params = new DateSupportURLSearchParams();
        params.set('trNo', this.search.trNo || null);
        params.set('stepCode', this.search.stepCode || null);
        params.set('startDate', this.search.startDateStr || null);
        params.set('endDate', this.search.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-renew/search', {search: params}).map(data=><Page<FollowRenew>>data.json());
    }

    clearParam(): void {
        this.search = new FollowSearch();
    }
}